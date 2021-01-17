package com.example.warehouse.services.material;

import com.example.warehouse.model.Material;
import com.example.warehouse.payload.request.MaterialRequest;

import java.util.List;

public interface MaterialService {

    List<MaterialRequest> materials();
}
