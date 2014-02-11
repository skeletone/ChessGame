//Define some Constants

var USER_MESSAGE_SEPARATOR="@@@@@";

var User=function() {

	//Instance Variables
	this._userID=-1;
	this._gameID=-1;
	this._isLogin=false;
	this._side=0;
	this._endGame=false;
	this._isSpectator=false;

	this._win=0;
	this._draw=0;
	this._lose=0;
	this._rate=0;
	this._img=""


	//Socket instance for user
	this.socket=null;

	//Chessboard instance for user
	this.chessboard=null;
};

/**
 * Initialize the User
 * @param  {String} uID  User ID
 * @param  {String} gID  Game ID
 * @param  {String} side 1-Black -1-White 0-Spectator
 */
User.prototype.initialize=function(uID,gID,side,win,draw,lose,rate,img) {
	this.UserID(uID);
	this.GameID(gID);

	this._win=win;
	this._draw=draw;
	this._lose=lose;
	this._rate=rate;
	this._img="";

	if(side==0){
		this.Side(-1);
		this.IsSpectator(true);
		document.getElementById("startbutton").disabled=true;
	}
	else {
		this.Side(side);
		this.IsSpectator(false);
	}
	this.IsLogin(true);

	if(this.chessboard==null) {
		this.chessboard=new Chessboard();
		this.chessboard.initialize(50,50,this);
	}

	if(this.socket==null) {
		// TODO Hardcode here... Of course I should replace it one day..
		this.connect("ws://"+location.hostname+":"+location.port+"/ChessGameNew/message.do");	
	}
	this.initResultDialog();
	this.initAskDrawDialog(this);
	this.initDisagreeDialog();
	this.initAskStartDialog();
	this.initWaitStartDialog();
	this.addLine(uID,this.Side(),win,draw,lose,rate);
	window.onbeforeunload=this.closeWindowHandler(this);
};

/*
 ****************************** Getters and Setters ************************
 */

User.prototype.UserID=function(value) {
 	if(arguments.length==0) {
		return this._userID;
	} 
	else {
		this._userID=value;
	}
}

User.prototype.GameID=function(value) {
	if(arguments.length==0) {
		return this._gameID;
	} else {
		this._gameID=value;
	}
}

User.prototype.IsLogin=function(value) {
	if(arguments.length==0) {
		return this._isLogin;
	}
	else {
		this._isLogin=value;
	}
}

User.prototype.Side=function(value) {
	if(arguments.length==0) {
		return this._side;
	}
	else {
		this._side=value;
	}
}

User.prototype.IsSpectator=function(value) {
	if(arguments.length==0) {
		return this._isSpectator;
	}
	else {
		this._isSpectator=value;
	}
}


/*
 ****************************** Socket Connection ************************
 */

User.prototype.connect=function(host) {

	//Create WebSocket Object
	if('WebSocket' in window) {
		this.socket=new WebSocket(host);
	}
	else if ('MozWebSocket' in window) {
		this.socket=new MozWebSocket(host);
	}
	else {
		alert("Your Browser does not support WebSocket!");
	}

	//Bind socket callbacks
	this.socket.onopen = this.onOpenHandler(this);

	this.socket.onclose=this.onCloseHandler(this);

	this.socket.onmessage=this.onMessageHandler(this);
};

/*
 ****************************** Handlers ***************************
 */

User.prototype.onOpenHandler=function(me) {
	return function(){
		me.loginAction()
	}
}

User.prototype.onCloseHandler=function(me) {
	return function(){
		me.logoutAction()
	}
}

User.prototype.onMessageHandler=function(me) {
	return function(message) {
		var result = message.data.split(USER_MESSAGE_SEPARATOR);

		if(result[0]=="login") {
			me.loginHandler(result[1],result[8],result[3],result[4],result[5],result[6],result[7]);
			// TODO Deal with login.
		}
		else if(result[0]=="logout") {
			me.logoutHandler(result[1]);
			// TODO Deal with logout.
		}
		else if(result[0]=="move") {
			me.moveHandler(result[3],me.wrapFromPiece(result),me.wrapToPiece(result),result[10]);
		}
		else if(result[0]=="chat") {
			me.chatHandler(result[1],result[3]);
		}
		else if(result[0]=="win"||result[0]=="lose"||result[0]=="draw") {
			me.endGameHandler(result[0]);
		}
		else if(result[0]=="askDraw") {
			me.askDrawHandler();
		}
		else if(result[0]=="disagree") {
			me.disagreeDrawHandler();
		}
		else if(result[0]=="receivelogin") {
			me.receiveloginHandler(result[1],result[9],result[8],result[3],result[4],result[5],result[6],result[7]);
		}
		else if(result[0]=="askstart") {
			me.askStartHandler();
		}
		else if(result[0]=="ready") {
			me.readyHandler();
		}
	}
}

