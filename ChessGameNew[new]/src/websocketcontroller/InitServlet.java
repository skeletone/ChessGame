package websocketcontroller;  
  
import java.util.ArrayList;  
import java.util.LinkedList;
import java.util.List;  
  
import javax.servlet.ServletConfig;  
import javax.servlet.ServletException;  
import javax.servlet.http.HttpServlet;  
  
import org.apache.catalina.websocket.MessageInbound;  

import DAO.Model;
import DAO.UserDAO;
  
public class InitServlet extends HttpServlet {  
  
    private static final long serialVersionUID = -3163557381361759907L;  
    private static final int MAX_GAMEID=99;
      
    private static ArrayList<LinkedList<MyMessageInBound>> socketList;    
    
    private static Model model;
    
    public void init(ServletConfig config) throws ServletException {
    	model=new Model(getServletConfig());
    	
        InitServlet.socketList = new ArrayList<LinkedList<MyMessageInBound>>();
        for(int i=0;i<MAX_GAMEID;i++) {
        	socketList.add(new LinkedList<MyMessageInBound>());
        }
        super.init(config);    
        System.out.println("Server start============");    
    }    
        
    public static List<MyMessageInBound> getSocketList(int gameID) {    
        return socketList.get(gameID);
    }    
    
    public static UserDAO getUserDAO() {
		return model.getUserDAO();
	}
}  