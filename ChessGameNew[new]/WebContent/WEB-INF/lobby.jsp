<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<jsp:include page="login-temp.jsp" />

<div id=lobbyPage>
	<script>
Init();
</script>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span11 offset1">
				<div id="space" class="row">
					<div class="span3"></div>
					<div class="span8"></div>
				</div>
				<div class="span3" id="usertable">
					<p></p>
					<p>
					<h4 style="margin-left: 30px; color: #fff;">Online User</h4>
					<!-- 		</p> -->



					<!-- 			<script>
      if("WebSocket" in window){
    	  alert("WebSocket is supported by your Browser!");
          var wsUri=new WebSocket("ws://localhost:9998/UserList");
          
      }
      else
      {
         // The browser doesn't support WebSocket
         alert("WebSocket NOT supported by your Browser!");
      }
      </script> -->
					<table class="table table-condensed">
						<thead>
							<tr>
								<th>User Name</th>
								<th>Rank</th>
							</tr>
						</thead>

						<tbody>
							<c:forEach var="onlineuser" items="${userlist}">
								<tr>
									<td><i class="icon-user"></i> <a href="#" rel="popover"
										data-placement="bottom" data-modifier="popover"
										title="Profile"
										data-content="Total Game: ${onlineuser.totalGame}  Win: ${onlineuser.win}  
									Lost: ${onlineuser.lost}  Draw: ${onlineuser.draw}"
										style="color: #fff"> ${onlineuser.userName}</a></td>
									<td>${onlineuser.rank}</td>
								</tr>
							</c:forEach>
						</tbody>

					</table>
				</div>
				<div class="span8">
					<p></p>
					<p>
					<h4 style="margin-left: 30px; color: #fff;">Game Rooms</h4>
					<!-- 		</p> -->

					<div class="row-fluid" style="margin-left: 30px">
						<div class="span3" id="gameroom">

							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									<tr>
										<th><label for="numplayer"> ${numplayer[0]}
												people in the room </label></th>
									</tr>
									<%-- <c:if test="${startgamehelper[0]==false}">
										<script>
                                           document.getElementsByName("game")[0].disabled = true;
                                    </script> --%>
									<%-- </c:if> --%>
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(1)"></th>
									</tr>
								</thead>
							</table>
						</div>
						<!-- 						<img src="img/profileicon.png" alt="gameicon" height="300" width="150">Level 2</div> -->
						<div class="span3" id="gameroom">
							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									<tr>
										<th><label for="numplayer"> ${numplayer[1]}
												people in the room </label></th>
									</tr>
<%-- 								    <c:if test="${startgamehelper[1]==false}">
										<script>
                                           document.getElementsByName("game")[1].disabled = true;
                                    </script>
									</c:if> --%>
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(2)"></th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="span3" id="gameroom">
							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									<tr>
										<th><label for="numplayer"> ${numplayer[2]}
												people in the room </label></th>
									</tr>
<%-- 								    <c:if test="${startgamehelper[2]==false}">
										<script>
                                           document.getElementsByName("game")[2].disabled = true;
                                    </script>
									</c:if>	 --%>								
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(3)"></th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<div class="row-fluid" style="margin-left: 30px">
						<div class="span3" id="gameroom">
							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									<tr>
										<th><label for="numplayer"> ${numplayer[3]}
												people in the room </label></th>
									</tr>
<%-- 								    <c:if test="${startgamehelper[3]==false}">
										<script>
                                           document.getElementsByName("game")[3].disabled = true;
                                    </script>
									</c:if>	 --%>										
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(4)"></th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="span3" id="gameroom">
							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									
									<tr>
										<th><label for="numplayer"> ${numplayer[4]}
												people in the room </label></th>
									</tr>
<%-- 								    <c:if test="${startgamehelper[4]==false}">
										<script>
                                           document.getElementsByName("game")[4].disabled = true;
                                    </script>
                                    </c:if>	 --%>								
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(5)"></th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="span3" id="gameroom">
							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									<tr>
										<th><label for="numplayer"> ${numplayer[5]}
												people in the room </label></th>
									</tr>
<%-- 								    <c:if test="${startgamehelper[5]==false}">
										<script>
                                           document.getElementsByName("game")[5].disabled = true;
                                    </script>
                                    </c:if> --%>										
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(6)"></th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<div class="row-fluid" style="margin-left: 30px">
						<div class="span3" id="gameroom">
							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									<tr>
										<th><label for="numplayer"> ${numplayer[6]}
												people in the room </label></th>
									</tr>
<%-- 								    <c:if test="${startgamehelper[6]==false}">
										<script>
                                           document.getElementsByName("game")[6].disabled = true;
                                    </script>
                                    </c:if>	 --%>									
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(7)"></th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="span3" id="gameroom">
							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									<tr>
										<th><label for="numplayer"> ${numplayer[7]}
												people in the room </label></th>
									</tr>
<%-- 								    <c:if test="${startgamehelper[7]==false}">
										<script>
                                           document.getElementsByName("game")[7].disabled = true;
                                    </script>
                                    </c:if> --%>										
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(8)"></th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="span3" id="gameroom">
							<table class="table gametable">
								<thead>
									<tr>
										<th><img src="img/whiteking.png" alt="gameicon"
											height="100" width="40"></th>
									</tr>
									<tr>
										<th><label for="numplayer"> ${numplayer[8]}
												people in the room </label></th>
									</tr>
<%-- 								    <c:if test="${startgamehelper[8]==false}">
										<script>
                                           document.getElementsByName("game")[8].disabled = true;
                                    </script>
                                    </c:if> --%>										
									<tr>
										<th><input class="btn cancel" id="game" type="button"
											value="Join the Room" onclick="clickHandler(9)"></th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="footer.jsp" />