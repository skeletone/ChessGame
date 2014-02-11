package usersocketcontroller;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;




public class UserInBound extends MessageInbound{

	@Override
	protected void onBinaryMessage(ByteBuffer msg) throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void onTextMessage(CharBuffer msg) throws IOException {
		// TODO Auto-generated method stub
		for(MessageInbound messageInbound:InitServlet.getUsersocketList()) {
			if(messageInbound==this) continue;
			CharBuffer buffer = CharBuffer.wrap(msg);  
            WsOutbound outbound = messageInbound.getWsOutbound();  
            outbound.writeTextMessage(buffer);  
            outbound.flush();  
		}
	}
	 @Override  
	    protected void onClose(int status) {  
	        InitServlet.getUsersocketList().remove(this);
	        super.onClose(status);  
	    }  
	  
	    @Override  
	    protected void onOpen(WsOutbound outbound) {
	        super.onOpen(outbound);  
	        InitServlet.getUsersocketList().add(this);
	        System.out.println(InitServlet.getUsersocketList().size());
	    }  
	    
}
