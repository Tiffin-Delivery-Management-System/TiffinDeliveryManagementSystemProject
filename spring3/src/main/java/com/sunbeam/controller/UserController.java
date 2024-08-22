package com.sunbeam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.ChangePasswordDto;
import com.sunbeam.dto.OrderDto;
import com.sunbeam.dto.UserDto;
import com.sunbeam.service.OrderService;
import com.sunbeam.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
@Autowired
private UserService userService;
@Autowired
private OrderService orderService;

@CrossOrigin(origins = "http://localhost:3000")
@PutMapping("/update")
public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
    try {   
        return ResponseEntity.ok(userService.updateUser(userDto));
    } catch (Exception e) {
        return ResponseEntity.status(500).build(); // Internal server error
    }
}

@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/orders/{userId}")
public List<OrderDto> getOrdersByUserId(@PathVariable Long userId) {
    return orderService.getOrdersByUserId(userId);
}

//Change password
	 @CrossOrigin(origins = "http://localhost:3000")
	 @PutMapping("/update-password")
	    public ResponseEntity<String> updatePassword(@RequestBody ChangePasswordDto changePasswordDto) {
	        try {
	        	
	            String response = userService.updatePassword(changePasswordDto);
	            return ResponseEntity.ok(response);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(400).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(500).body("An unexpected error occurred");
	        }
	    }
}
