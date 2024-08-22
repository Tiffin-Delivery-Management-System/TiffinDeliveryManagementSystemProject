package com.sunbeam.entities;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_boys")
public class DeliveryBoy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryBoyId;

    @Column(length = 50, nullable = false)
    @NotNull
    @Size(max = 50)
    private String name;

    @Column(length = 100, nullable = false, unique = true)
    @NotNull
    @Size(max = 100)
    @Email
    private String email;

    @Column(length = 15, nullable = true, unique = true)
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phoneNo;
    
    @Column(length = 200, nullable = false)
    @NotNull
    @Size(max = 255)
    private String password;

    public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(nullable = false, updatable = false)
    @org.hibernate.annotations.CreationTimestamp
    private LocalDateTime createdTime;

    @Column(nullable = false)
    private Integer isDeleted = 0;

 

    // Default constructor
    public DeliveryBoy() {}

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

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }

    @Override
	public String toString() {
		return "DeliveryBoy [deliveryBoyId=" + deliveryBoyId + ", name=" + name + ", email=" + email + ", phoneNo="
				+ phoneNo + ", password=" + password + ", createdTime=" + createdTime + ", isDeleted=" + isDeleted
				+ "]";
	}

}