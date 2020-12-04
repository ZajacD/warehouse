package com.example.warehouse.services.register;

import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import com.example.warehouse.repository.SellerRepository;
import com.example.warehouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceImpl implements RegisterService{
    @Autowired
    UserRepository userRepository;
    @Autowired
    SellerRepository sellerRepository;
    @Override
    public ResponseEntity<?> createUser(User user, Seller seller) {
        user.setLogin(user.getEmail());
        System.out.println(user.getEmail());
        seller.setEmail(user.getEmail());
        System.out.println(seller.getCity());
        sellerRepository.save(seller);
        userRepository.save(user);
        return ResponseEntity.ok("Create user successful");
    }
}
