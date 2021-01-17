package com.example.warehouse.controller;


import com.example.warehouse.model.Material;
import com.example.warehouse.payload.request.MaterialRequest;
import com.example.warehouse.services.material.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping(value = "/api/materials")
    public List<MaterialRequest> materials() {
        return materialService.materials();
    }
}
