package com.example.warehouse.services.register;

import com.example.warehouse.model.AppRole;
import com.example.warehouse.model.ERole;
import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import com.example.warehouse.repository.RoleRepository;
import com.example.warehouse.repository.SellerRepository;
import com.example.warehouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class RegisterServiceImpl implements RegisterService{
    @Autowired
    UserRepository userRepository;
    @Autowired
    SellerRepository sellerRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public ResponseEntity<?> createUser(User user, Seller seller) {
        user.setLogin(user.getEmail());
        System.out.println(user.getEmail());
        seller.setEmail(user.getEmail());
        System.out.println(seller.getCity());
        seller = sellerRepository.save(seller);
        System.out.println(user.getPassword());
        user.setPassword(encoder.encode(user.getPassword()));
        Set<AppRole> appRoles = new HashSet<>();
        AppRole adminAppRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        appRoles.add(adminAppRole);
        user.setAppRoles(appRoles);
        user.setSeller(seller);
        userRepository.save(user);
        return ResponseEntity.ok("Create user successful");
    }
}
