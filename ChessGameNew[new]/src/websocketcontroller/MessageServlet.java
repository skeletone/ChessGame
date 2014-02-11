package websocketcontroller;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

public class MessageServlet extends WebSocketServlet {
	@Override
	protected StreamInbound createWebSocketInbound(String arg0,
			HttpServletRequest arg1) {
		// TODO Auto-generated method stub
        return new MyMessageInBound();  
	}

}
