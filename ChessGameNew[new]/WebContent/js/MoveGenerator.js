/*
	PieceMoveList={
		"fromPiece": fromPiece
		"movelist":
		[
			"toPiece": Object Piece
			"otherInfo":String
		]
	}
 */

var MoveGenerator=function() {
	this._board=[];
	this._userSide=0;
	this._castling=[1,1];
	this._enMove=null;
	this.isChecked=false;
}

/**
 * Get/Set for Board
 * @param {Array} value Board
 */
MoveGenerator.prototype.Board=function(value) {
	if(arguments.length==0) {
		return this._board;
	}
	else {
		this._board=value;
	}
}

MoveGenerator.prototype.UserSide=function(value) {
	if(arguments.length==0) {
		return this._userSide;
	}
	else {
		this._userSide=value;
	}
}

MoveGenerator.prototype.Castling=function(value) {
	if(arguments.length==0) {
		return this._castling;
	}
	else {
		this._castling=value;
	}
}

/*
 ****************************** Helper Functions ************************
 */

/**
 * Generate all possible moves for a side
 * @param  {number}  side      -1 White 1 Black
 * @param  {Boolean} isChecked Whether it is checked status
 * @return {movelist}            The move list
 */
MoveGenerator.prototype.generateAllMoves=function(side,checkKing) {
	var movelist=[[],[],[],[],[],[],[],[]];
	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++) {
			if(this._board[i][j]*side>0) {
				switch(Math.abs(this._board[i][j])) {
					case 6: {
						movelist[i][j]=this.pawnMoves(this.P(j,i),side,checkKing);
						break;
					}
					case 1: {
						movelist[i][j]=this.kingMoves(this.P(j,i),side,checkKing);
						break;
					}
					case 4: {
						movelist[i][j]=this.knightMoves(this.P(j,i),side,checkKing);
						break;
					}
					case 5: {
						movelist[i][j]=this.rookMoves(this.P(j,i),side,checkKing);
						break;
					}
					case 2: {
						movelist[i][j]=this.queenMoves(this.P(j,i),side,checkKing);
						break;
					}
					case 3: {
						movelist[i][j]=this.bishopMoves(this.P(j,i),side,checkKing);
					}
				}
			}
			else {
				movelist[i][j]==[];
			}
		}
	if(side==this._userSide) {
		this._enMove=null;
	}
	return movelist;
}

/**
 * Get the checked status, and calculate all possible moves
 * @param  {Number} side 
 * @return {Object}      Move list
 */
MoveGenerator.prototype.moves=function(side) {
	var theirmoves=this.generateAllMoves(-side,false);
	var isChecked=this.kingAttacked(side,theirmoves);
	this.isChecked=isChecked;
	return this.generateAllMoves(side,true);
}

/**
 * Find the position of king
 * @param  {Number} side 
 * @return {Object}      King Piece Object
 */
MoveGenerator.prototype.findKing=function(side) {
	for(i=7;i>=0;i--) {
		for(j=0;j<8;j++) {
			if(Math.abs(this._board[i][j])==1 && this._board[i][j]*side>0) {
				return this.P(j,i);
			}
		}
	}
}

/**
 * Check whether a square is under attack
 * @param  {Object} piece      the square
 * @param  {Array} theirmoves  move list of opponent
 * @return {boolean}            
 */
