//Define some constant.
var CHESSBOARD_WIDTH="560px";
var CHESSBOARD_HEIGHT="560px";
var CHESSBOARD_IMG_PATH="img/chessboard.jpg"
var CHESSPIECE_RADIUS=30;
var CHESS_GRID_SIZE=70;
var INITIAL_GAME_WHITESIDE=
	[
		[5,4,3,2,1,3,4,5],
		[6,6,6,6,6,6,6,6],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[-6,-6,-6,-6,-6,-6,-6,-6],
		[-5,-4,-3,-2,-1,-3,-4,-5],
	];
var INITIAL_GAME_BLACKSIDE=
	[
		[-5,-4,-3,-1,-2,-3,-4,-5],
		[-6,-6,-6,-6,-6,-6,-6,-6],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[6,6,6,6,6,6,6,6],
		[5,4,3,1,2,3,4,5],
	];
// var INITIAL_GAME_WHITESIDE=
// 	[
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,-1,0,1],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,-3,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0]
// 	];
// var INITIAL_GAME_BLACKSIDE=
// 	[
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,-3,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[1,0,-1,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0]
// 	];
// var INITIAL_GAME_WHITESIDE=
// 	[
// 		[5,4,3,2,0,3,4,5],
// 		[6,6,6,-6,6,6,6,6],
// 		[0,0,0,0,0,0,0,0],
// 		[0,-6,0,0,1,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[-6,0,0,-6,-6,-6,-6,-6],
// 		[-5,-4,-3,-2,-1,-3,-4,-5],
// 	];
// var INITIAL_GAME_BLACKSIDE=
// 	[
// 		[-5,-4,-3,-1,-2,-3,-4,-5],
// 		[-6,-6,-6,-6,-6,0,0,-6],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,0,0,0,0,0],
// 		[0,0,0,1,0,0,-6,0],
// 		[0,0,0,0,0,0,0,0],
// 		[6,6,6,6,-6,6,6,6],
// 		[5,4,3,0,2,3,4,5],
// 	];
var SYMBOL_MAP={
	"1": "♚",
	"2": "♛",
	"3": "♝",
	"4": "♞",
	"5": "♜",
	"6": "♟"
};


//Define the class.
var Chessboard=function(){

	//Define the instance variable of the class.

	this._board=null;
	this._isLocked=false;
	this._isPicked=false;
	this._pickingPiece=null;
	this._checked=false;

	//HTML elements
	this._chessElements=null;
	this._chessboardDiv=null;
	this._chessPieceCanvas=null;
	this._xLabelCanvas=null;
	this._yLabelCanvas=null;
	this._moveHintCanvas=null;
	this._promotionDialog=null;
	this._eatenBoxSide1=null;
	this._eatenBoxSide2=null;


	this._movelist=[[],[],[],[],[],[],[],[]];
//	this._castling="11";

	this.user=null;
	this.moveGenerator=null;
};

var promtionSelection="";


/*
	Important Data Structures
	Piece= {
		"x": Number
		"y": Number
		"piece": Number
	};
 */

/*
 ****************************** Getters and Setters ************************
 */

/**
 * Get/Set for this._isLocked.
 */
Chessboard.prototype.IsLocked=function(value) {
	if(arguments.length==0) {
		return this._isLocked;
	} else {
		this._isLocked=value;
	}
};

/**
 * Get/Set for this._isPicked
 */
Chessboard.prototype.IsPicked=function(value){
	if(arguments.length==0) {
		return this._isPicked;
	} else {
		this._isPicked=value;
	}
};

Chessboard.prototype.Board=function(value){
	if(arguments.length==0) {
		return this._board;
	} else {
		this._board=value;
	}
}

/**
 * Get/Set for this._pickingPiece
 */
Chessboard.prototype.PickingPiece=function(value){
	if(arguments.length==0) {
		return this._pickingPiece;
	} else {
		this._pickingPiece=value;
	}
};

Chessboard.prototype.MoveList=function(value) {
	if(arguments.length==0) {
		return this._movelist;
	} else {
		this._movelist=value;
	}
}

