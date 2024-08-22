package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Tiffin;

public interface TiffinDao extends JpaRepository<Tiffin, Long> {
	 List<Tiffin> findByTiffinService_ServiceId(Long serviceId);
	 List<Tiffin> findByTiffinServiceServiceIdOrderByPrice(Long serviceId);
}
