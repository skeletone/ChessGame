package Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.genericdao.DAOException;
import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import Bean.Game;
import Bean.User;
import DAO.GameDAO;
import DAO.Model;
import DAO.UserDAO;
import Form.LoginForm;

/*
 * Processes the parameters from the form in login.jsp.
 * If successful, set the "user" session attribute to the
 * user's User bean and then redirects to view the originally
 * requested photo.  If there was no photo originally requested
 * to be viewed (as specified by the "redirect" hidden form
 * value), just redirect to manage.do to allow the user to manage
 * his photos.
 */
public class LoginAction extends Action {
	private FormBeanFactory<LoginForm> formBeanFactory = FormBeanFactory
			.getInstance(LoginForm.class);

	private UserDAO userDAO;
	private GameDAO gameDAO;
	//private List<User> userlist;

	public LoginAction(Model model) {
		userDAO = model.getUserDAO();
		gameDAO = model.getGameDAO();
		//userlist = model.getUserList();
	}

	public String getName() {
		return "login.do";
	}

	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);

		try {
			LoginForm form = formBeanFactory.create(request);
			request.setAttribute("form", form);
			System.out.println("logintest");

			if (!form.isPresent()) {
				//return "lobby.jsp";
				return "login.jsp";
			}

			// Any validation errors?
			errors.addAll(form.getValidationErrors());
			System.out.println(errors.size());
			if (errors.size() != 0) {
				return "login.jsp";
			}
			System.out.println("form: " + form.getEmailAddress());

			// Look up the user
			User user = userDAO.reademail(form.getEmailAddress());

			if (user == null) {
				errors.add("User Name not found");
				return "login.jsp";
			}

			// Check the password
			if (!user.checkPassword(form.getPassword())) {
				errors.add("Incorrect password");
				return "login.jsp";
			}

			// Attach (this copy of) the user bean to the session
			HttpSession session = request.getSession(true);
			session.setAttribute("user", user);
			return "lobby.do";
		} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (DAOException e) {
			// TODO Auto-generated catch block
        	errors.add(e.getMessage());
        	return "error.jsp";
		} catch (RollbackException e) {
			// TODO Auto-generated catch block
        	errors.add(e.getMessage());
        	return "error.jsp";
		}
	}
}
