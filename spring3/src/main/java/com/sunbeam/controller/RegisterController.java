package com.sunbeam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.UserDto;
import com.sunbeam.entities.User;
import com.sunbeam.service.UserService;

@RestController
@RequestMapping("/register")
public class RegisterController {
	@Autowired
	private UserService userService;
//	@Autowired
//	private PasswordEncoder password;
	@CrossOrigin(origins = "http://localhost:3000")
	 @PostMapping
	    public ResponseEntity<User> register(@RequestBody UserDto userDto) {
	        try {
	            // Convert UserDto to User entity
	            User user = new User();
	            user.setName(userDto.getName());
	            user.setEmail(userDto.getEmail());
	            user.setPassword(password().encode(userDto.getPassword())); // Directly set the password with encoding
	            user.setPhoneNo(userDto.getPhoneNo());
	            user.setAddress(userDto.getAddress());
	            user.setUserImage(userDto.getUserImage());

	            // Save user using the service
	            User newUser = userService.register(user);
	            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
	        } catch (IllegalArgumentException e) {
	        	
	            return new ResponseEntity<>(HttpStatus.CONFLICT); // Email already in use
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // General error
	        }
	    }
//	 @Bean
	 public PasswordEncoder password() {
		 return new BCryptPasswordEncoder();
	 }
}