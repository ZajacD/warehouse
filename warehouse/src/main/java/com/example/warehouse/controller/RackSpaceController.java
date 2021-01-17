package com.example.warehouse.controller;


import com.example.warehouse.payload.request.MaterialRequest;
import com.example.warehouse.payload.request.RackSpaceRequest;
import com.example.warehouse.services.material.MaterialService;
import com.example.warehouse.services.rackSpace.RackSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class RackSpaceController {

    @Autowired
    private RackSpaceService rackSpaceService;

    @GetMapping(value = "/api/rackSpaces")
    public List<RackSpaceRequest> rackSpaceRequests() {
        return rackSpaceService.rackSpaces();
    }
}
