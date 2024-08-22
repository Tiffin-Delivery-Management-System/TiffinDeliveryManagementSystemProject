package com.sunbeam.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.OrderDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ChangePasswordDto;
import com.sunbeam.dto.DashBoardStatsDto;
import com.sunbeam.dto.UserDto;
import com.sunbeam.entities.Role;
import com.sunbeam.entities.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserService {
@Autowired
private UserDao udao;
@Autowired
private OrderDao orderDao;
@Autowired
private ModelMapper modelMapper;

public PasswordEncoder password() {
	 return new BCryptPasswordEncoder();
}
public DashBoardStatsDto getDashboardStats() {
    Long totalUsers = udao.count();
    Long totalOrders = orderDao.countAllOrders();
    Double totalRevenue = orderDao.calculateTotalRevenue();

    return new DashBoardStatsDto(totalRevenue, totalUsers, totalOrders);
}
public List<UserDto> getAllUsers() {
    List<User> users = udao.findAll();
    List<UserDto> userDtos = new ArrayList<>();
    for (User user : users) {
    	if(user.getIsDeleted()!=1){
        UserDto userDto = modelMapper.map(user, UserDto.class);
        userDtos.add(userDto);
        }
    }
    return userDtos;
}

public UserDto getUserById(Long userId) {
    Optional<User> userOpt = udao.findById(userId);
    if (!userOpt.isPresent()) {
        throw new IllegalArgumentException("User not found");
    }
    User user = userOpt.get();
    return modelMapper.map(user, UserDto.class);
}
public UserDto login(String email, String password) {
    User user = udao.findByEmailAndPassword(email, password);
    UserDto userd = new UserDto();
    userd.setUserId(user.getUserId());
   userd.setAddress(user.getAddress());
   userd.setEmail(user.getEmail());
   userd.setName(user.getName());
   userd.setPassword(user.getPassword());
   userd.setPhoneNo(user.getPassword());
   userd.setUserImage(user.getUserImage());
//   userd.setRole(user.getRole());
    return userd;
}
//Register the user
public User register(User user) {
    // Check if the email already exists
    if (!(udao.findByEmail(user.getEmail()).isEmpty())) {
        throw new IllegalArgumentException("Email already in use");
    }
    // Save the new user
    return udao.save(user);
}
//Update Password
public String updatePassword(ChangePasswordDto changePasswordDto) {
    // Find the user by ID
    Optional<User> userOpt = udao.findById(changePasswordDto.getUserId());
    
    if (!userOpt.isPresent()) {
        throw new IllegalArgumentException("User not found");
    }

    User user = userOpt.get();

    // Verify the old password
    PasswordEncoder encoder = password();
    if (encoder.matches(changePasswordDto.getOldPassword(), user.getPassword())) {
        // Encrypt the new password and update it
        user.setPassword(encoder.encode(changePasswordDto.getNewPassword()));
        udao.save(user);
        return "Password updated successfully";
    } else {
        throw new IllegalArgumentException("Invalid old password");
    }
}

//Update the user
public UserDto updateUser(UserDto userDto) {
	System.out.println("in user service");
    Optional<User> existingUserOpt = udao.findById(userDto.getUserId());
    if (!existingUserOpt.isPresent()) {
        throw new IllegalArgumentException("User not found");
    }
     
    User existingUser = existingUserOpt.get();
    // Convert UserDto to User
    if(existingUser.getRole().toString()=="ADMIN") {
    	existingUser.setName(userDto.getName());
        existingUser.setPhoneNo(userDto.getPhoneNo());
        existingUser.setEmail(userDto.getEmail());
    }else {
    existingUser.setName(userDto.getName());
    existingUser.setPhoneNo(userDto.getPhoneNo());
    existingUser.setAddress(userDto.getAddress());
    }
    User updatedUser = udao.save(existingUser);

    return modelMapper.map(updatedUser, UserDto.class);
}
//Delete user
public void deleteUser(Long userId) {
    Optional<User> userOpt = udao.findById(userId);
    if (!userOpt.isPresent()) {
        throw new IllegalArgumentException("User not found");
    }

    User user = userOpt.get();
    user.setIsDeleted(1);
    udao.save(user);
}

}