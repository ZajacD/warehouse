package com.example.warehouse.services.upload;

import com.example.warehouse.model.Material;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UploadService {

    ResponseEntity<?> uploadMaterials(MultipartFile multipartFile, long id);
    ResponseEntity<?> uploadRackPlace(MultipartFile multipartFile, long id);

}
