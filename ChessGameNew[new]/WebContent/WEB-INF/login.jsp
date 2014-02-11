<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Online Chess Game Login</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">

<!-- Web Fonts -->
<link
	href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700'
	rel='stylesheet' type='text/css'>
<!-- CSS styles -->
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
</head>

<body>

	<!-- Main Body Content -->
	<div id="landingPage">
		<div class="container">
			<div class="row">
				<div class="span10 offset1">
					<div id="home-header" class="row">
						<div class="span4"></div>
						<div class="span6"></div>
					</div>

					<div class="introduction">
						<div class="row">
							<div class="span6">
								<h1>Online Chess Game</h1>
								<h2>
									This is an online chess platform. You can challenge your
									friends <br /> and meet new players<br /> <br> <i>Sign
										up to explore the game!</i>
								</h2>

								<a class="button" href="#register-modal" data-toggle="modal"
									data-target="#register-modal">Register Now!</a>
							</div>
							<div class="span4">
								<form method="post" action="login.do">
									<div>
										<label for="email">Email Address</label>
										<div class="controls">
											<input class="input-medium" name="emailAddress" type="text" />
										</div>
									</div>
									<div>
										<label for="password">Password</label>
										<div class="controls">
											<input class="input-medium" name="password" type="password" />
										</div>
									</div>
									<div class="control-group">
										<div class="controls">
											<button type="submit" class="button" id="loginsubmit">Login</button>
										</div>
									</div>
									<div>
										<jsp:include page="error-list.jsp" />
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="clearfix"></div>
		</div>
	</div>

	<!-- Register Modal -->
	<div id="register-modal" class="modal hide fade landing-modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<h3>Register</h3>
		</div>
		<div class="modal-body">
			<form method="post" id="register" action="register.do">
				<div class="control-group">
					<label for="name">User Name</label>
					<div class="controls">
						<input class="input-medium" name="userName" type="text" value="" />
						<p class="help-block">* Cannot be empty</p>
					</div>
					<div class="control-group">
						<label for="email">Email Address</label>
						<div class="controls">
							<input class="input-medium" name="email" type="text" value="" />
							<p class="help-block">* Cannot be empty</p>
						</div>
					</div>
					<div class="control-group">
						<label for="password">Password</label>
						<div class="controls">
							<input class="input-medium" name="password" type="password"
								value="" />
								<p class="help-block">* Cannot be empty</p>
						</div>
					</div>
					<div class="control-group">
						<label for="password">Confirm Password</label>
						<div class="controls">
							<input class="input-medium" name="conpassword" type="password"
								value="" />
							<p class="help-block">* Cannot be empty</p>
						</div>
					</div>
 					<div class="control-group">
						<label for="profilepic">Upload Profile Pictures</label>
						<div class="controls">
						<input type="file" name="file" value="${filename}" />
						<img src="${profilePic}" alt="file" class="img-rounded">
						</div>
					</div> 
					<div class="control-group">
						<div class="controls">
							<button type="submit" class="button" id="registersubmit">Register
								an account</button>
						</div>
					</div>
				</div>
				<div  id="result"></div>
			</form>
		</div>
	</div>


	<!-- Javascript Files -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="http://code.jquery.com/jquery.min.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/ajax.js"></script>

</body>
</html>