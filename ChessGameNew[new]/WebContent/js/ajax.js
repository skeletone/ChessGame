/* attach a submit handler to the form */
$("#register").submit(function(event) {


  /* stop form from submitting normally */
  event.preventDefault();

  /* get some values from elements on the page: */
   var values = $(this).serialize();

  /* Send the data using post and put the results in a div */
    request=$.ajax({
      url: "register.do",
      type: "post",
      data: values  
      });
    request.done(function(data){
          if(data=='2'){
       	  alert("You have registered successfully! Please login to the Game Lobby!");
        	  $("#register-modal").fadeOut(200, function() {
            	  location.href = "login.do";
        	  });
          }else{

        	  $("#result").html(data);
          }
          });
});

/*---------------------Initialize------------------------------*/
var socket=null;
var Init=function(e){
	if(socket==null) {
		connect("ws://"+location.hostname+":"+location.port+"/ChessGameNew/UserList.do");	
	}
	
	window.onbeforeunload=function(){
		logoutAction();
	};
	
};

/*--------------------connect---------------------------------*/
var connect=function(host){
	if('WebSocket' in window) {
		socket=new WebSocket(host);
	}
	else if ('MozWebSocket' in window) {
		socket=new MozWebSocket(host);
	}
	else {
		alert("Your Browser does not support WebSocket!");
	}

	//Bind socket callbacks
	socket.onopen = function() {
		var queryString = location.href.substring(location.href.indexOf("?")+1); 

		if(queryString!="handler=true")
		    loginAction();
	}

	socket.onclose= function() {
		var message="logout"
		socket.send(message);
	};

	socket.onmessage=function(message){
		window.location.href="lobby.do"+"?handler=true";
	};
	

};



/*--------------------Action----------------------------------*/
var loginAction=function() {
	var message= "login"
	socket.send(message);
}

var logoutAction=function() {
	var message="logout"
	socket.send(message);
	location.href="logout.do";
};

//var closeWindowHandler=function(me) {
//	return function() {
//		me.logoutAction();
//	};
//};

//$("#logout").click(function(event){
//	event.preventDefault();
//	var message="logout"
//        +USER_MESSAGE_SEPARATOR
//        +${ userName }
//        +USER_MESSAGE_SEPARATOR
//        +${ rank };
//    usersocket.send(message);
//
//});

$("#changepwd").click(function(event){
	event.preventDefault();
	
	var values=$(this).serialize();
	
	request=$.ajax({
		url:"change-pwd.do",
		type: "post",
		data: values
	});
	
    request.done(function(data){
        if(data=='2'){
     	  alert("Password has been changed!");
     	 $('#password-modal').modal('hide');

        }else{
      	  $("#pwdresult").html(data);
        }
        });
	
});


var clickHandler=function(id){
	    
		location.href = "game.do?room="+id;
}
	




