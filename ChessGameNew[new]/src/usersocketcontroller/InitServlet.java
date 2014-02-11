package usersocketcontroller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import org.apache.catalina.websocket.MessageInbound;

import Bean.User;

/**
 * Servlet implementation class InitServlet
 */
@WebServlet("/InitServlet")
public class InitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private static ArrayList<MessageInbound> usersocketList;    
    
    public void init(ServletConfig config) throws ServletException {    
        InitServlet.usersocketList = new ArrayList<MessageInbound>();    
        super.init(config);    
        System.out.println("Server start============");    
    }

	public static List<MessageInbound> getUsersocketList() {
		return usersocketList;
	}    
           
}
