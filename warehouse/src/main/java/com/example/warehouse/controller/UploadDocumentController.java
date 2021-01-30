package com.example.warehouse.controller;

import com.example.warehouse.services.upload.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class UploadDocumentController {

    @Autowired
    private UploadService uploadService;

    @PostMapping(value = "/api/uploadMaterial/{id}")
    public ResponseEntity<?> uploadMaterial(@RequestParam("file") MultipartFile file, @PathVariable long id,
                                            HttpServletResponse response) {
        return uploadService.uploadMaterials(file,id);
    }

    @PostMapping(value = "/api/uploadRackSpace/{id}")
    public ResponseEntity<?> uploadRackSpace(@RequestParam("file") MultipartFile file, @PathVariable long id,
                                             HttpServletResponse response) {
        return uploadService.uploadRackPlace(file,id);
    }
}

