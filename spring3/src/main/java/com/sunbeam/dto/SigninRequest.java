package com.sunbeam.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SigninRequest {
	
	@NotEmpty(message = "Email can't be blank")
	@Email(message = "Invalid email format")
	private String email;
	 
	private String password;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public SigninRequest(
			@NotEmpty(message = "Email can't be blank") @Email(message = "Invalid email format") String email,
			String password) {
		super();
		this.email = email;
		this.password = password;
	}
	@Override
	public String toString() {
		return "SigninRequest [email=" + email + ", password=" + password + "]";
	}
	
	
	
}
