package com.sunbeam.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(nullable = false, updatable = false)
    @org.hibernate.annotations.CreationTimestamp
    private LocalDateTime orderTime;

    @Column(nullable = false)
    private Double totalPrice;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")  // This specifies the foreign key in the Tiffin table
    private List<Tiffin> tiffins;

    // Default constructor
    public Order() {}

    // Parameterized constructor
    public Order(Long orderId, User user, LocalDateTime orderTime, Double totalPrice, List<Tiffin> tiffins) {
        this.orderId = orderId;
        this.user = user;
        this.orderTime = orderTime;
        this.totalPrice = totalPrice;
        this.tiffins = tiffins;
    }

    // Getters and Setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<Tiffin> getTiffins() {
        return tiffins;
    }

    public void setTiffins(List<Tiffin> tiffins) {
        this.tiffins = tiffins;
    }
}

