package com.example.warehouse.services.material;

import com.example.warehouse.model.*;
import com.example.warehouse.payload.request.MaterialRequest;
import com.example.warehouse.repository.MaterialRepository;
import com.example.warehouse.repository.RackSpaceRepository;
import com.example.warehouse.repository.UserRepository;
import io.jsonwebtoken.lang.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private RackSpaceRepository rackSpaceRepository;

    @Override
    public List<MaterialRequest> materials() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        User user = userRepository.findByLogin(name).get();
        System.out.println(user.getEmail());
        System.out.println(user.getSeller().getEmail());
        Seller seller = user.getSeller();
        List<Material> materials = materialRepository.findBySeller(seller);
        return materials.stream().map(MaterialRequest::new).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addMaterial(Material material) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        User user = userRepository.findByLogin(name).get();
        Seller seller = user.getSeller();
        material.setSeller(seller);
        material.setStatus("wolne");
        materialRepository.save(material);
        return ResponseEntity.ok("RackSpace was save");
    }

    @Override
    public MaterialRequest getMaterial(long id) {
        return new MaterialRequest(materialRepository.findById(id));

    }

    @Override
    public void deleteMaterial(long id) {
        materialRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> supply(Material material) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        User user = userRepository.findByLogin(name).get();
        Seller seller = user.getSeller();
        material = materialRepository.findFirstByNofMaterial(material.getNofMaterial()).orElseThrow(() -> new RuntimeException("Error: NofMaterial is not found."));
        int priorityLimit = rackSpaceRepository.findFirstBySellerOrderByPriorityDesc(seller).getPriority();
        final Material deliveredMaterial = material;
        int priority = material.getPriority();
        boolean isSaved = false;
        boolean limitExceeded = false;
        System.out.println(priorityLimit + "limit");
        do {
            System.out.println(priority + "pr");
            List<RackSpace> rackSpaces = rackSpaceRepository.findBySellerAndPriorityAndStatus(seller, priority, RackSpaceStatus.Wolny);
            if (!Collections.isEmpty(rackSpaces)) {
                rackSpaces = rackSpaces.stream().filter(rackSpace -> rackSpace.getHeight() >= deliveredMaterial.getHeight())
                        .filter(rackSpace -> rackSpace.getLength() >= deliveredMaterial.getLength())
                        .filter(rackSpace -> rackSpace.getMaxWeight() >= deliveredMaterial.getWeight())
                        .filter(rackSpace -> rackSpace.getWidth() >= deliveredMaterial.getWidth())
                        .collect(Collectors.toList());
                if (!Collections.isEmpty(rackSpaces)) {
                    RackSpace rackSpace = rackSpaces.get(0);
                    rackSpace.setStatus(RackSpaceStatus.Zarezerwowany);
                    rackSpaceRepository.save(rackSpace);
                    material.setRackSpace(rackSpace);
                    materialRepository.save(material);
                    isSaved = true;
                }
            }
            if (priority >= priorityLimit) {
                limitExceeded = true;
            }
            priority++;
        } while (!limitExceeded && !isSaved);
        if (isSaved) {
            return ResponseEntity.ok("Material was booked");
        } else {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Cannot find rack space");
        }
    }
}