Chessboard.prototype.Cheked=function(value) {
	if(arguments.length==0) {
		return this._checked;
	} else {
		this._checked=value;
	}
}

// Chessboard.prototype.Castling=function(value) {
// 	if(arguments.length==0) {
// 		return this._castling;
// 	} else {
// 		this._castling=value;
// 	}
// }


/*
 ****************************** Helper Functions ****************************
 */

Chessboard.prototype.initialize=function(x,y,user){
	this.user=user;
	this.createChessElements(x,y);
	this.Board(user.Side()=="1"?INITIAL_GAME_BLACKSIDE:INITIAL_GAME_WHITESIDE);
	this.IsLocked(true);
	// this.IsLocked(user.Side()=="1"?true:false);
	// if(this.user.IsSpectator()) this.IsLocked(true);
	this.drawChessboard();

	this.moveGenerator=new MoveGenerator();
	this.moveGenerator.Board(this._board);
	this.moveGenerator.UserSide(this.user.Side());
	// if(user.Side()==-1) this.MoveList(this.moveGenerator.moves(-1));

}

/**
 * Get the Symbol of chess piece
 * @param  {Number} piece is the number representation of piece
 * @return {String} The symbol of the piece
 */
Chessboard.prototype.getSymbol=function(piece){
	return SYMBOL_MAP[Math.abs(piece)];
};

Chessboard.prototype.equalsPiece=function(piece1,piece2) {
	if(piece1==undefined && piece2!=undefined) return false;
	if(piece1!=undefined && piece2==undefined) return false;
	return piece1["x"]==piece2["x"] && piece1["y"]==piece2["y"] 
	&& piece1["piece"]==piece2["piece"];
}

/**
 * Get the coordinate in the chessboard according to the click coordinate
 * @param  {Number} x the x of click
 * @param  {Number} y the y of click
 * @return {Object}   the coordinate of the chessboard accordingly(0 to 7) and the piece
 */
Chessboard.prototype.getBoardPieceFromClick=function(x,y){
	if(x>560||x<0||y>560||y<0) {
		return null;
	}
	var cx=Math.floor(x/CHESS_GRID_SIZE);
	var cy=Math.floor(y/CHESS_GRID_SIZE);
	return {"x":cx,"y":cy,"piece":this.Board()[cy][cx]};
};

Chessboard.prototype.unLock=function() {
	if(!this.user.IsSpectator()) this.IsLocked(false);
	this.moveGenerator.Board(this.Board());
	this.MoveList(this.moveGenerator.moves(this.user.Side()));
	var l=this.moveListLength();
	if(l==0 && this.moveGenerator.isChecked) {
		this.user.loseAction();
		this.user.endGameHandler("win");
		this.IsLocked(true);
		return;
	}
	if(l==0 && !this.moveGenerator.isChecked) {
		this.user.drawAction();
		this.user.endGameHandler("draw");
		this.IsLocked(true);
		return;
	}
}

Chessboard.prototype.moveListLength=function() {
	var sum=0;
	for(var i in this.MoveList()){
		for(var j in this.MoveList()[i]) {
			sum+=this.MoveList()[i][j].length;
		}
	}
	return sum;
}

/**
 * Click Handler
 * @param  {Object} me is the "this" reference
 * @return {function}    The "True" hanlder.
 */
