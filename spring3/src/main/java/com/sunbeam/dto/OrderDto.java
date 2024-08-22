package com.sunbeam.dto;

import java.util.List;

public class OrderDto {

    private Long orderId;
    private UserDto user; 
    private Double totalPrice;
    private List<TiffinDto> tiffins; // Updated to List<TiffinDto>

    // Getters and Setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<TiffinDto> getTiffins() {
        return tiffins;
    }

    public void setTiffins(List<TiffinDto> tiffins) {
        this.tiffins = tiffins;
    }

	@Override
	public String toString() {
		return "OrderDto [orderId=" + orderId + ", user=" + user + ", totalPrice=" + totalPrice + ", tiffins=" + tiffins
				+ "]";
	}
    
    
}