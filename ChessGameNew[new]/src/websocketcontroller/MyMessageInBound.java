package websocketcontroller;

import java.io.IOException;  
import java.nio.ByteBuffer;  
import java.nio.CharBuffer;  
import java.util.Map;


import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound; 
import org.genericdao.DAOException;
import org.genericdao.RollbackException;

import DAO.Model;
import DAO.UserDAO;


public class MyMessageInBound extends MessageInbound {
	private int gameID=-1;
	public String userID="";
	public String isSpectator="";
	public Model model;
	private int[] roomstatus;
	private Map<String, Integer> roomuser;
	private boolean[] startgamehelper;
	

	@Override
	protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void onTextMessage(CharBuffer msg) throws IOException {
		if(msg.toString().startsWith("login")) {
			loginServerHandler(msg);
		}
		else if(msg.toString().startsWith("win")) {
			winServerHandler(msg);
		}
		else if(msg.toString().startsWith("draw")) {
			drawServerHandler(msg);
		}
		else if(msg.toString().startsWith("lose")) {
			loseServerHandler(msg);
		}
		else if(msg.toString().startsWith("logout")) {
			String msgStr=msg.toString();
			String[] results=msgStr.split("@@@@@");
			roomstatus=Model.getRoomstatus();
			roomuser=Model.getRoomUser();
			int i = roomuser.get(results[2]) - 1;
			roomuser.put(results[2], i);	
			int roomid=Integer.parseInt(results[2])-1;
			roomstatus[roomid]-=1;
			startgamehelper=Model.getStartgamehelper();
			startgamehelper[roomid]=true;
		}else if(msg.toString().startsWith("ready")){
			String msgStr=msg.toString();
			String[] results=msgStr.split("@@@@@");
			int i =Integer.parseInt(results[2])-1;
			startgamehelper=Model.getStartgamehelper();
			startgamehelper[i]=false;
		}
		for(MessageInbound messageInbound:InitServlet.getSocketList(gameID)) {
			if(messageInbound==this) continue;
			CharBuffer buffer = CharBuffer.wrap(msg);  
            WsOutbound outbound = messageInbound.getWsOutbound();  
            outbound.writeTextMessage(buffer);  
            outbound.flush();  
		}
	}
	
	 @Override  
    protected void onClose(int status) {  
		if(gameID!=-1){ 
			InitServlet.getSocketList(gameID).remove(this);  
			super.onClose(status);
		}
    }  
  
    @Override  
    protected void onOpen(WsOutbound outbound) {  
        super.onOpen(outbound);  
    }  
    
    private void winServerHandler(CharBuffer msg) {
		String msgStr=msg.toString();
		String[] results=msgStr.split("@@@@@");
		try {
			InitServlet.getUserDAO().setRank(results[1], "win");
			InitServlet.getUserDAO().setWin(results[1]);
		} catch (RollbackException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
    private void drawServerHandler(CharBuffer msg) {
		String msgStr=msg.toString();
		String[] results=msgStr.split("@@@@@");
		try {
			InitServlet.getUserDAO().setRank(results[1], "draw");
			InitServlet.getUserDAO().setDraw(results[1]);
			for(MyMessageInBound messageInbound:InitServlet.getSocketList(gameID)) {
				if(messageInbound==this) continue;
				if(messageInbound.isSpectator=="true") continue;
				InitServlet.getUserDAO().setDraw(messageInbound.userID);
				InitServlet.getUserDAO().setRank(messageInbound.userID, "draw");
			}
		} catch (RollbackException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
    private void loseServerHandler(CharBuffer msg) {
		String msgStr=msg.toString();
		String[] results=msgStr.split("@@@@@");
		try {
			InitServlet.getUserDAO().setRank(results[1], "lose");
			InitServlet.getUserDAO().setLost(results[1]);
			
			for(MyMessageInBound messageInbound:InitServlet.getSocketList(gameID)) {
				if(messageInbound==this) continue;
				if(messageInbound.isSpectator=="true") continue;
				InitServlet.getUserDAO().setWin(messageInbound.userID);
				InitServlet.getUserDAO().setRank(messageInbound.userID, "win");
			}
		} catch (RollbackException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
    private void loginServerHandler(CharBuffer msg) {
    	
    	String msgStr=msg.toString();
    	String[] results=msgStr.split("@@@@@");
    	this.userID=results[1];
    	this.isSpectator=results[9];
    	if(results[2]!="-1") {
    		gameID=Integer.parseInt(results[2]);
    		InitServlet.getSocketList(gameID).add(this);
    	}
    	System.out.println(this.userID+" "+this.isSpectator);
    }

}