Chessboard.prototype.chessboardClickHandler=function(me){
	return function(e) {
		if(me.IsLocked()) {
			return;
		}
		var x=e.offsetX, y=e.offsetY;
		var clickPiece=me.getBoardPieceFromClick(x,y);
		if(!me.IsPicked()) {
			var pieceMoveList=me.MoveList()[clickPiece["y"]][clickPiece["x"]];
			if(clickPiece["piece"]==0 || clickPiece["piece"]*me.user.Side()<0 || pieceMoveList==undefined) {
				return;
			}
			me.drawHintForPiece(clickPiece);
			me.PickingPiece(clickPiece);
			me.IsPicked(true);
		} else {
			var validMove=me.isValidMove(me.PickingPiece(),clickPiece);
			if(!validMove){
				me.dealInvalidMove();
				return;
			}
			if(validMove["otherInfo"]=="P!") {
				$("#promotionDialog").dialog({
					buttons: {
		      		"OK":me.OKButtonHandler(me,me.PickingPiece(),clickPiece,"P!"),
		      		"Cancel":function() {
		      			alert(hehe);
		      			$(this).dialog("close");
		      		}
		      	}
      			});
				$("#promotionDialog").dialog("open");
				return;
			}
			me.makeMove(me.PickingPiece(),clickPiece,validMove["otherInfo"]);
			me.IsPicked(false);
			me.clearHints();
			me.user.moveAction(me.PickingPiece(),clickPiece,validMove["otherInfo"]);
			me.IsLocked(true);
		}
	};
}

Chessboard.prototype.dealInvalidMove=function() {
	this.IsPicked(false);
	this.clearHints();
}

Chessboard.prototype.isValidMove=function(fromPiece,toPiece) {
	var pieceMoveList=this.MoveList()[fromPiece["y"]][fromPiece["x"]];
	for(var i=0;i<pieceMoveList.length;i++) {
		if(this.equalsPiece(pieceMoveList[i]["toPiece"],toPiece)) {
			return pieceMoveList[i];
		}
	}
	return null;
}

Chessboard.prototype.makeMove=function(fromPiece,toPiece,otherInfo) {
	this.Board()[toPiece["y"]][toPiece["x"]]=this.Board()[fromPiece["y"]][fromPiece["x"]];
	this.Board()[fromPiece["y"]][fromPiece["x"]]=0;

	if(otherInfo.charAt(0)=='P') {
		var proed=Number(otherInfo.charAt(2));
		if (fromPiece["piece"]<=0) {
			proed=-proed;
		}
		this.Board()[toPiece["y"]][toPiece["x"]]=proed;
	}

	
	if(otherInfo=="O-O") {
		if (fromPiece["piece"]*this.user.Side()>0) this.moveGenerator.Castling([0,0]);
		if(this.user.Side()>0) {
			this.Board()[toPiece["y"]][toPiece["x"]+1]=this.Board()[toPiece["y"]][toPiece["x"]-1];
			this.Board()[toPiece["y"]][toPiece["x"]-1]=0;
		}
		else if (this.user.Side()<0) {
			this.Board()[toPiece["y"]][toPiece["x"]-1]=this.Board()[toPiece["y"]][toPiece["x"]+1];
			this.Board()[toPiece["y"]][toPiece["x"]+1]=0;	
		}
	}
	else if(otherInfo=="O-O-O") {
		if (fromPiece["piece"]*this.user.Side()>0) this.moveGenerator.Castling([0,0]);
		if(this.user.Side()>0) {
			this.Board()[toPiece["y"]][toPiece["x"]-1]=this.Board()[toPiece["y"]][toPiece["x"]+2];
			this.Board()[toPiece["y"]][toPiece["x"]+2]=0;
		}
		else if(this.user.Side()<0) {
			this.Board()[toPiece["y"]][toPiece["x"]+1]=this.Board()[toPiece["y"]][toPiece["x"]-2];
			this.Board()[toPiece["y"]][toPiece["x"]-2]=0;
		}
	}

	if(otherInfo=="p") {
		if(fromPiece["piece"]*this.user.Side()>0){
			this.Board()[toPiece["y"]+1][toPiece["x"]]=0;
			this._eatenBoxSide1.innerHTML+=this.getSymbol(-6);
		}
		else {
			this.Board()[toPiece["y"]-1][toPiece["x"]]=0;	
			this._eatenBoxSide2.innerHTML+=this.getSymbol(6);
		}
	}

	//King moved
	if(fromPiece["piece"]==this.user.Side()) {
		this.moveGenerator.Castling([0,0]);
	}

	//Rook moved
	if(Math.abs(fromPiece["piece"])==5 && fromPiece["piece"]*this.user.Side()>0){
		if(fromPiece["x"]==0 && fromPiece["piece"]<0) {
			this.moveGenerator.Castling()[1]=0;
		}
		else if (fromPiece["x"]==7 && fromPiece["piece"]<0) {
			this.moveGenerator.Castling()[0]=0;
		}
		if(fromPiece["x"]==0 && fromPiece["piece"]>0) {
			this.moveGenerator.Castling()[0]=0;
		}
		else if (fromPiece["x"]==7 && fromPiece["piece"]>0) {
			this.moveGenerator.Castling()[1]=0;
		}
	}

	if(toPiece["piece"]!=0) {
		if(toPiece["piece"]*this.user.Side()<0) {
			this._eatenBoxSide1.innerHTML+=this.getSymbol(toPiece["piece"]);
		}
		else {
			this._eatenBoxSide2.innerHTML+=this.getSymbol(toPiece["piece"]);
		}
	}
	
	this.reDraw();
	this.drawLastMove(fromPiece,toPiece);
}