User.prototype.askDrawHandler=function() {
	if (!this.IsSpectator()) $("#drawDialog").dialog("open");
}

User.prototype.disagreeDrawHandler=function(){
	if(!this.IsSpectator()) {
		$("#disagreeDialog").dialog("open");
	}
}

User.prototype.closeWindowHandler=function(me) {
	return function() {
		me.logoutAction();
	}
}

User.prototype.loginHandler=function(uID,fromSide,win,draw,lose,rate,img) {
	
	this.addLine(uID,fromSide,win,draw,lose,rate);
	this.receiveLoginAction(uID);
}

User.prototype.receiveloginHandler=function(fromUID,fromSide,toUID,win,draw,lose,rate,img) {
	if(toUID==this.UserID()) {
		
		this.addLine(fromUID,fromSide,win,draw,lose,rate);
	}
}

User.prototype.logoutHandler=function(uID) {
	this.deleteLine(uID);
}

User.prototype.endGameHandler=function(result) {
	if(this.IsSpectator()) {
		$("#resultDialog").html("The Game is end");
	}
	else if(result=="lose") {
		$("#resultDialog").html("Congratulations! You won the game and got 3 rate points");
	}
	else if(result=="win") {
		$("#resultDialog").html("You lost the game.");
	}
	else if(result=="draw") {
		$("#resultDialog").html("Draw Game. You got 1 rate points");
	}
	this._endGame=true;
 	$("#resultDialog").dialog("open");
 	this.chessboard.IsLocked(true);
}

/**
 * Handler the move message
 * @param  {String} side      The side of the mover
 * @param  {Object} fromPiece The from piece object
 * @param  {Object} toPiece   The to piece object
 * @param  {String} otherInfo Other information of castling, promotion, etc.
 */
User.prototype.moveHandler=function(side,fromPiece,toPiece,otherInfo) {
	if(side!=this.Side()) {
		fromPiece=this.adjustPieceSide(fromPiece);
		toPiece=this.adjustPieceSide(toPiece);
	}
	if(otherInfo.charAt(0)=="E") {
		this.enpassant(otherInfo);
	}
	this.chessboard.makeMove(fromPiece,toPiece,otherInfo);
	this.chessboard.unLock();
}

User.prototype.chatHandler=function(userID,msg) {
	document.getElementById("chat").value+=userID+": "+msg+"\n";
	document.getElementById("chat").scrollTop=document.getElementById("chat").scrollHeight;
}

User.prototype.askStartHandler=function() {
	if(!this.IsSpectator()) {
		$("#askStartDialog").dialog("open");
	}
};

User.prototype.readyHandler=function() {
	if(!this.IsSpectator()) {
		$("#waitStartDialog").dialog("close");
		if(this.Side()==-1) {
			this.chessboard.unLock();
		}
		document.getElementById("startbutton").disabled=true;
		document.getElementById("drawbutton").disabled=false;
	}
}

/**
 * Parse the result message and get the from Piece object
 * @param  {String} result Message
 * @return {Object}        From piece object
 */
User.prototype.wrapFromPiece=function(result) {
	return {"x":result[4],"y":result[5],"piece":result[6]};
}

/**
 * Parse the result message and get the to Piece object
 * @param  {String} result Message
 * @return {Object}        To piece object
 */
User.prototype.wrapToPiece=function(result) {
	return {"x":result[7],"y":result[8],"piece":result[9]};
}

/**
 * If the side of the sender and reciever is different, we should
 * adjust the coordinate to fit the current chessboard
 * @param  {Object} piece The piece to be adjusted
 * @return {Object}       Adjusted piece
 */
User.prototype.adjustPieceSide=function(piece) {
	return {
		"x":7-piece["x"],
		"y":7-piece["y"],
		"piece":piece["piece"]
	};
};

