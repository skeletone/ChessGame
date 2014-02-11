package Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.genericdao.DAOException;
import org.genericdao.RollbackException;

import Bean.Game;
import Bean.User;
import DAO.GameDAO;
import DAO.Model;
import DAO.UserDAO;

public class LobbyAction extends Action{

	
	private UserDAO userDAO;
	private GameDAO gameDAO;
	private List<User> userlist;
	private int[] roomstatus;
    private boolean[] startgamehelper;
	
	public LobbyAction(Model model) {
		userDAO = model.getUserDAO();
		gameDAO = model.getGameDAO();
		userlist = model.getUserList();
		roomstatus=Model.getRoomstatus();
		startgamehelper=Model.getStartgamehelper();
	}
	
	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return "lobby.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		Game[] gameslist;
		try {

			if (errors.size() != 0) {
				return "lobby.jsp";
			}
			
			User user = (User) request.getSession().getAttribute("user");
			User userFromDB=userDAO.readusername(user.getUserName());
			request.getSession().setAttribute("user", userFromDB);
			user = (User) request.getSession().getAttribute("user");
			
			request.setAttribute("profilePic", user.getProfilePic());
			request.setAttribute("userName", user.getUserName());
			request.setAttribute("totalgame", user.getTotalGame());
			request.setAttribute("rank", user.getRank());
			request.setAttribute("email", user.getEmail());
			request.setAttribute("win", user.getWin());
			request.setAttribute("lost", user.getLost());
			request.setAttribute("draw", user.getDraw());
            request.setAttribute("startgamehelper",startgamehelper);
			gameslist = gameDAO.getProcess(user.getUserID());

			request.setAttribute("gameslist", gameslist);
			request.setAttribute("totalgame", user.getTotalGame());
			
			if (!userlist.contains(user)) {
				userlist.add(user);
				Iterator<User> i=userlist.iterator();
				while(i.hasNext()){
				System.out.println("test: "+i.next().getUserName());
				}
				Collections.sort(userlist);
			}
			
			for(int i=0;i<userlist.size();i++) {
				userlist.set(i, userDAO.readusername(userlist.get(i).getUserName()));
			}
			
			
			request.setAttribute("userlist", userlist);
            request.setAttribute("numplayer", roomstatus);
			return "lobby.jsp";
		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
