package com.sunbeam.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.DeliveryBoyDao;
import com.sunbeam.dto.DeliveryBoyDto;
import com.sunbeam.entities.DeliveryBoy;

import javax.transaction.Transactional;

@Service
@Transactional
public class DeliveryBoyService {
@Autowired
private DeliveryBoyDao deliveryBoyDao;

public DeliveryBoy addDeliveryBoy(DeliveryBoy deliveryBoyEntity) {
	// TODO Auto-generated method stub
	return deliveryBoyDao.save(deliveryBoyEntity);
}

public DeliveryBoy addOrUpdateDeliveryBoy(DeliveryBoy deliveryBoy2) {
    DeliveryBoy deliveryBoy = new DeliveryBoy();
    deliveryBoy.setDeliveryBoyId(deliveryBoy2.getDeliveryBoyId()); // Ensure you handle ID correctly
    deliveryBoy.setName(deliveryBoy2.getName());
    deliveryBoy.setEmail(deliveryBoy2.getEmail());
    deliveryBoy.setPhoneNo(deliveryBoy2.getPhoneNo());
    deliveryBoy.setPassword(deliveryBoy2.getPassword());

    return deliveryBoyDao.save(deliveryBoy);
}
}