/**
 * Draw one chess piece on the canvas
 * @param  {Number} piece The piece
 * @param  {Number} x     x in the chessboard
 * @param  {Number} y     y in the chessboard
 */
Chessboard.prototype.drawOnePiece=function(piece,x,y){
	if(piece==0) return;
	var symbol=this.getSymbol(piece);
	if(this._chessPieceCanvas) {
		var ctx=this._chessPieceCanvas.getContext('2d');
		ctx.font="50px sans-serif";
		if(piece>0) { //Black Piece
			ctx.lineWidth=5;
			ctx.fillStyle="#000000";
			ctx.strokeStyle="#FFFFFF";
		}
		else { //White Piece 
			ctx.lineWidth=7;
			ctx.fillStyle="#FFFFFF";
			ctx.strokeStyle="#000000";
		}
		ctx.textBaseline="top";
		ctx.strokeText(symbol,x*CHESS_GRID_SIZE+10,y*CHESS_GRID_SIZE);
		ctx.fillText(symbol,x*CHESS_GRID_SIZE+10,y*CHESS_GRID_SIZE);
	}
}

Chessboard.prototype.drawLastMove=function(fromPiece,toPiece) {
	if(this._chessPieceCanvas) {
		var ctx=this._chessPieceCanvas.getContext('2d');
		ctx.lineWidth=3;
		ctx.strokeStyle="#FF0000"
		ctx.strokeRect(fromPiece["x"]*CHESS_GRID_SIZE,fromPiece["y"]*CHESS_GRID_SIZE,CHESS_GRID_SIZE,CHESS_GRID_SIZE);
		ctx.strokeRect(toPiece["x"]*CHESS_GRID_SIZE,toPiece["y"]*CHESS_GRID_SIZE,CHESS_GRID_SIZE,CHESS_GRID_SIZE);
	}
}

Chessboard.prototype.drawHintSquare=function(x,y){
	if(this._moveHintCanvas) {
		var ctx=this._moveHintCanvas.getContext('2d');
		ctx.fillStyle="rgba(0,0,200,0.3)";
		ctx.fillRect(x*CHESS_GRID_SIZE,y*CHESS_GRID_SIZE,CHESS_GRID_SIZE,CHESS_GRID_SIZE);
	}
}

Chessboard.prototype.clearHints=function() {
	var ctx=this._moveHintCanvas.getContext('2d');
	ctx.clearRect(0,0,this._moveHintCanvas.width,this._moveHintCanvas.width);
}

Chessboard.prototype.drawHintForPiece=function(piece) {
	var pieceMoveList=this.MoveList()[piece["y"]][piece["x"]];
	for(var i=0;i<pieceMoveList.length;i++) {
		this.drawHintSquare(pieceMoveList[i]["toPiece"]["x"],pieceMoveList[i]["toPiece"]["y"]);
	}
}

/**
 * Draw a chessboard according to the board array
 */
Chessboard.prototype.drawChessboard=function(){
	if(this._board){
		for(var i=0;i<this._board.length;i++) {
			for(var j=0;j<this._board[i].length;j++){
				this.drawOnePiece(this._board[i][j],j,i);
			}
		}
	}
}

