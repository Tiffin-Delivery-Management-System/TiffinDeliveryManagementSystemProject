package com.sunbeam.dto;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

public class DeliveryBoyDto {

    private Long deliveryBoyId;

    @NotNull
    @Size(max = 50)
    private String name;

    @NotNull
    @Size(max = 100)
    @Email
    private String email;

    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phoneNo;
    
    @NotNull
    private String password;

    @NotNull
    private Long tiffinServiceId; // Add this field
    
    public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


    // Getters and Setters
    public Long getDeliveryBoyId() {
        return deliveryBoyId;
    }

    public void setDeliveryBoyId(Long deliveryBoyId) {
        this.deliveryBoyId = deliveryBoyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Long getTiffinServiceId() {
        return tiffinServiceId;
    }

    @Override
	public String toString() {
		return "DeliveryBoyDto [deliveryBoyId=" + deliveryBoyId + ", name=" + name + ", email=" + email + ", phoneNo="
				+ phoneNo + ", password=" + password + ", tiffinServiceId=" + tiffinServiceId + "]";
	}

	public void setTiffinServiceId(Long tiffinServiceId) {
        this.tiffinServiceId = tiffinServiceId;
    }
}