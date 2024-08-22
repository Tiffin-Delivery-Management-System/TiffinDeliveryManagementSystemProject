package com.sunbeam.service;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.TiffinDao;
import com.sunbeam.dto.TiffinDto;
import com.sunbeam.entities.Tiffin;
import com.sunbeam.entities.TiffinService;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
@Transactional
public class TiffinService1{
@Autowired
private TiffinDao tiffinDao;
@Autowired
private ModelMapper modelMapper;

//To add a tiffin
public Tiffin addTiffin(Tiffin tiffin) {
    return tiffinDao.save(tiffin);
}
//To get Tiffin by specific Tiffin service id
public List<TiffinDto> findTiffinsByServiceId(Long serviceId) {
    List<Tiffin> tiffins = tiffinDao.findByTiffinService_ServiceId(serviceId);
    List<TiffinDto> tiffinDtos = new ArrayList<>();

    for (Tiffin tiffin : tiffins) {
    	if(tiffin.getIsDeleted()!=1) {
        TiffinDto dto = new TiffinDto();
        dto.setTiffinId(tiffin.getTiffinId());
        dto.setPrice(tiffin.getPrice());
        dto.setName(tiffin.getName());
        dto.setDescription(tiffin.getDescription());
        dto.setIsDeleted(tiffin.getIsDeleted());
        dto.setResponseImage(Base64.getEncoder().encodeToString(tiffin.getTiffinImagePath()));
        tiffinDtos.add(dto);
    	}
    }

    return tiffinDtos;
}
public TiffinDto updateTiffin(TiffinDto tiffinDto) {
    Optional<Tiffin> existingTiffinOpt = tiffinDao.findById(tiffinDto.getTiffinId());
    if (!existingTiffinOpt.isPresent()) {
        throw new IllegalArgumentException("Tiffin not found");
    }

    Tiffin existingTiffin = existingTiffinOpt.get();
    // Convert TiffinDto to Tiffin
    existingTiffin.setPrice(tiffinDto.getPrice());
    existingTiffin.setName(tiffinDto.getName());
    existingTiffin.setDescription(tiffinDto.getDescription());
    existingTiffin.setTiffinImagePath(tiffinDto.getTiffinImagePath());

    Tiffin updatedTiffin = tiffinDao.save(existingTiffin);

    // Convert updated Tiffin to TiffinDto
    return modelMapper.map(updatedTiffin, TiffinDto.class);
}
public void deleteTiffin(Long tiffinId) {
    Optional<Tiffin> tiffinOpt = tiffinDao.findById(tiffinId);
    if (tiffinOpt.isPresent()) {
        Tiffin tiffin = tiffinOpt.get();
        tiffin.setIsDeleted(1);  // Set the isDeleted field to 1
        tiffinDao.save(tiffin);  // Save the updated entity
    } else {
        throw new IllegalArgumentException("Tiffin not found");
    }
}

@Autowired
private TiffinServiceService tiffinServiceService;

public void saveTiffin(String name, double price, String description, byte[] tiffinImageBytes, Long tiffinServiceId) {
	// TODO Auto-generated method stub
	TiffinService tiffinService = tiffinServiceService.getTiffinServiceById(tiffinServiceId);
	if (tiffinService!=null) {
        

        Tiffin newTiffin = new Tiffin();
        newTiffin.setName(name);
        newTiffin.setPrice(price);
        newTiffin.setDescription(description);
        newTiffin.setTiffinImagePath(tiffinImageBytes); // Save image as byte array
        newTiffin.setTiffinService(tiffinService);

        tiffinDao.save(newTiffin);
    } else {
        throw new IllegalArgumentException("Tiffin service not found with ID: " + tiffinServiceId);
    }
	
}
}
