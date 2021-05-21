package com.example.warehouse.controller;


import com.example.warehouse.model.RackSpace;
import com.example.warehouse.payload.request.RackSpaceRequest;
import com.example.warehouse.services.rackSpace.RackSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "/api/rackSpace")
    public ResponseEntity<?> addRackSpace(@RequestBody RackSpace rackSpace) {
        return rackSpaceService.addRackSpace(rackSpace);
    }

    @GetMapping(value = "/api/rackSpace/{id}")
    public RackSpaceRequest getRackSpaceRequests(@PathVariable long id) {
        return rackSpaceService.getRackSpace(id);

    }

    @DeleteMapping(value = "/api/rackSpace/{id}")
    public void deleteRackSpaceRequests(@PathVariable long id) {
        rackSpaceService.deleteRackSpace(id);

    }

    @PutMapping(value = "/api/rackSpace/take/{id}")
    public void takeIt(@PathVariable long id, @RequestBody RackSpace rackSpace) {
        rackSpaceService.takeIt(id);

    }
    @PutMapping(value = "/api/rackSpace/free/{id}")
    public void freeUp(@PathVariable long id, @RequestBody RackSpace rackSpace) {
        rackSpaceService.freeUp(id);
    }


}
