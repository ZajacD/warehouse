package com.example.warehouse.services.rackSpace;

import com.example.warehouse.model.RackSpace;
import com.example.warehouse.payload.request.RackSpaceRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RackSpaceService {

    List<RackSpaceRequest> rackSpaces();

    ResponseEntity<?> addRackSpace(RackSpace rackSpace);

    RackSpaceRequest getRackSpace(long id);

    void deleteRackSpace(long id);

    void takeIt(long id);
    void freeUp(long id);


}