Chessboard.prototype.reDraw=function() {
	var ctx=this._chessPieceCanvas.getContext('2d');
	ctx.clearRect(0,0,this._chessPieceCanvas.width,this._chessPieceCanvas.width);
	this.drawChessboard();
}



/*
 ****************************** HTML ELEMENT CREATORS ************************
 */

Chessboard.prototype.createChessElements=function(x,y) {
	this._chessElements=document.createElement("div");
	$(this._chessElements).addClass("chessElementsDiv");
	$(this._chessElements).offset({left:x, top:y});

	$(this._chessElements).width(800);
	$(this._chessElements).height(600);

	var x=100,y=50;
	document.body.appendChild(this._chessElements);
	this.createChessboard(x,y);
	this.createXlable(x,y+560);
	this.createYlable(x-30,y);
	this.createEatenBoxSide1(x+575,y+15);
	this.createEatenBoxSide2(x+575,y+560-250-15);
	this.initPromotionWindow();
}	

/**
 * Create the ChessboardDiv
 * x and y are positions
 */
Chessboard.prototype.createChessboard=function(x,y){
	this._chessboardDiv=document.createElement("div");
	$(this._chessboardDiv).addClass("chessboardDiv");
	$(this._chessboardDiv).offset({left:x, top:y});

	$(this._chessboardDiv).width(CHESSBOARD_WIDTH);
	$(this._chessboardDiv).height(CHESSBOARD_HEIGHT);

	var img=document.createElement("img");
	img.style.position="absolute"
	img.src=CHESSBOARD_IMG_PATH;
	img.style.zIndex=-1;
	this._chessboardDiv.appendChild(img);
	this._chessElements.appendChild(this._chessboardDiv);
	$(this._chessboardDiv).click(this.chessboardClickHandler(this));
	$(this._chessboardDiv).dblclick(function(){return false;});

	this.createChessPieceCanvas();
	this.createMoveHintCanvas();
};

/**
 * Create the canvas for drawing chess pieces.
 */
Chessboard.prototype.createChessPieceCanvas=function(){
	this._chessPieceCanvas=document.createElement("canvas");
	$(this._chessPieceCanvas).offset({left:0,top:0});
	$(this._chessPieceCanvas).width(CHESSBOARD_WIDTH);
	$(this._chessPieceCanvas).height(CHESSBOARD_HEIGHT);
	$(this._chessPieceCanvas).attr({"width":CHESSBOARD_WIDTH,"height":CHESSBOARD_HEIGHT});
	this._chessPieceCanvas.style.zIndex=1;
	this._chessboardDiv.appendChild(this._chessPieceCanvas);
};

Chessboard.prototype.createMoveHintCanvas=function(){
	this._moveHintCanvas=document.createElement("canvas");
	$(this._moveHintCanvas).offset({left:0,top:0});
	$(this._moveHintCanvas).width(CHESSBOARD_WIDTH);
	$(this._moveHintCanvas).height(CHESSBOARD_HEIGHT);
	$(this._moveHintCanvas).attr({"width":CHESSBOARD_WIDTH,"height":CHESSBOARD_HEIGHT});
	this._moveHintCanvas.style.position="absolute"
	this._moveHintCanvas.style.zIndex=2;
	this._chessboardDiv.appendChild(this._moveHintCanvas);
}

Chessboard.prototype.createXlable=function(x,y) {
	this._xLabelCanvas=document.createElement("canvas");
	$(this._xLabelCanvas).offset({left:x, top:y});
	$(this._xLabelCanvas).width(CHESSBOARD_WIDTH);
	$(this._xLabelCanvas).height(30);
	$(this._xLabelCanvas).attr({"width":CHESSBOARD_WIDTH,"height":30});
	this._xLabelCanvas.style.position="absolute"
	this._xLabelCanvas.style.zIndex=3;
	this._chessElements.appendChild(this._xLabelCanvas);

	var ctx=this._xLabelCanvas.getContext('2d');
	ctx.font="30px sans-serif";
	ctx.textBaseline="top";
	ctx.fillStyle="#000000";
	if(this.user.Side()<0) {
		var hehe=['a','b','c','d','e','f','g','h'];
	}
	else {
		var hehe=['h','g','f','e','d','c','b','a'];
	}
	for(var i in hehe) {
		ctx.fillText(hehe[i],i*CHESS_GRID_SIZE+25,0);
	}
}

