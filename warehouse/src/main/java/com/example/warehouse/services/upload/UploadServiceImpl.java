package com.example.warehouse.services.upload;

import com.example.warehouse.model.*;
import com.example.warehouse.repository.MaterialRepository;
import com.example.warehouse.repository.RackSpaceRepository;
import com.example.warehouse.repository.SellerRepository;
import com.example.warehouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class UploadServiceImpl implements UploadService {
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private RackSpaceRepository rackSpaceRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public ResponseEntity<?> uploadMaterials(MultipartFile file, long id) {
        if (file.isEmpty()) {
            return (ResponseEntity<?>) ResponseEntity.noContent();
        }

        List<String> materials = readFile(file);
        String header = materials.remove(0);
        if (materials.stream().anyMatch(mat -> mat.split(";").length != 9)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Nof lines were not accepted");
        }
        User user = userRepository.findById(id).get();



        Seller seller = user.getSeller();

        for (String line : materials) {
            String[] mat = line.split(";");
            Material material = new Material();
            material.setNofMaterial(Long.valueOf(mat[0]));
            material.setWidth(Double.parseDouble(mat[1]));
            material.setLength(Double.parseDouble(mat[2]));
            material.setHeight(Double.parseDouble(mat[3]));
            material.setWeight(Double.parseDouble(mat[4]));
//            if(mat[5].length()>0) {
//                material.setDateOfUse(Lo);
//            }
            material.setDateOfUse(null);
            material.setPriority(Integer.parseInt(mat[6]));
            material.setSupplier(mat[7]);
            material.setSupplierCountry(mat[8]);
            material.setSeller(seller);
            materialRepository.save(material);
        }
        return ResponseEntity.ok("File was upload");
    }

    @Override
    public ResponseEntity<?> uploadRackPlace(MultipartFile file, long id) {
        if (file.isEmpty()) {
            return (ResponseEntity<?>) ResponseEntity.noContent();
        }
        List<String> rackPlaces = readFile(file);
        String header = rackPlaces.remove(0);
        if (rackPlaces.stream().anyMatch(mat -> mat.split(";").length != 7)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Nof lines were not accepted");
        }

        User user = userRepository.findById(id).get();


        Seller seller = user.getSeller();
        for (String line : rackPlaces) {
            String[] rack = line.split(";");
            RackSpace rackSpace = new RackSpace();
            rackSpace.setRackId(rack[0]);
            rackSpace.setStatus(RackSpaceStatus.Wolny);
            rackSpace.setWidth(Double.parseDouble(rack[2]));
            rackSpace.setLength(Double.parseDouble(rack[3]));
            rackSpace.setHeight(Double.parseDouble(rack[4]));
            rackSpace.setMaxWeight(Double.parseDouble(rack[5]));
            rackSpace.setPriority(Integer.parseInt(rack[6]));
            rackSpace.setSeller(seller);
            rackSpaceRepository.save(rackSpace);
        }
        return ResponseEntity.ok("File was upload");
    }


    private List<String> readFile(MultipartFile multipart) {
        BufferedReader br;
        List<String> result = new ArrayList<>();
        try {

            String line;
            InputStream is = multipart.getInputStream();
            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                result.add(line);
            }

        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
        return result;
    }
}

