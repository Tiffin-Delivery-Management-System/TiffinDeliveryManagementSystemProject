package com.sunbeam.service;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.sunbeam.dao.OrderDao;
import com.sunbeam.dao.TiffinDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.OrderDto;
import com.sunbeam.dto.TiffinDto;
import com.sunbeam.dto.UserDto;
import com.sunbeam.entities.Order;
import com.sunbeam.entities.Tiffin;
import com.sunbeam.entities.User;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderService {
@Autowired
private OrderDao orderDao;
@Autowired
private ModelMapper modelMapper;
@Autowired
private UserDao userDao;
@Autowired
private TiffinDao tiffinDao;
public List<OrderDto> getOrdersByUserId(Long userId) {
    List<Order> orders = orderDao.findByUserUserId(userId);
    List<OrderDto> orderDtos = new ArrayList<>();
    for (Order order : orders) {
        OrderDto orderDto = modelMapper.map(order, OrderDto.class);
        orderDtos.add(orderDto);
    }
    return orderDtos;
}
public OrderDto addOrder(OrderDto orderDto) {
    // Fetch the User entity from the database
    User user = userDao.findById(orderDto.getUser().getUserId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    // Convert TiffinDto to Tiffin entities
    List<Tiffin> tiffins = new ArrayList<>();
    for (TiffinDto tiffinDto : orderDto.getTiffins()) {
        Tiffin tiffin = tiffinDao.findById(tiffinDto.getTiffinId())
                .orElseThrow(() -> new IllegalArgumentException("Tiffin not found"));
        tiffins.add(tiffin);
    }

    // Convert OrderDto to Order entity
    Order order = modelMapper.map(orderDto, Order.class);

    // Set the User entity in the Order
    order.setUser(user);

    // Set the list of Tiffin entities in the Order
    order.setTiffins(tiffins);

    // Save the Order entity
    Order savedOrder = orderDao.save(order);

    // Convert the saved Order entity to OrderDto
    OrderDto savedOrderDto = modelMapper.map(savedOrder, OrderDto.class);

    // Set UserDto and List<TiffinDto> in savedOrderDto
    savedOrderDto.setUser(modelMapper.map(savedOrder.getUser(), UserDto.class));
    List<TiffinDto> tiffinDtos = new ArrayList<>();
    for (Tiffin tiffin : savedOrder.getTiffins()) {
        tiffinDtos.add(modelMapper.map(tiffin, TiffinDto.class));
    }
    savedOrderDto.setTiffins(tiffinDtos);

    return savedOrderDto;
}
}
