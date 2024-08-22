package com.sunbeam.dto;

import javax.validation.constraints.*;
import java.util.Optional;

public class TiffinDto {

    private Long tiffinId;

    @NotNull
    @Size(max = 50)
    private String name;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private Double price;

    @Size(max = 1000)
    private String description;

    @Size(max = 255)
    private byte[] tiffinImagePath;

    @NotNull
    private Integer isDeleted;

    @NotNull
    private Long tiffinServiceId; // Added tiffinServiceId field
    
    private String responseImage;

    public String getResponseImage() {
		return responseImage;
	}

	public void setResponseImage(String responseImage) {
		this.responseImage = responseImage;
	}

	// Getters and Setters
    public Long getTiffinId() {
        return tiffinId;
    }

    public void setTiffinId(Long tiffinId) {
        this.tiffinId = tiffinId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getTiffinImagePath() {
        return tiffinImagePath;
    }

    public void setTiffinImagePath(byte[] tiffinImagePath) {
        this.tiffinImagePath = tiffinImagePath;
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Long getTiffinServiceId() {
        return tiffinServiceId;
    }

    public void setTiffinServiceId(Long tiffinServiceId) {
        this.tiffinServiceId = tiffinServiceId;
    }
}
