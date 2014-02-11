package Controller;

import java.util.Map;


import javax.servlet.http.HttpServletRequest;

import Bean.User;
import DAO.GameDAO;
import DAO.Model;
import DAO.UserDAO;

public class GameAction extends Action {
//	private UserDAO userDAO;
//	private GameDAO gameDAO;
	private Map<String, Integer> roomuser;
	private int player;
    private int[] roomstatus;
    
	public GameAction(Model model) {
//		userDAO = model.getUserDAO();
//		gameDAO = model.getGameDAO();
		roomuser = Model.getRoomUser();
		roomstatus=Model.getRoomstatus();
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return "game.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		String roomid = request.getParameter("room");
		int num=Integer.parseInt(roomid)-1;
		roomstatus[num]+=1;
		if (roomuser.containsKey(roomid)) {
			int i = roomuser.get(roomid) + 1;
			roomuser.put(roomid, i);
			if(i==0)
				player=-1;
			else if (i == 1)
				player = 1;
			else if (i>1)
				player = 0;
		} else {
			roomuser.put(roomid, 0);
			player=-1;
		}
		request.setAttribute("side",player);
		request.setAttribute("gid", roomid);
		
		User user=(User) request.getSession().getAttribute("user");
		request.setAttribute("profilePic", user.getProfilePic());
		request.setAttribute("uid", user.getUserName());
		request.setAttribute("totalgame", user.getTotalGame());
		request.setAttribute("rank", user.getRank());
		request.setAttribute("win", user.getWin());
		request.setAttribute("lost", user.getLost());
		request.setAttribute("draw", user.getDraw());
		request.setAttribute("numplayer", roomstatus);

		return "chessgame.jsp";
	}

}
