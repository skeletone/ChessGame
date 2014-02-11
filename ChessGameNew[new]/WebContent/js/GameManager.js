var GameManager=function() {
	this.user=null;
	this.chatWindowDiv=null;
}

GameManager.prototype.initialize=function(user) {
	this.user=new User();
	this.user.initialize(user["uid"],user["gid"],user["side"],user["win"],user["draw"],user["lose"],user["rate"]);
	this.chatWindowDiv=$("#chatWindow");

	this.layout();
}

GameManager.prototype.layout=function() {
	$(this.chatWindowDiv).offset({
		left:50+560+100+50, 
		top:50+560-240
	});
	$(this.chatWindowDiv).show();
}

GameManager.prototype.sendChatMSG=function() {
	var msg=document.getElementById("msg").value;
	this.user.chatAction(msg);
	document.getElementById("chat").value+=this.user.UserID()+": "+msg+"\n";
	document.getElementById("chat").scrollTop=document.getElementById("chat").scrollHeight;
	document.getElementById("msg").value="";
}

GameManager.prototype.askForDraw=function() {
	this.user.askDrawAction();
}

GameManager.prototype.askToStart=function() {
	this.user.askStartAction();
}