Chessboard.prototype.createYlable=function(x,y) {
	this._yLabelCanvas=document.createElement("canvas");
	$(this._yLabelCanvas).offset({left:x, top:y});
	$(this._yLabelCanvas).width(30);
	$(this._yLabelCanvas).height(CHESSBOARD_WIDTH);
	$(this._yLabelCanvas).attr({"width":30,"height":CHESSBOARD_HEIGHT});
	this._yLabelCanvas.style.position="absolute"
	this._yLabelCanvas.style.zIndex=3;
	this._chessElements.appendChild(this._yLabelCanvas);

	var ctx=this._yLabelCanvas.getContext('2d');
	ctx.font="30px sans-serif";
	ctx.textBaseline="top";
	ctx.fillStyle="#000000";
	if(this.user.Side()>0) {
		var hehe=['1','2','3','4','5','6','7','8'];
	}
	else {
		var hehe=['8','7','6','5','4','3','2','1'];
	}
	for(var i in hehe) {
		ctx.fillText(hehe[i],0,i*CHESS_GRID_SIZE+25);
	}
}

Chessboard.prototype.initPromotionWindow=function() {
	$("#promotionDialog").dialog({
		autoOpen:false,
		height: 230,
      	width: 200,
      	modal:true,
      	title:"Promotion",
      	buttons: {
      		"OK":function(){
      			alert(hehe);
      			$(this).dialog("close");
      		},
      		"Cancel":function() {
      			alert(hehe);
      			$(this).dialog("close");
      		}
      	}
	})
}

Chessboard.prototype.OKButtonHandler=function(me,fromPiece,toPiece,otherInfo) {
	return function() {
		if(document.getElementById("pro_Q").checked==true) promtionSelection=2;
		if(document.getElementById("pro_R").checked==true) promtionSelection=5;
		if(document.getElementById("pro_K").checked==true) promtionSelection=4;
		if(document.getElementById("pro_B").checked==true) promtionSelection=3;
		otherInfo+=promtionSelection;
		me.makeMove(fromPiece,toPiece,otherInfo);
		me.IsPicked(false);
		me.clearHints();
		me.user.moveAction(fromPiece,toPiece,otherInfo);
		me.IsLocked(true);
		$(this).dialog("close");
	}
}

/**
 * Create the ChessboardDiv
 * x and y are positions
 */
Chessboard.prototype.createEatenBoxSide1=function(x,y){
	this._eatenBoxSide1=document.createElement("div");
	$(this._eatenBoxSide1).addClass("EatenBox1");
	$(this._eatenBoxSide1).offset({left:x, top:y});

	$(this._eatenBoxSide1).width(60);
	$(this._eatenBoxSide1).css({
		"color":this.user.Side()<0?"black":"white",
		"text-shadow":(this.user.Side()>0?"black":"grey")+" 0.1em 0.1em 0.2em"
	});

	this._chessElements.appendChild(this._eatenBoxSide1);
};

/**
 * Create the ChessboardDiv
 * x and y are positions
 */
Chessboard.prototype.createEatenBoxSide2=function(x,y){
	this._eatenBoxSide2=document.createElement("div");
	$(this._eatenBoxSide2).addClass("EatenBox2");
	$(this._eatenBoxSide2).offset({left:x, top:y});

	$(this._eatenBoxSide2).width(60);
	$(this._eatenBoxSide2).css({
		"color":this.user.Side()>0?"black":"white",
		"text-shadow":(this.user.Side()<0?"black":"grey")+" 0.1em 0.1em 0.2em"
	});

	this._chessElements.appendChild(this._eatenBoxSide2);
};


