package Controller;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import Bean.User;
import DAO.Model;



/*
 * Logs out by setting the "user" session attribute to null.
 * (Actions don't be much simpler than this.)
 */
public class LogoutAction extends Action {
	private List<User> userlist;
	public LogoutAction(Model model) { 
		userlist=model.getUserList();
	}

	public String getName() { return "logout.do"; }

	public String perform(HttpServletRequest request) {

        userlist.remove((User)request.getSession().getAttribute("user"));
        Collections.sort(userlist);
        
        HttpSession session = request.getSession(false);
        session.setAttribute("user",null);
        

        
        request.setAttribute("userlist", userlist);

//		request.setAttribute("message","You are now logged out");
        return "login.do";
    }
}
