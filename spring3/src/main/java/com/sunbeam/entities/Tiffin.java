package com.sunbeam.entities;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "tiffins")
public class Tiffin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tiffinId;

    @Column(nullable = false)
    @NotNull
    private Double price;

    @Column(length = 50, nullable = false)
    @NotNull
    @Size(max = 50)
    private String name;

    @Column(length = 1000, nullable = true)
    @Size(max = 1000)
    private String description;

    @Column(nullable = false)
    private Integer isDeleted = 0;

    @ManyToOne
    @JoinColumn(name = "tiffin_service_id", nullable = false)
    private TiffinService tiffinService;

    @Lob
    @Column(name = "tiffin_image_path", nullable = true)
    private byte[] tiffinImagePath; // Store image as byte array

    // Getters and Setters
    public Long getTiffinId() {
        return tiffinId;
    }

    public void setTiffinId(Long tiffinId) {
        this.tiffinId = tiffinId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }

    public TiffinService getTiffinService() {
        return tiffinService;
    }

    public void setTiffinService(TiffinService tiffinService) {
        this.tiffinService = tiffinService;
    }

    public byte[] getTiffinImagePath() {
        return tiffinImagePath;
    }

    public void setTiffinImagePath(byte[] tiffinImagePath) {
        this.tiffinImagePath = tiffinImagePath;
    }
}