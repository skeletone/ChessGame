package Controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;



import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;



import Bean.User;
import DAO.Model;
import DAO.UserDAO;
import Form.RegistryForm;


/*
 * Processes the parameters from the form in register.jsp.
 * If successful:
 *   (1) creates a new User bean
 *   (2) sets the "user" session attribute to the new User bean
 *   (3) redirects to view the originally requested photo.
 * If there was no photo originally requested to be viewed
 * (as specified by the "redirect" hidden form value),
 * just redirect to manage.do to allow the user to add some
 * photos.
 */
public class AjaxRegisterAction extends Action {
	private FormBeanFactory<RegistryForm> formBeanFactory = FormBeanFactory.getInstance(RegistryForm.class);


	private UserDAO userDAO;
	
	public AjaxRegisterAction(Model model) {
		userDAO = model.getUserDAO();
	}

	public String getName() { return "register.do"; }

    public String perform(HttpServletRequest request) {
        List<String> errors = new ArrayList<String>();
        request.setAttribute("errors",errors);
        try {
        	RegistryForm form = formBeanFactory.create(request);
	        request.setAttribute("form",form);
	        // If no params were passed, return with no errors so that the form will be
	        // presented (we assume for the first time).
	        if (!form.isPresent()) {
//	        	request.setAttribute("res", 0);
//	        	return "register-msg.jsp";
	        	return "login.jsp";
	        }
	         System.out.println("test");
	        // Any validation errors?
	        errors.addAll(form.getValidationErrors());
	        if (errors.size() != 0) {
//	        	request.setAttribute("res", 1);
	        	return "error-list.jsp";
//	            return "login.jsp";
	        }
	        System.out.println("register pass"+form.getPassword());
	        // Create the user bean
	        User user = new User();
	        user.setUserName(form.getUserName());
	        user.setEmail(form.getEmail());
	        user.setProfilePicx(user.getEmail());
	        user.setPasswordx(form.getPassword());
        	userDAO.create(user);
          
	        
	        request.setAttribute("profilePic", user.getProfilePic());
	        request.setAttribute("userName", user.getUserName());
	        
	        request.setAttribute("res", 2);
	        return "msg.jsp";
//			return "lobby.do";
	        
	        
        } catch (FormBeanException e) {
        	errors.add(e.getMessage());
	       // request.setAttribute("res", 3);
	        return "error-list.jsp";
//        	return "login.jsp";
        } catch (RollbackException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			 return "error-list.jsp";
		}
    }
}