User.prototype.enpassant=function(info) {
	var toPiece=this.chessboard.moveGenerator.P(Number(info[2]),Number(info[1])+1);
	toPiece=this.adjustPieceSide(toPiece);
	this.chessboard.moveGenerator._enMove=toPiece;
}

/*
 ****************************** User Action ************************
 */

User.prototype.loginAction=function() {
	var message="login"
				 +USER_MESSAGE_SEPARATOR
				 +this.UserID()
				 +USER_MESSAGE_SEPARATOR
				 +this.GameID()
				 +USER_MESSAGE_SEPARATOR
				 +this._win
				 +USER_MESSAGE_SEPARATOR
				 +this._draw
				 +USER_MESSAGE_SEPARATOR
				 +this._lose
				 +USER_MESSAGE_SEPARATOR
				 +this._rate
				 +USER_MESSAGE_SEPARATOR
				 +this._img
				 +USER_MESSAGE_SEPARATOR
				 +this.Side()
				 +USER_MESSAGE_SEPARATOR
				 +this.IsSpectator();
	this.socket.send(message);
}

User.prototype.logoutAction=function() {
	var message="logout"
				 +USER_MESSAGE_SEPARATOR
				 +this.UserID()
				 +USER_MESSAGE_SEPARATOR
				 +this.GameID();
	this.socket.send(message);
	if(!this._endGame &&!this.IsSpectator()) this.loseAction();
}

User.prototype.receiveLoginAction=function(toUser) {
	var message="receivelogin"
				 +USER_MESSAGE_SEPARATOR
				 +this.UserID()
				 +USER_MESSAGE_SEPARATOR
				 +this.GameID()
				 +USER_MESSAGE_SEPARATOR
				 +this._win
				 +USER_MESSAGE_SEPARATOR
				 +this._draw
				 +USER_MESSAGE_SEPARATOR
				 +this._lose
				 +USER_MESSAGE_SEPARATOR
				 +this._rate
				 +USER_MESSAGE_SEPARATOR
				 +this._img
				 +USER_MESSAGE_SEPARATOR
				 +toUser
				 +USER_MESSAGE_SEPARATOR
				 +this.Side();
	this.socket.send(message);
}

User.prototype.chatAction=function(msg) {
	var message="chat"
				 +USER_MESSAGE_SEPARATOR
				 +this.UserID()
				 +USER_MESSAGE_SEPARATOR
				 +this.GameID()
				 +USER_MESSAGE_SEPARATOR
				 +msg;
	this.socket.send(message);
}

User.prototype.winAction=function() {
	var message="win"
				+USER_MESSAGE_SEPARATOR
				+this.UserID()
				+USER_MESSAGE_SEPARATOR
				+this.GameID();
	this.socket.send(message);
}

User.prototype.loseAction=function() {
	var message="lose"
				+USER_MESSAGE_SEPARATOR
				+this.UserID()
				+USER_MESSAGE_SEPARATOR
				+this.GameID();
	this.socket.send(message);
}

User.prototype.drawAction=function() {
	var message="draw"
				+USER_MESSAGE_SEPARATOR
				+this.UserID()
				+USER_MESSAGE_SEPARATOR
				+this.GameID();
	this.socket.send(message);
}

User.prototype.askDrawAction=function() {
	if(this._endGame) return;
	var message="askDraw"
				+USER_MESSAGE_SEPARATOR
				+this.UserID()
				+USER_MESSAGE_SEPARATOR
				+this.GameID();
	this.socket.send(message);
}

User.prototype.disagreeDrawAction=function() {
	var message="disagree"
				+USER_MESSAGE_SEPARATOR
				+this.UserID()
				+USER_MESSAGE_SEPARATOR
				+this.GameID();
	this.socket.send(message);
}

/**
 * Send the move message
 * @param  {Object} fromPiece 
 * @param  {Object} toPiece   
 * @param  {String} otherInfo handle promotion, castling, etc.
 */
