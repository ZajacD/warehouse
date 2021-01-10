package com.example.warehouse.controller;

import com.example.warehouse.services.upload.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class UploadDocumentController {

    @Autowired
    private UploadService uploadService;

    @PostMapping(value = "/api/uploadMaterial")
    public ResponseEntity<?> uploadMaterial(@RequestParam("file") MultipartFile file,
                                           HttpServletResponse response) {
        return uploadService.uploadMaterials(file);
    }
    @PostMapping(value = "/api/uploadRackSpace")
    public ResponseEntity<?> uploadRackSpace(@RequestParam("file") MultipartFile file,
                                              HttpServletResponse response) {
        return uploadService.uploadRackPlace(file);
    }
}

