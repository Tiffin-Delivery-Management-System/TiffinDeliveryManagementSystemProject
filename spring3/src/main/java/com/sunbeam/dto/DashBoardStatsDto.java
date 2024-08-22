package com.sunbeam.dto;

public class DashBoardStatsDto {
    
    private Double totalRevenue;
    private Long totalUsers;
    private Long totalOrders;

    // Default constructor
    public DashBoardStatsDto() {}

    // Parameterized constructor
    public DashBoardStatsDto(Double totalRevenue, Long totalUsers, Long totalOrders) {
        this.totalRevenue = totalRevenue;
        this.totalUsers = totalUsers;
        this.totalOrders = totalOrders;
    }

    // Getters and Setters
    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    @Override
    public String toString() {
        return "DashboardStatsDto{" +
                "totalRevenue=" + totalRevenue +
                ", totalUsers=" + totalUsers +
                ", totalOrders=" + totalOrders +
                '}';
    }
}

