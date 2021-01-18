package com.example.warehouse.services.material;

import com.example.warehouse.model.Material;
import com.example.warehouse.payload.request.MaterialRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MaterialService {

    List<MaterialRequest> materials();

    ResponseEntity<?> addMaterial(Material material);

    MaterialRequest getMaterial(long id);

    void deleteMaterial(long id);
}
