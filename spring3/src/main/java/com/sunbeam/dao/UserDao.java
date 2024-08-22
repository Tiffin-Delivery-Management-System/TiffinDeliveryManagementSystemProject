package com.sunbeam.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.User;

public interface UserDao extends JpaRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);	
  Optional <User> findByEmail(String email);
  Optional<User> findByUserIdAndPassword(Long userId, String password);
  @Query("SELECT COUNT(u) FROM User u WHERE u.isDeleted = 0")
  Long countActiveUsers();
}