User.prototype.moveAction=function(fromPiece,toPiece,otherInfo) {
	var message="move"+USER_MESSAGE_SEPARATOR
				+this.UserID()+USER_MESSAGE_SEPARATOR   
				+this.GameID()+USER_MESSAGE_SEPARATOR   
				+this.Side()+USER_MESSAGE_SEPARATOR     
				+fromPiece["x"]+USER_MESSAGE_SEPARATOR  
				+fromPiece["y"]+USER_MESSAGE_SEPARATOR  
				+fromPiece["piece"]+USER_MESSAGE_SEPARATOR 
				+toPiece["x"]+USER_MESSAGE_SEPARATOR  
				+toPiece["y"]+USER_MESSAGE_SEPARATOR  
				+toPiece["piece"]+USER_MESSAGE_SEPARATOR 
				+otherInfo; 
	this.socket.send(message);
}

User.prototype.askStartAction=function() {
	var message="askstart"
			+USER_MESSAGE_SEPARATOR
			+this.UserID()
			+USER_MESSAGE_SEPARATOR
			+this.GameID();
	this.socket.send(message);
	$("#waitStartDialog").dialog("open");
}

User.prototype.readyAction=function() {
	var message="ready"
			+USER_MESSAGE_SEPARATOR
			+this.UserID()
			+USER_MESSAGE_SEPARATOR
			+this.GameID();
	this.socket.send(message);
}

User.prototype.initDisagreeDialog=function() {
	$("#disagreeDialog").dialog({
		autoOpen:false,
		height: 230,
      	width: 200,
      	modal:true,
      	title:"Draw Game",
      	buttons: {
      		"OK":function(){
      			$(this).dialog("close");
      		}
      	}
	});
}

User.prototype.initResultDialog=function() {
	$("#resultDialog").dialog({
		autoOpen:false,
		height: 230,
      	width: 200,
      	modal:true,
      	title:"result",
      	buttons: {
      		"OK":function(){
      			$(this).dialog("close");
      		}
      	}
	});
}

User.prototype.drawAgreeButtonHandler=function(me) {
	return function() {
		me.drawAction();
		me.endGameHandler("draw");
		me.chessboard.IsLocked(true);
		$("#drawDialog").dialog("close");
	}
}

User.prototype.drawDisagreeButtonHandler=function(me) {
	return function() {
      	me.disagreeDrawAction();
      	$("#drawDialog").dialog("close");
	}
}

User.prototype.initAskDrawDialog=function(me) {
	$("#drawDialog").dialog({
		autoOpen:false,
		height: 230,
      	width: 200,
      	modal:true,
      	title:"Ask for Draw",
      	buttons: {
      		"Agree":me.drawAgreeButtonHandler(this),
      		"Disagree":me.drawDisagreeButtonHandler(this)
      	}
	});
}

User.prototype.initAskStartDialog=function() {
	$("#askStartDialog").dialog({
		autoOpen:false,
		height: 230,
      	width: 200,
      	modal:true,
      	title:"Start Request",
      	buttons: {
      		"OK":this.startOKButtonHandler(this)
      	}
	});
};

User.prototype.initWaitStartDialog=function() {
	$("#waitStartDialog").dialog({
		autoOpen:false,
		height: 230,
      	width: 200,
      	modal:true,
      	title:"Waiting...",
      	buttons: {
      	}
	});
}

User.prototype.startOKButtonHandler=function(me) {
	return function() {
		me.readyAction();
		if(me.Side()==-1) {
			me.chessboard.unLock();
		}
		$("#askStartDialog").dialog("close");
		document.getElementById("startbutton").disabled=true;
		document.getElementById("drawbutton").disabled=false;
	}
}

User.prototype.addLine=function(name,side,win,draw,lose,rate) {
	var table=document.getElementById("userTable");
	var newLine=table.insertRow(table.childElementCount);
	newLine.setAttribute("id","table_line_"+name);
	var nameCell=newLine.insertCell(0);
	var sideCell=newLine.insertCell(1);
	var winCell=newLine.insertCell(2);
	var drawCell=newLine.insertCell(3);
	var loseCell=newLine.insertCell(4);
	var rateCell=newLine.insertCell(5);
	var sideStr="";
	if(side=="-1") {
		sideStr="White";
	}
	else if(side=="0") {
		sideStr="Spectator";
	}
	else {
		sideStr="Black";
	}
	nameCell.innerHTML=name;
	sideCell.innerHTML=sideStr;
	winCell.innerHTML=win;
	drawCell.innerHTML=draw;
	loseCell.innerHTML=lose;
	rateCell.innerHTML=rate;
}

User.prototype.deleteLine=function(name) {
	var line=document.getElementById("table_line_"+name);
	line.parentNode.removeChild(line);
}

