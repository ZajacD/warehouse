package com.example.warehouse.services.material;

import com.example.warehouse.model.Material;
import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import com.example.warehouse.payload.request.MaterialRequest;
import com.example.warehouse.repository.MaterialRepository;
import com.example.warehouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaterialServiceImpl implements MaterialService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MaterialRepository materialRepository;

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
}