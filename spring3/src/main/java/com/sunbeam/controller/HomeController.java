package com.sunbeam.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.OrderDto;
import com.sunbeam.dto.TiffinDto;
import com.sunbeam.dto.TiffinServiceDto;
import com.sunbeam.dto.UserDto;
import com.sunbeam.entities.TiffinService;
import com.sunbeam.service.*;

@RestController
@RequestMapping("/home")
public class HomeController {
@Autowired
private TiffinServiceService tiffinServiceService;
@Autowired
private TiffinService1 tiffinService1;
@Autowired
private OrderService orderService;
@Autowired
private UserService userService;
@CrossOrigin(origins = "http://localhost:3000") 
@GetMapping
//To get all TiffinServices
public ResponseEntity<List<TiffinServiceDto>> getAllTiffinServices() {
    try {
        return ResponseEntity.ok(tiffinServiceService.getAllTiffinServices());
    } catch (Exception e) {
        e.printStackTrace(); // Add proper logging
        return ResponseEntity.status(500).build();
    }
}
@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/user/{userId}")
public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
    try {
        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(404).body(null);
    }
}
@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/tiffins/{serviceId}")
//To get Tiffins by tiffin service id
public ResponseEntity<List<TiffinDto>> getTiffinsByServiceId(@PathVariable Long serviceId) {
    try {
        List<TiffinDto> tiffinDtos = tiffinService1.findTiffinsByServiceId(serviceId);
        return ResponseEntity.ok(tiffinDtos);
    } catch (Exception e) {
        return ResponseEntity.status(500).build();
    }
}
@CrossOrigin(origins = "http://localhost:3000")
@PostMapping("/addOrder")
public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto orderDto) {
	System.out.println(orderDto);
    OrderDto savedOrder = orderService.addOrder(orderDto);
    return ResponseEntity.ok(savedOrder);
}

}
