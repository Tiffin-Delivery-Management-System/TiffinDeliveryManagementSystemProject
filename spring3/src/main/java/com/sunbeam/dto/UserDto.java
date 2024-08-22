package com.sunbeam.dto;

import javax.persistence.Column;
import javax.persistence.Lob;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.sunbeam.entities.Role;

public class UserDto {

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	private Long userId;
	
    private String name;

    private String email;

    private String password;

   private String phoneNo;

    private String address;
    
    
    private byte[] userImage;
    
    
    private String responseImage;
   

    // Getters and Setters
    public String getName(){
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getUserImage() {
		return userImage;
	}

	public void setUserImage(byte[] userImage) {
		this.userImage = userImage;
	}

	public String getResponseImage() {
		return responseImage;
	}

	public void setResponseImage(String responseImage) {
		this.responseImage = responseImage;
	}

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

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

//    public Role getRole() {
//        return role;
//    }
//
//    public void setRole(Role role) {
//        this.role = role;
//    }
}