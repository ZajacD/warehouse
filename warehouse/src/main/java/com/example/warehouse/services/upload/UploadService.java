package com.example.warehouse.services.upload;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UploadService {

    ResponseEntity<?> uploadMaterials(MultipartFile multipartFile);
    ResponseEntity<?> uploadRackPlace(MultipartFile multipartFile);

}
