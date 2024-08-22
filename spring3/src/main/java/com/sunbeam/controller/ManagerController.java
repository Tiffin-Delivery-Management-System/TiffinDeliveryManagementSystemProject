package com.sunbeam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.service.TiffinService1;

import java.io.IOException;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private TiffinService1 tiffinService1;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addtiffin")
    public ResponseEntity<String> addTiffin(
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam("tiffinServiceId") Long tiffinServiceId) {

        try {
            byte[] imageBytes = image.getBytes();

            tiffinService1.saveTiffin(name, price, description, imageBytes, tiffinServiceId);

            return ResponseEntity.ok("Tiffin added successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add tiffin.");
        }
    }
}