package Controller;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;




import org.genericdao.DAOException;
import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import Bean.User;
import DAO.Model;
import DAO.UserDAO;
import Form.ChangePwdForm;


public class AjaxChangePwdAction extends Action {
	private FormBeanFactory<ChangePwdForm> formBeanFactory = FormBeanFactory.getInstance(ChangePwdForm.class);
	
	private UserDAO userDAO;

	public AjaxChangePwdAction(Model model) {
		userDAO = model.getUserDAO();
	}

	public String getName() { return "change-pwd.do"; }
    
    public String perform(HttpServletRequest request) {
    	// Set up error list
        List<String> errors = new ArrayList<String>();
        request.setAttribute("errors",errors);

        try {
	        
	        // Load the form parameters into a form bean
	        ChangePwdForm form = formBeanFactory.create(request);
	        
	        // If no params were passed, return with no errors so that the form will be
	        // presented (we assume for the first time).
	        if (!form.isPresent()) {
	            return "lobby.jsp";
	        }
	
	        // Check for any validation errors
	        errors.addAll(form.getValidationErrors());
	        if (errors.size() != 0) {
	            return "error-list.jsp";
	        }
	
			User user = (User) request.getSession().getAttribute("user");
			System.out.println("chanpwd"+user.getUserName());
	
			// Change the password
        	userDAO.setPassword(user.getUserName(), form.getNewPassword());
            request.setAttribute("res", 2);
	        return "msg.jsp";
        } catch (RollbackException e) {
        	errors.add(e.toString());
        	return "error-list.jsp";
        } catch (FormBeanException e) {
        	errors.add(e.toString());
        	return "error-list.jsp";
        }catch (DAOException e) {
        	errors.add(e.toString());
        	return "error-list.jsp";
		}
    }
}
