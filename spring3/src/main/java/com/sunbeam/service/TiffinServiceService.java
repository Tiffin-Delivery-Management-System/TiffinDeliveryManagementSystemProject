package com.sunbeam.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sunbeam.dao.TiffinServiceDao;
import com.sunbeam.dto.TiffinDto;
import com.sunbeam.dto.TiffinServiceDto;
import com.sunbeam.entities.TiffinService;
import com.sunbeam.entities.DeliveryBoy;
import com.sunbeam.entities.Tiffin;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TiffinServiceService {

    @Autowired
    private TiffinServiceDao tiffinServiceDao;

    @Autowired
    private DeliveryBoyService deliveryboyservice;

    @Autowired
    private ModelMapper modelMapper;

    // To Add TiffinService
    public TiffinService addTiffinService(TiffinServiceDto dto) {
        TiffinService tiffinService = new TiffinService();
        tiffinService.setServiceId(dto.getServiceId());
        tiffinService.setServiceName(dto.getServiceName());
        tiffinService.setServiceAddress(dto.getServiceAddress());
        tiffinService.setServicePhoneNo(dto.getServicePhoneNo());
        tiffinService.setCreatedTime(dto.getCreatedTime());
        tiffinService.setIsDeleted(dto.getIsDeleted());
        tiffinService.setServiceImagePath(dto.getServiceImagePath());

        if (dto.getDeliveryBoy() != null) {
            // Create or retrieve the DeliveryBoy and set it
            DeliveryBoy deliveryBoy = deliveryboyservice.addOrUpdateDeliveryBoy(dto.getDeliveryBoy());
            tiffinService.setDeliveryBoy(deliveryBoy);
        } else {
            System.out.println("Warning: DeliveryBoy is null");
        }

        System.out.println("Adding TiffinService: " + tiffinService);
        return tiffinServiceDao.save(tiffinService);
    }

    // To check if tiffin service exists
    public TiffinService getTiffinServiceById(Long tiffinServiceId) {
        return tiffinServiceDao.findById(tiffinServiceId).orElse(null);
    }

    // To get all Tiffin services
    public List<TiffinServiceDto> getAllTiffinServices() {
        List<TiffinService> tiffinServices = tiffinServiceDao.findAll();
        List<TiffinServiceDto> serviceDtos = new ArrayList<>();

        for (TiffinService tiffinService : tiffinServices) {
        	if(tiffinService.getIsDeleted()!=1) {
		    	TiffinServiceDto dto = new TiffinServiceDto();
		        dto.setServiceId(tiffinService.getServiceId());
		        dto.setServicePhoneNo(tiffinService.getServicePhoneNo());
		        dto.setServiceName(tiffinService.getServiceName());
		        dto.setServiceAddress(tiffinService.getServiceAddress());
		        dto.setIsDeleted(tiffinService.getIsDeleted());
		        String base64Image = Base64.getEncoder().encodeToString(tiffinService.getServiceImagePath());
		        dto.setResponseImage("data:image/jpeg;base64," + base64Image);
		        
		        serviceDtos.add(dto);
        	}   
        }
        
        return serviceDtos;
    }

    // To update tiffin
    public TiffinServiceDto updateTiffinService(TiffinServiceDto tiffinServiceDto) {
        Optional<TiffinService> existingTiffinServiceOpt = tiffinServiceDao.findById(tiffinServiceDto.getServiceId());
        if (!existingTiffinServiceOpt.isPresent()) {
            throw new IllegalArgumentException("Tiffin Service not found");
        }

        TiffinService existingTiffinService = existingTiffinServiceOpt.get();
        modelMapper.map(tiffinServiceDto, existingTiffinService);
        TiffinService updatedTiffinService = tiffinServiceDao.save(existingTiffinService);
        return modelMapper.map(updatedTiffinService, TiffinServiceDto.class);
    }

    public void deleteTiffinService(Long serviceId) {
        Optional<TiffinService> tiffinServiceOpt = tiffinServiceDao.findById(serviceId);
        if (tiffinServiceOpt.isPresent()) {
            TiffinService tiffinService = tiffinServiceOpt.get();
            tiffinService.setIsDeleted(1);
            tiffinServiceDao.save(tiffinService);
        } else {
            throw new IllegalArgumentException("Tiffin Service not found");
        }
    }
}