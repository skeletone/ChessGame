package DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;

import Bean.User;


public class Model {
	private GameDAO gameDAO;
	private UserDAO userDAO;
	private List<User> userlist;
	private static Map<String, Integer> roomuser;
	private static int[] roomstatus;
	private static boolean[] startgamehelper;


	public Model(ServletConfig config) throws ServletException {
		try {
			String jdbcDriver = "com.mysql.jdbc.Driver";
			String jdbcURL    = "jdbc:mysql:///chessgame";
			
			ConnectionPool pool = new ConnectionPool(jdbcDriver,jdbcURL);
			
			userDAO  = new UserDAO(pool, "User");
			gameDAO = new GameDAO(pool, "Game");
			userlist=new ArrayList<User>();
			roomuser =new TreeMap<String, Integer>();
			roomstatus=new int[9];
            for(int i=0;i<9;i++){
            	roomstatus[i]=0;
            }
            startgamehelper=new boolean[9];
            for(int i=0;i<9;i++){
            	startgamehelper[i]=true;
            }
		} catch (DAOException e) {
			throw new ServletException(e);
		}
	}
	
	public List<User> getUserList() { return userlist; }
	public static Map<String, Integer> getRoomUser() { return roomuser;}
	public GameDAO getGameDAO()  { return gameDAO; }
	public UserDAO getUserDAO()  { return userDAO; }

	public static int[] getRoomstatus() {
		return roomstatus;
	}
	

	public static boolean[] getStartgamehelper() {
		return startgamehelper;
	}
	
}
