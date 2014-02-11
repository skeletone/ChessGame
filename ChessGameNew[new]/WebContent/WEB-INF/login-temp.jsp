<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
 <!-- <script src="http://code.jquery.com/jquery.min.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/ajax.js"></script> --> 
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<title>Online Chess Game</title>
<link
	href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700'
	rel='stylesheet' type='text/css'>
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/ajax.js"></script>
</head>
<body>
	<div class="navbar navbar-fixed-top">

		<div class="navbar-inner">

			<div class="container">
				<a class="btn btn-navbar" data-toggle="collapse"
					data-target=".nav-collapse"> <span class="icon-bar"></span> <span
					class="icon-bar"></span> <span class="icon-bar"></span>
				</a> <a class="brand" href="lobby.do">Online Chess Game</a>

				<!-- 				 				<div class="nav-collapse">
				 									<p class="navbar-text pull-right">Welcome </p> -->
				<p class="navbar-text pull-right">Welcome ${userName}</p>
				<%-- ${userName} --%>
				<div class="user-profile">
					<a data-toggle="dropdown" class="dropdown-toggle"> <img
						src="${profilePic}" alt="profile">
					</a> <span class="caret"></span>
					<ul class="dropdown-menu pull-right" id="choice">
						<li><a href="#profile-modal" data-toggle="modal"
							data-target="#profile-modal"><i class="icon-user"></i> View
								Profile </a></li>
						<li><a href="#password-modal" data-toggle="modal"
							data-target="#password-modal"><i class="icon-pencil"></i>
								Change Password </a></li>
						<li><a href="#logoutmodal" data-toggle="modal"
							data-target="#logoutmodal"> Logout </a></li>
					</ul>

				</div>

				<!-- 				</div> -->




				<!-- 				</div> -->

				<!--           <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">

            <span class="icon-bar"></span>

            <span class="icon-bar"></span>

            <span class="icon-bar"></span>

          </a>
          <a class="brand" href="#">Project name</a>

          <div class="nav-collapse">

            <ul class="nav">

              <li class="active"><a href="#">Home</a></li>

              <li><a href="#about">About</a></li>

              <li><a href="#contact">Contact</a></li>

            </ul>

          </div>/.nav-collapse -->

			</div>

		</div>

	</div>

	<!--  	<div class="container"> -->

	<!-- 		Main hero unit for a primary marketing message or call to action -->

	<!-- 	<div class="hero-unit">

			<h1>Hello, world!</h1>

			<p>This is a template for a simple marketing or informational
				website. It includes a large callout called the hero unit and three
				supporting pieces of content. Use it as a starting point to create
				something more unique.</p>

			<p>
				<a class="btn btn-primary btn-large">Learn more ?</a>
			</p>

		</div>
		 

		<hr>

		<footer>

			<p>Developed by Dianxia Yang & Shuangjie Cai</p>

		</footer>

	</div> -->
	<!-- 	/container

	Le javascript

    ==================================================

	Placed at the end of the document so the pages load faster -->

	<!-- 	<script src="http://code.jquery.com/jquery.min.js"></script>

	<script src="js/bootstrap.js"></script>
 -->

	<div id="profile-modal" class="modal hide fade landing-modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<h3>Profile</h3>
		</div>
		<div class="modal-body">
			<div class="control-group">
				<div class="controls">
					<img alt="Profileimg" src="${profilePic}"
						style="margin-left: 150px">
				</div>
			</div>
			<div class="control-group pull-left">
				<label for="usernametitle">User Name: </label> <label for="username">
					${userName} </label>
			</div>
			<div class="control-group pull-right">
				<label for="emailtitle">Email: </label> <label for="email">
					${email} </label>
			</div>
			<div class="control-group">
				<label for="totalgametitle">Total Games: </label> <label
					for="totalgame"> ${totalgame} </label>
			</div>
			<div class="control-group">
				<label for="ranktitle">Rank: </label> <label for="rank">
					${rank} </label>
			</div>
			<div class="control-group">
				<label for="wintitle">Number of Winnings: </label> <label for="win">
					${win} </label>
			</div>
			<p></p>
			<div class="control-group">
				<label for="losttitle">Number of Losts: </label> <label for="lost">
					${lost} </label>
			</div>
			<div class="control-group">
				<label for="drawtitle">Number of Draws: </label> <label for="draw">
					${draw} </label>
			</div>
			<div class="control-group pull-left">
				<label for="processtitle">View Game History: </label>
				<div class="controls">
					<c:forEach var="game" items="${gameslist}">
						<label> <a href="view.do?id=${game.gameID}">${game.gameID}</a>
						</label>
						<label> ${game.GameDate} </label>
					</c:forEach>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<a href="#" class="button" data-dismiss="modal">Close</a>
		</div>

	</div>



	<div id="logoutmodal" class="modal hide fade landing-modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<h3>Confirmation</h3>
		</div>
		<div class="modal-body">
			<p>
			<h3>Are you sure to log out?</h3>
			</p>
		</div>
		<div class="modal-footer">
			<a href="#" class="button" data-dismiss="modal">Cancel</a> <button
				type="submit" class="button" onclick="logoutAction()">Yes</button>
		</div>
	</div>

	<div id="password-modal" class="modal hide fade landing-modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<h3>Change the Password</h3>
		</div>
		<div class="modal-body">
			<form method="post" id="changepwd">
				<div id="pwdresult"></div>

				<div class="control-group">
					<label for="password">New Password</label>
					<div class="controls">
						<input class="input-medium" name="newPassword" type="password"
							value="" />
					</div>
				</div>
				<div class="control-group">
					<label for="password">Confirm Password</label>
					<div class="controls">
						<input class="input-medium" name="confirmPassword" type="password"
							value="" />
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<div class="control-group">
				<button type="submit" class="button" id="pwdsubmit">Change
					Password</button>
			</div>
		</div>
	</div>