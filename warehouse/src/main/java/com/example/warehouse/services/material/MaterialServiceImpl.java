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

    private final long handlingClearance = 20;
    private final long handlingClearanceWeight = 10;

    private final long optimizationFactor = 10;

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
        RackSpace rackSpaceSupply = new RackSpace();
        final Material deliveredMaterial = materialRepository.findFirstByNofMaterial(material.getNofMaterial()).orElseThrow(() -> new RuntimeException("Error: NofMaterial is not found."));
        int maxPriority = rackSpaceRepository.findFirstBySellerOrderByPriorityDesc(seller).getPriority();
        int priority = material.getPriority();
        deliveredMaterial.setHeight(deliveredMaterial.getHeight() + handlingClearance);
        deliveredMaterial.setWeight(deliveredMaterial.getWeight() + handlingClearanceWeight);

        boolean isSaved = false;
        boolean limitExceeded = false;
        do {
            List<RackSpace> rackSpaces = rackSpaceRepository.findBySellerAndPriorityAndStatus(seller, priority, RackSpaceStatus.Wolny);
            if (!Collections.isEmpty(rackSpaces)) {
                rackSpaces = rackSpaces.stream().filter(rackSpace -> rackSpace.getHeight() >= deliveredMaterial.getHeight())
                        .filter(rackSpace -> rackSpace.getLength() >= deliveredMaterial.getLength())
                        .filter(rackSpace -> rackSpace.getMaxWeight() >= deliveredMaterial.getWeight())
                        .filter(rackSpace -> rackSpace.getWidth() >= deliveredMaterial.getWidth())
                        .collect(Collectors.toList());
                if (!Collections.isEmpty(rackSpaces)) {
                    List<RackSpace> optimizedRackSpaces;
                    int iterator = 1;
                    do {
                        final long optimizationFactorForThisIterator = iterator * optimizationFactor;
                        optimizedRackSpaces = rackSpaces.stream().filter(rackSpace -> (rackSpace.getHeight() - optimizationFactorForThisIterator) >= deliveredMaterial.getHeight())
                                .filter(rackSpace -> (rackSpace.getLength() - optimizationFactorForThisIterator) >= deliveredMaterial.getLength())
                                .filter(rackSpace -> (rackSpace.getMaxWeight() - optimizationFactorForThisIterator) >= deliveredMaterial.getWeight())
                                .filter(rackSpace -> (rackSpace.getWidth() - optimizationFactorForThisIterator) >= deliveredMaterial.getWidth())
                                .collect(Collectors.toList());
                        iterator++;
                    } while (Collections.isEmpty(optimizedRackSpaces));
                    rackSpaceSupply = optimizedRackSpaces.get(0);
                    rackSpaceSupply.setStatus(RackSpaceStatus.Zarezerwowany);
                    rackSpaceRepository.save(rackSpaceSupply);
                    material.setRackSpace(rackSpaceSupply);
                    materialRepository.save(material);
                    isSaved = true;
                }
            }
            if (priority >= maxPriority) {
                limitExceeded = true;
            }
            priority++;
        } while (!limitExceeded && !isSaved);
        if (isSaved) {
            return ResponseEntity.ok("Material został zarezerwowany na palecie nr: " + rackSpaceSupply.getRackId());
        } else {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Cannot find rack space");
        }
    }
}
