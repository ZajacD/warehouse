package com.example.warehouse.services.rackSpace;

import com.example.warehouse.payload.request.MaterialRequest;
import com.example.warehouse.payload.request.RackSpaceRequest;

import java.util.List;

public interface RackSpaceService {

    List<RackSpaceRequest> rackSpaces();
}
