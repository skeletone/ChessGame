package Form;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.FilenameUtils;
import org.mybeans.form.FileProperty;
import org.mybeans.form.FormBean;

public class RegistryForm extends FormBean{
	private String userName;
	private String email;
	private String password;
	private String conpassword;
	private FileItem file = null;
	private File uploadFolder=new File("/img");
	private String path;
	
	public static int FILE_MAX_LENGTH = 1024 * 1024;

	public void setUserName(String userName) {
		this.userName = trimAndConvert(userName,"<>\"");
		
	}

	public void setEmail(String email) {
		this.email = trimAndConvert(email,"<>\"");
	}

	public void setPassword(String password) {
		this.password = password.trim();
	}

	public void setConpassword(String conpassword) {
		this.conpassword = conpassword.trim();
	}


	public String getUserName() {
		return userName;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getConpassword() {
		return conpassword;
	}

	public void setFile(FileItem file) {
		this.file = file;
	}
	
    public String getPath() {
    	
    	if(file == null || file.getName().length() == 0){
    		System.out.println("test");
    		path="";
    	}else{
    		try {
    		String fileName = FilenameUtils.getName(file.getName());
    		String fileNamePrefix = FilenameUtils.getBaseName(fileName) + "_";
    		String fileNameSuffix = "." + FilenameUtils.getExtension(fileName);
    		File exfile = File.createTempFile(fileNamePrefix, fileNameSuffix, uploadFolder);
		    file.write(exfile);
		    path=exfile.getAbsolutePath();
		    System.out.println("path:"+path);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				System.out.println("test");
			}

    	}
		return path;
	}

	public List<String> getValidationErrors() {
        List<String> errors = new ArrayList<String>();

        if (userName == null || userName.length() == 0 || userName.matches("\\s+")) errors.add("User name is required");
        if (email == null || email.length() == 0 || email.matches("\\s+")) errors.add("Email Address is required");
        if (password == null || password.length() == 0 || password.matches("\\s+")) errors.add("Password is required");
        if (conpassword == null || conpassword.length() == 0 || conpassword.matches("\\s+")) errors.add("Please confirm the password");

		
        if (errors.size() > 0) return errors;


        if (!email.matches(".+[@].+")) errors.add("Invalid fortmat for email address");
        if(!password.equals(conpassword)) errors.add("Password does not match");
		if (file != null && file.getName().length() != 0&&file.getSize()==0) {
			errors.add("Zero length file");
		}
        return errors;
    }
}
