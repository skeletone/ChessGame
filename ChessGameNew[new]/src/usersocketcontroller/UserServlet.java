package usersocketcontroller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

import websocketcontroller.MyMessageInBound;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/UserServlet")
public class UserServlet extends WebSocketServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected StreamInbound createWebSocketInbound(String arg0,
			HttpServletRequest arg1) {
		// TODO Auto-generated method stub
		return new UserInBound();
	}
       


}
