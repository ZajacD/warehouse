package com.example.warehouse.controller;


import com.example.warehouse.model.Material;
import com.example.warehouse.payload.request.MaterialRequest;
import com.example.warehouse.services.material.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "/api/material")
    public ResponseEntity<?> addRackSpace(@RequestBody Material material) {
        return materialService.addMaterial(material);
    }

    @GetMapping(value = "/api/material/{id}")
    public MaterialRequest getMaterialRequests(@PathVariable long id) {
        return materialService.getMaterial(id);
    }

    @DeleteMapping(value = "/api/material/{id}")
    public void deleteMaterialRequests(@PathVariable long id) {
        materialService.deleteMaterial(id);
    }

    @PutMapping(value = "/api/supply")
    public ResponseEntity<?> supply(@RequestBody Material material) {
        return materialService.supply(material);
    }
}
