package com.sunbeam.entities;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tiffin_services", uniqueConstraints = {
    @UniqueConstraint(columnNames = "servicePhoneNo")
})
public class TiffinService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @Column(length = 50, nullable = false)
    @NotNull
    @Size(max = 50)
    private String serviceName;

    @Column(length = 50, nullable = false)
    @NotNull
    @Size(max = 50)
    private String serviceAddress;

    @Column(length = 50, nullable = false, unique = true)
    @NotNull
    @Size(max = 50)
    private String servicePhoneNo;

    @Column(nullable = false, updatable = false)
    @org.hibernate.annotations.CreationTimestamp
    private LocalDateTime createdTime;

    @Column(nullable = false)
    private Integer isDeleted = 0;

    @OneToMany(mappedBy = "tiffinService",fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tiffin> tiffins;
    
    @Lob
    @Column(name = "service_image_path")
    private byte[] serviceImagePath;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_boy_id")
    private DeliveryBoy deliveryBoy;

    // Default constructor
    public TiffinService() {}

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

    public List<Tiffin> getTiffins() {
        return tiffins;
    }

    @Override
	public String toString() {
		return "TiffinService [serviceId=" + serviceId + ", serviceName=" + serviceName + ", serviceAddress="
				+ serviceAddress + ", servicePhoneNo=" + servicePhoneNo + ", createdTime=" + createdTime
				+ ", isDeleted=" + isDeleted + ", tiffins=" + tiffins + ", serviceImagePath=" + serviceImagePath
				+ ", deliveryBoy=" + deliveryBoy + "]";
	}

	public void setTiffins(List<Tiffin> tiffins) {
        this.tiffins = tiffins;
    }

    public byte[] getServiceImagePath() {
        return serviceImagePath;
    }

    public void setServiceImagePath(byte[] serviceImagePath) {
        this.serviceImagePath = serviceImagePath;
    }

    public DeliveryBoy getDeliveryBoy() {
        return deliveryBoy;
    }

    public void setDeliveryBoy(DeliveryBoy deliveryBoy) {
        this.deliveryBoy = deliveryBoy;
    }

	
}