MoveGenerator.prototype.squareAttacked=function(piece,theirmoves) {
	for(var i=0;i<8;i++) {
		for (var j=0;j<8;j++) {
			if (theirmoves[i][j]!=undefined) {
				for(var k=0;k<theirmoves[i][j].length;k++) {
					if(this.equalsPiece(theirmoves[i][j][k]["toPiece"],piece)) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

/**
 * Whether our king is under attacked
 * @param  {Number} side       
 * @param  {Array} theirmoves opponent's move list
 * @return {Boolean}            
 */
MoveGenerator.prototype.kingAttacked=function(side,theirmoves) {
	var king=this.findKing(side);
	return this.squareAttacked(king,theirmoves);
} 

/**
 * From the Checked Perspective, check whether an attempt is valid
 * @param  {Object} fromPiece 
 * @param  {Object} toPiece   
 * @return {Boolean}           
 */
MoveGenerator.prototype.attemptCheckValid=function(fromPiece,toPiece,side) {
	var ori_board=[[],[],[],[],[],[],[],[]];
	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++) {
			ori_board[i][j]=this._board[i][j];
		}

	this.Board()[toPiece["y"]][toPiece["x"]]=this.Board()[fromPiece["y"]][fromPiece["x"]];
	this.Board()[fromPiece["y"]][fromPiece["x"]]=0;
	var theirmoves=this.generateAllMoves(-side,false);
	var checked=this.kingAttacked(side,theirmoves);

	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++) {
			this._board[i][j]=ori_board[i][j];
		}
	return !checked;
}

/**
 * Wrap the piece object
 * @param {Number} x 
 * @param {Number} y 
 */
MoveGenerator.prototype.P=function(x,y) {
	return {
		"x":x,
		"y":y,
		"piece":this._board[y][x]
	};
};

/**
 * Wrap the move object
 * @param {Object} toPiece   
 * @param {String} otherInfo 
 */
MoveGenerator.prototype.M=function(toPiece,otherInfo) {
	return {
		"toPiece":toPiece,
		"otherInfo":otherInfo
	}
}

MoveGenerator.prototype.sameSide=function(fromPiece,toPiece) {
	return fromPiece["piece"]*toPiece["piece"];
}

MoveGenerator.prototype.inBoard=function(x,y) {
	if(x>=0 && x<8 && y>=0 && y<8) {
		return true;
	}
	else {
		return false;
	}
}

MoveGenerator.prototype.equalsPiece=function(piece1,piece2) {
	if(piece1==undefined && piece2!=undefined) return false;
	if(piece1!=undefined && piece2==undefined) return false;
	return piece1["x"]==piece2["x"] && piece1["y"]==piece2["y"] 
	&& piece1["piece"]==piece2["piece"];
}

/*
 ****************************** Generator for each piece ************************
 */

MoveGenerator.prototype.castlingMoves=function(fromPiece,side) {
	var theirmoves=this.generateAllMoves(-side,false);
	var x=fromPiece["x"];
	var y=fromPiece["y"];
	var result=[];
	if(side<0) {
		if (this._castling[0]==1) {
			if(this._board[y][x+1]==0
				&& this._board[y][x+2]==0
				&& !this.squareAttacked(fromPiece,theirmoves)
				&& !this.squareAttacked(this.P(x+1,y),theirmoves)
				&& !this.squareAttacked(this.P(x+2,y),theirmoves)) {
				result.push(this.M(this.P(x+2,y),"O-O"));
			}
		}
		if (this._castling[1]==1) {
			if(this._board[y][x-1]==0
				&& this._board[y][x-2]==0
				&& this._board[y][x-3]==0
				&& !this.squareAttacked(fromPiece,theirmoves)
				&& !this.squareAttacked(this.P(x-1,y),theirmoves)
				&& !this.squareAttacked(this.P(x-2,y),theirmoves)) {
				result.push(this.M(this.P(x-2,y),"O-O-O"));
			}
		}
	}
	else if (side>0) {
		if (this._castling[0]==1) {
			if(this._board[y][x-1]==0
				&& this._board[y][x-2]==0
				&& !this.squareAttacked(fromPiece,theirmoves)
				&& !this.squareAttacked(this.P(x-1,y),theirmoves)
				&& !this.squareAttacked(this.P(x-2,y),theirmoves)) {
				result.push(this.M(this.P(x-2,y),"O-O"));
			}
		}
		if (this._castling[1]==1) {
			if(this._board[y][x+1]==0
				&& this._board[y][x+2]==0
				&& this._board[y][x+3]==0
				&& !this.squareAttacked(fromPiece,theirmoves)
				&& !this.squareAttacked(this.P(x+1,y),theirmoves)
				&& !this.squareAttacked(this.P(x+2,y),theirmoves)) {
				result.push(this.M(this.P(x+2,y),"O-O-O"));
			}
		}
	}
	return result;
}


MoveGenerator.prototype.pawnMoves=function(fromPiece,side,checkKing) {

	var x=fromPiece["x"],y=fromPiece["y"];
	//TODO: Deal with In_Check
	var result=[];
	var toPiece;
	if(this._userSide*side>0) {
		if(y!=0) {
			toPiece=this.P(x,y-1);
			if(this.sameSide(fromPiece,toPiece)==0){
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					if(y-1!=0) {
						result.push(this.M(toPiece,"none"));	
					}
					else {
						result.push(this.M(toPiece,"P!"));
					}
			}
			if(x>0) {
				toPiece=this.P(x-1,y-1);
				if(this.sameSide(fromPiece,toPiece)<0) {
					if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					if(y-1!=0) {
						result.push(this.M(toPiece,"none"));	
					}
					else {
						result.push(this.M(toPiece,"P!"));
					}
				}
				if(this._enMove!=null && this.equalsPiece(toPiece,this._enMove)) {
					if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
						result.push(this.M(toPiece,"p"));	
				}
			}
			if(x<7) {
				toPiece=this.P(x+1,y-1);
				if(this.sameSide(fromPiece,toPiece)<0) {
					if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					if(y-1!=0) {
						result.push(this.M(toPiece,"none"));	
					}
					else {
						result.push(this.M(toPiece,"P!"));
					}
				}
				if(this._enMove!=null && this.equalsPiece(toPiece,this._enMove)) {
					if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
						result.push(this.M(toPiece,"p"));	
				}
			}
		}
		/* Initial Position */
		if(y==6 && this._board[y-1][x]==0) {
			toPiece=this.P(x,y-2);
			if(this.sameSide(fromPiece,toPiece)==0){
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side)){
					var ep="E";
					ep+=String(y-2)+String(x);
					if(x>0&&Math.abs(this._board[y-2][x-1])==6&&this._board[y-2][x-1]*side<0) {
						ep+=String(y-2)+String(x-1);
					}
					if(x<7&&Math.abs(this._board[y-2][x+1])==6&&this._board[y-2][x+1]*side<0) {
						ep+=String(y-2)+String(x+1);
					}
					if(ep=="E"+String(y-1)+String(x)){
						result.push(this.M(toPiece,"none"));
					}
					else {
						result.push(this.M(toPiece,ep));	
					}
				}
			}
		}
	} else {
		if(y!=7) {
			toPiece=this.P(x,y+1);
			if(this.sameSide(fromPiece,toPiece)==0){
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					result.push(this.M(toPiece,"none"));
			}
			if(x>0) {
				toPiece=this.P(x-1,y+1);
				if(this.sameSide(fromPiece,toPiece)<0) {
					if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
						result.push(this.M(toPiece,"none"));
				} 
			}
			if(x<7) {
				toPiece=this.P(x+1,y+1);
				if(this.sameSide(fromPiece,toPiece)<0) {
					if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
						result.push(this.M(toPiece,"none"));
				}
			}
		}
		/* Initial Position */
		if(y==1 && this._board[y+1][x]==0) {
			toPiece=this.P(x,y+2);
			if(this.sameSide(fromPiece,toPiece)==0){
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					result.push(this.M(toPiece,"none"));
			}
		}
	}
	return result;
}

MoveGenerator.prototype.kingMoves=function(fromPiece,side,checkKing) {

	var x=fromPiece["x"],y=fromPiece["y"];
	var dir=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
	var wX,wY;
	var toPiece;
	var result=[];
	
	//eight directions
	for(var i=0;i<8;i++) {
		wX=x+dir[i][0];
		wY=y+dir[i][1];
		if(this.inBoard(wX,wY)) {
			toPiece=this.P(wX,wY);
			if(this.sameSide(fromPiece,toPiece)<=0) {
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					result.push(this.M(toPiece,"none"));
			}
		}
	}

	if(side==this._userSide) {
		var castling=this.castlingMoves(fromPiece,side);
		if(castling[0]) {
			result.push(castling[0]);
		}
		if(castling[1]) {
			result.push(castling[1]);
		}
	}

	return result;
}

MoveGenerator.prototype.knightMoves=function(fromPiece,side,checkKing) {
	var x=fromPiece["x"],y=fromPiece["y"];
	var dir=[[-2,-1],[-1,-2],[1,-2],[2,-1],[2,1],[1,2],[-1,2],[-2,1]];
	var wX,wY;
	var toPiece;
	var result=[];

	//TODO deal with king attack
	
	for(var i=0;i<8;i++) {
		wX=x+dir[i][0];
		wY=y+dir[i][1];
		if(this.inBoard(wX,wY)) {
			toPiece=this.P(wX,wY);
			if(this.sameSide(fromPiece,toPiece)<=0 ) {
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					result.push(this.M(toPiece,"none"));
			}
		}
	}
	return result;
}

MoveGenerator.prototype.rookMoves=function(fromPiece,side,checkKing) {
	var x=fromPiece["x"],y=fromPiece["y"];
	var dir=[[-1,0],[0,-1],[1,0],[0,1]];
	var toPiece;
	var result=[];
	var wX,wY;

	for(var i=0;i<4;i++) {
		wX=x+dir[i][0];
		wY=y+dir[i][1];
		while(this.inBoard(wX,wY) && this.Board()[wY][wX]==0) {
			toPiece=this.P(wX,wY);
			if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
				result.push(this.M(toPiece,"none"));
			wX=wX+dir[i][0];
			wY=wY+dir[i][1];
		}
		if(this.inBoard(wX,wY)) {
			toPiece=this.P(wX,wY);
			if(this.sameSide(fromPiece,toPiece)<=0) {
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					result.push(this.M(toPiece,"none"));
			}
		}
	}
	return result;
}

MoveGenerator.prototype.bishopMoves=function(fromPiece,side,checkKing) {
	var x=fromPiece["x"],y=fromPiece["y"];
	var dir=[[-1,-1],[1,-1],[-1,1],[1,1]];
	var toPiece;
	var result=[];
	var wX,wY;

	for(var i=0;i<4;i++) {
		wX=x+dir[i][0];
		wY=y+dir[i][1];
		while(this.inBoard(wX,wY) && this.Board()[wY][wX]==0) {
			toPiece=this.P(wX,wY);
			if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
				result.push(this.M(toPiece,"none"));
			wX=wX+dir[i][0];
			wY=wY+dir[i][1];
		}
		if(this.inBoard(wX,wY)) {
			toPiece=this.P(wX,wY);
			if(this.sameSide(fromPiece,toPiece)<=0) {
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					result.push(this.M(toPiece,"none"));
			}
		}
	}
	return result;
}

MoveGenerator.prototype.queenMoves=function(fromPiece,side,checkKing) {
	var x=fromPiece["x"],y=fromPiece["y"];
	var dir=[[-1,-1],[1,-1],[-1,1],[1,1],[-1,0],[0,-1],[1,0],[0,1]];
	var toPiece;
	var result=[];
	var wX,wY;

	for(var i=0;i<8;i++) {
		wX=x+dir[i][0];
		wY=y+dir[i][1];
		while(this.inBoard(wX,wY) && this.Board()[wY][wX]==0) {
			toPiece=this.P(wX,wY);
			if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
				result.push(this.M(toPiece,"none"));
			wX=wX+dir[i][0];
			wY=wY+dir[i][1];
		}
		if(this.inBoard(wX,wY)) {
			toPiece=this.P(wX,wY);
			if(this.sameSide(fromPiece,toPiece)<=0) {
				if (!checkKing || this.attemptCheckValid(fromPiece,toPiece,side))
					result.push(this.M(toPiece,"none"));
			}
		}
	}
	return result;
}



