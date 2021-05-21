package com.example.warehouse.services.register;

import com.example.warehouse.model.AppRole;
import com.example.warehouse.model.ERole;
import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import com.example.warehouse.payload.request.AddUserRequest;
import com.example.warehouse.repository.RoleRepository;
import com.example.warehouse.repository.SellerRepository;
import com.example.warehouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        seller.setEmail(user.getEmail());
        seller = sellerRepository.save(seller);
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

    @Override
    public ResponseEntity<?> addUser(AddUserRequest addUserRequest) {
        User user = new User();
        user.setLogin(addUserRequest.getUsername());
        user.setEmail(addUserRequest.getUsername());
        Set<AppRole> appRoles = new HashSet<>();
        AppRole role = null;
        if(addUserRequest.getRole().equals("manager")) {
             role = roleRepository.findByName(ERole.ROLE_MANAGER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        }
        if(addUserRequest.getRole().equals("user")) {
             role = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        }
        appRoles.add(role);
        user.setAppRoles(appRoles);
        user.setPassword(encoder.encode(addUserRequest.getPassword()));

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        User authUser = userRepository.findByLogin(name).get();


        Seller seller = authUser.getSeller();
        user.setSeller(seller);
        userRepository.save(user);
        return ResponseEntity.ok("Create user successful");
    }
}
