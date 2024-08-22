package com.sunbeam.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.sunbeam.entities.DeliveryBoy;

import java.time.LocalDateTime;

public class TiffinServiceDto {

    private Long serviceId; // Optional, include if you want to handle updates

    @NotNull
    @Size(max = 50)
    private String serviceName;

    @NotNull
    @Size(max = 50)
    private String serviceAddress;

    @NotNull
    @Size(max = 50)
    private String servicePhoneNo;

    private LocalDateTime createdTime; // Optional, usually for display purposes

    private Integer isDeleted; // Optional, usually for display purposes

    @Size(max = 255)
    private byte[] serviceImagePath;
    
    private DeliveryBoy deliveryBoy;
    
    private String responseImage;

    public String getResponseImage() {
		return responseImage;
	}

	public void setResponseImage(String responseImage) {
		this.responseImage = responseImage;
	}

    public DeliveryBoy getDeliveryBoy() {
		return deliveryBoy;
	}

	public void setDeliveryBoy(DeliveryBoy deliveryBoy) {
		this.deliveryBoy = deliveryBoy;
	}

	// Getters and Setters
    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceAddress() {
        return serviceAddress;
    }

    public void setServiceAddress(String serviceAddress) {
        this.serviceAddress = serviceAddress;
    }

    public String getServicePhoneNo() {
        return servicePhoneNo;
    }

    public void setServicePhoneNo(String servicePhoneNo) {
        this.servicePhoneNo = servicePhoneNo;
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

    public byte[] getServiceImagePath() {
        return serviceImagePath;
    }

    public void setServiceImagePath(byte[] serviceImagePath) {
        this.serviceImagePath = serviceImagePath;
    }
}