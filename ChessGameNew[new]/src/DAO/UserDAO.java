package DAO;

import java.util.Arrays;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import Bean.User;

public class UserDAO extends GenericDAO<User> {

	public UserDAO(ConnectionPool cp, String tableName) throws DAOException {
		super(User.class, tableName, cp);
	}

	public User[] getUsers() throws RollbackException {

		User[] users = match();
		Arrays.sort(users); // We want them sorted by last and first names (as
							// per User.compareTo());
		return users;

	}

	public User reademail(String email) throws DAOException,
			RollbackException {


			User[] a = match(MatchArg.contains("email", email));
			User user;
			if (a.length == 0) {
				user = null;
			} else {
				user = a[0];
			}

			return user;

	}
	
	

	public User readusername(String username) throws DAOException,
			RollbackException {

			User[] a = match(MatchArg.contains("userName", username));
			User user;
			if (a.length == 0) {
				user = null;
			} else {
				user = a[0];
			}

			return user;

	}

	public void setPassword(String userName, String password)
			throws RollbackException, DAOException {
		try {
			Transaction.begin();
			User dbUser = readusername(userName);

			if (dbUser == null) {
				throw new RollbackException("User " + userName
						+ " no longer exists");
			}

			dbUser.setPasswordx(password);

			update(dbUser);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}
	
	
	

	
	public void setWin(String userName)	throws RollbackException, DAOException {
		try {
			Transaction.begin();
			User dbUser = readusername(userName);

			if (dbUser == null) {
				throw new RollbackException("User " + userName
						+ " no longer exists");
			}

			dbUser.setWin(dbUser.getWin()+1);
			dbUser.setTotalGame(dbUser.getTotalGame()+1);
			
			update(dbUser);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}
	
	public void setLost(String userName) throws RollbackException, DAOException {
		try {
			Transaction.begin();
			User dbUser = readusername(userName);

			if (dbUser == null) {
				throw new RollbackException("User " + userName
						+ " no longer exists");
			}

			dbUser.setLost(dbUser.getLost()+1);
			dbUser.setTotalGame(dbUser.getTotalGame()+1);
			
			update(dbUser);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}
	
	public void setDraw(String userName) throws RollbackException, DAOException {
		try {
			Transaction.begin();
			User dbUser = readusername(userName);

			if (dbUser == null) {
				throw new RollbackException("User " + userName
						+ " no longer exists");
			}

			dbUser.setDraw(dbUser.getDraw()+1);
			dbUser.setTotalGame(dbUser.getTotalGame()+1);

			update(dbUser);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}
	
	public void setRank(String userName, String status) throws RollbackException, DAOException {
		try {
			Transaction.begin();
			User dbUser = readusername(userName);

			if (dbUser == null) {
				throw new RollbackException("User " + userName
						+ " no longer exists");
			}
			
			if(status.equals("win")){
			dbUser.setRank(dbUser.getRank()+3);
			}else if(status.equals("lose")){
				dbUser.setRank(dbUser.getRank());	
			}else
				dbUser.setRank(dbUser.getRank()+1);
			update(dbUser);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}
}

