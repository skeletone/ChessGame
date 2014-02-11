package DAO;

import java.util.Arrays;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;



import Bean.Game;
import Bean.User;

public class GameDAO extends GenericDAO<Game>{

	public GameDAO(ConnectionPool cp, String tableName) throws DAOException {
		super(Game.class, tableName, cp);
	}
	
	public Game[] getProcess(int id) throws RollbackException {
		// Calls GenericDAO's match() method.
		// This no match constraint arguments, match returns all the Item beans
    	  
		Game[] gamesfst = match(MatchArg.equals("fstID", id));
		Game[] gamessnd = match(MatchArg.equals("sndID",id));
		Game[] games=new Game[gamesfst.length+gamessnd.length];
		for(int i=0;i<games.length;i++){
			if(i<gamesfst.length){
				games[i]=gamesfst[i];
			}else{
				games[i]=gamessnd[i-gamesfst.length];
			}
		}
		Arrays.sort(games);

		return games;
	}

	
}
