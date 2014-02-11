package Form;

import java.util.ArrayList;
import java.util.List;


import org.mybeans.form.FormBean;

public class LoginForm extends FormBean {
	private String emailAddress;
	private String password;


	public String getEmailAddress() {
		return emailAddress;
	}

	public String getPassword() {
		return password;
	}


    
    public List<String> getValidationErrors() {
        List<String> errors = new ArrayList<String>();
        
        if (emailAddress == null || emailAddress.length() == 0) errors.add("Email Address is required");
        if (password == null || password.length() == 0) errors.add("Password is required");


        if (errors.size() > 0) return errors;

        if (!emailAddress.matches(".*[@].*")) errors.add("Invalid email address");
		
        return errors;
    }

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = trimAndConvert(emailAddress,"<>\"");
	}

	public void setPassword(String password) {
		this.password = password.trim();
	}
}
