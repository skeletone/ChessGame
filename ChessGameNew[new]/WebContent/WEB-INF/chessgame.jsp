<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>


<html>
<head>
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.2.custom.min.js"></script>
<script type="text/javascript" src="js/MoveGenerator.js"></script>
<script type="text/javascript" src="js/Chessboard.js"></script>
<script type="text/javascript" src="js/User.js"></script>
<script type="text/javascript" src="js/GameManager.js"></script>
<link rel="stylesheet" type="text/css" href="css/chessgame.css">
<link rel="stylesheet" type="text/css"
	href="css/ui-lightness/jquery-ui-1.10.2.custom.min.css">
</head>
<body onload="startGame()">
	<script type="text/javascript">
		var gm = new GameManager();
		function startGame() {
			/* 				var uID=document.getElementById("uid").value;
			 var gID=document.getElementById("gid").value;
			 var side=document.getElementById("side").value; */
			var uID = "${uid}";
			var gID = "${gid}";
			var side = "${side}";
			var profilePic = "${profilePic}";
			var totalgame = "${totalgame}";
			var rank = "${rank}";
			var win = "${win}";
			var lost = "${lost}";
			var draw = "${draw}";
			gm.initialize({
				"uid" : uID,
				"gid" : gID,
				"side" : side,
				"profilePic" : profilePic,
				"rate" : rank,
				"win" : win,
				"lose" : lost,
				"draw" : draw
			});
		}
	</script>
	<!-- 		<input type="text" id="uid"/>
		<input type="text" id="gid"/>
		<select id="side">
			<option value="1">Black</option>
			<option value="-1">White</option>
			<option value="0">Spectator</option>
		</select>
		<button onclick="startGame()">Go</button> -->
	<div id="promotionDialog" style="display: none">
		<input type="radio" id="pro_Q" name="pro" value="Q" checked="checked" />Queen<br>
		<input type="radio" id="pro_R" name="pro" value="R" />Rook<br> <input
			type="radio" id="pro_K" name="pro" value="K" />Knight<br> <input
			type="radio" id="pro_B" name="pro" value="B" />Bishop<br>
	</div>
	<div id="disagreeDialog" style="display: none">Your opponent
		refused your draw request.</div>
	<div id="drawDialog" style="display: none">Your oppenent is
		asking for a draw game.</div>
	<div id="resultDialog" style="display: none"></div>

	<div id="chatWindow" class="chatWindow">
		<textarea id="chat" readonly="readonly"></textarea>
		<br> <input onkeydown="if (event.keyCode==13) gm.sendChatMSG()"
			id="msg" type="text" />&nbsp;
		<button onclick="gm.sendChatMSG()">Send</button>
	</div>
	<div id="userList" class="userList">
		<table id="userTable">
			<tr>
				<td>User Name</td>
				<td>Side</td>
				<td>Win</td>
				<td>Draw</td>
				<td>Lose</td>
				<td>Rate</td>
			</tr>
		</table>
	</div>

	<div id="buttonDiv" class="buttonWindow">
		<button id="drawbutton" disabled="true" onclick="gm.askForDraw()">Draw</button>
		<button id="startbutton" onclick="gm.askToStart()">Start Game</button>
	</div>

	<div id="waitStartDialog" style="display: none">Waiting for your
		opponent to start the game.</div>
	<div id="askStartDialog" style="display: none">Your opponent
		request to start the game, Click OK to start.</div>
</body>
</html>
