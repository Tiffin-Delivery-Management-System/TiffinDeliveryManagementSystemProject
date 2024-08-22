package com.sunbeam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.ChangePasswordDto;
import com.sunbeam.dto.DashBoardStatsDto;
import com.sunbeam.dto.DeliveryBoyDto;
import com.sunbeam.dto.OrderDto;
import com.sunbeam.dto.TiffinDto;
import com.sunbeam.dto.TiffinServiceDto;
import com.sunbeam.dto.UserDto;
import com.sunbeam.entities.DeliveryBoy;
import com.sunbeam.entities.Tiffin;
import com.sunbeam.entities.TiffinService;
import com.sunbeam.service.DeliveryBoyService;
import com.sunbeam.service.OrderService;
import com.sunbeam.service.TiffinService1;
import com.sunbeam.service.TiffinServiceService;
import com.sunbeam.service.UserService;


@RestController
@RequestMapping("/admin")
public class AdminController {
	 @Autowired
	    private TiffinServiceService tiffinServiceService;
	 @Autowired
	    private TiffinService1 tiffinService;
	 @Autowired
	    private DeliveryBoyService deliveryBoyService;
	 @Autowired
	    private OrderService orderService;
	 @Autowired
	    private UserService userService;
	 //dashboard stats
	 @GetMapping("/dashboard-stats")
	 @CrossOrigin(origins = "http://localhost:3000")
	    public DashBoardStatsDto getDashboardStats() {
	        return userService.getDashboardStats();
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
	 //update admin
	 @CrossOrigin(origins = "http://localhost:3000")
	 @PutMapping("/update")
	 public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
	     try {   
	    	 System.out.println("in admin controller");
	    	 System.out.println(userDto);
	         return ResponseEntity.ok(userService.updateUser(userDto));
	     } catch (Exception e) {
	         return ResponseEntity.status(500).build(); // Internal server error
	     }
	 }
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
	 //Get all users
	 @CrossOrigin(origins = "http://localhost:3000")
	 @GetMapping("/users")
	    public ResponseEntity<List<UserDto>> getAllUsers() {
	        List<UserDto> users = userService.getAllUsers();
	        return ResponseEntity.ok(users);
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

	 //Add tiffin service
	 @CrossOrigin(origins = "http://localhost:3000")
	    @PostMapping("/tiffinservice")
	    public ResponseEntity<TiffinService> addTiffinService(@RequestBody TiffinServiceDto dto) {
	    	
	    	try {
	            TiffinService newTiffinService = tiffinServiceService.addTiffinService(dto);
	            return new ResponseEntity<>(newTiffinService, HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 @CrossOrigin(origins = "http://localhost:3000")
	    @GetMapping("/user/{userId}/orders")
	    public List<OrderDto> getOrdersByUserId(@PathVariable Long userId) {
	        return orderService.getOrdersByUserId(userId);
	    }

	    //Add tiffin
	 @CrossOrigin(origins = "http://localhost:3000")
	    @PostMapping("/tiffin")
	    public ResponseEntity<Tiffin> addTiffin(@RequestBody TiffinDto tiffinDto) {
	        try {
	            // Convert TiffinDto to Tiffin entity
	            Tiffin tiffinEntity = dtoToEntity(tiffinDto);

	            // Retrieve TiffinService by ID and set it
	            TiffinService tiffinServiceEntity = tiffinServiceService.getTiffinServiceById(tiffinDto.getTiffinServiceId());
	            if (tiffinServiceEntity == null) {
	                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	            }
	            tiffinEntity.setTiffinService(tiffinServiceEntity);

	            Tiffin newTiffin = tiffinService.addTiffin(tiffinEntity);
	            return new ResponseEntity<>(newTiffin, HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	//Add delivery boy
	    @CrossOrigin(origins = "http://localhost:3000")
	    @PostMapping("/deliveryboy")
	    public ResponseEntity<DeliveryBoy> addDeliveryBoy(@RequestBody DeliveryBoyDto deliveryBoyDto) {
	        System.out.println("Received DeliveryBoyDto: " + deliveryBoyDto);

	        try {
	            DeliveryBoy deliveryBoyEntity = dtoToEntity(deliveryBoyDto);


	            DeliveryBoy newDeliveryBoy = deliveryBoyService.addDeliveryBoy(deliveryBoyEntity);
	            System.out.println("Added DeliveryBoy: " + newDeliveryBoy);
	            return new ResponseEntity<>(newDeliveryBoy, HttpStatus.CREATED);
	        } catch (Exception e) {
	            e.printStackTrace(); // Log the stack trace for debugging
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 @CrossOrigin(origins = "http://localhost:3000")
	    @PutMapping("/tiffinservice")
	    public ResponseEntity<TiffinServiceDto> updateTiffinService(@RequestBody TiffinServiceDto tiffinServiceDto) {
	        try {
	            TiffinServiceDto updatedTiffinServiceDto = tiffinServiceService.updateTiffinService(tiffinServiceDto);
	            return ResponseEntity.ok(updatedTiffinServiceDto);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(404).body(null);
	        }
	    }
	    //Update tiffin
	 @CrossOrigin(origins = "http://localhost:3000")
	    @PutMapping("/tiffin")
	    public ResponseEntity<TiffinDto> updateTiffin(@RequestBody TiffinDto tiffinDto) {
	        try {
	            TiffinDto updatedTiffinDto = tiffinService.updateTiffin(tiffinDto);
	            return ResponseEntity.ok(updatedTiffinDto);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(404).body(null);
	        }
	    }

	    //Delete tiffin
	 @CrossOrigin(origins = "http://localhost:3000")
	    @DeleteMapping("/tiffin/{tiffinId}")
	    public ResponseEntity<Void> deleteTiffin(@PathVariable Long tiffinId) {
	        try {
	            tiffinService.deleteTiffin(tiffinId);
	            return ResponseEntity.ok().build();
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(404).build();
	        }
	    }
	    //Delete Tiffin service
	 @CrossOrigin(origins = "http://localhost:3000")
	    @DeleteMapping("/tiffin-service/{serviceId}")
	    public ResponseEntity<Void> deleteTiffinService(@PathVariable Long serviceId) {
	        try {
	            tiffinServiceService.deleteTiffinService(serviceId);
	            return ResponseEntity.ok().build();
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(404).build();
	        }
	    }
	    //Delete user
	 @CrossOrigin(origins = "http://localhost:3000")
	    @DeleteMapping("/user/{userId}")
	    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
	        try {
	            userService.deleteUser(userId);
	            return ResponseEntity.ok("User marked as deleted successfully");
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(404).body("User not found");
	        }
	    }
	    
	 private DeliveryBoy dtoToEntity(DeliveryBoyDto dto) {
	    	
	        DeliveryBoy deliveryBoy = new DeliveryBoy();
	        deliveryBoy.setDeliveryBoyId(dto.getDeliveryBoyId());
	        deliveryBoy.setName(dto.getName());
	        deliveryBoy.setEmail(dto.getEmail());
	        deliveryBoy.setPhoneNo(dto.getPhoneNo());
	        deliveryBoy.setPassword(password().encode(dto.getPassword()));
	        System.out.println("dtoentity-DB"+deliveryBoy);
	        return deliveryBoy;
	    }

	    private Tiffin dtoToEntity(TiffinDto dto){
	        Tiffin tiffin = new Tiffin();
	        tiffin.setTiffinId(dto.getTiffinId());
	        tiffin.setName(dto.getName());
	        tiffin.setPrice(dto.getPrice());
	        tiffin.setDescription(dto.getDescription());
	        tiffin.setTiffinImagePath(dto.getTiffinImagePath());
	        tiffin.setIsDeleted(dto.getIsDeleted());
	        return tiffin;
	    }
	    
	    public PasswordEncoder password() {
	    	return new BCryptPasswordEncoder();
	    }
	    
}
