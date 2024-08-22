package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.Order;

public interface OrderDao extends JpaRepository<Order, Long> {
	List<Order> findByUserUserId(Long id);
	@Query("SELECT COUNT(o) FROM Order o")
    long countAllOrders();
	@Query("SELECT SUM(o.totalPrice) FROM Order o")
	Double calculateTotalRevenue();
}
