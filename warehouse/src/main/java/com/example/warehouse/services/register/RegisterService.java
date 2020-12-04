package com.example.warehouse.services.register;

import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import org.springframework.http.ResponseEntity;

public interface RegisterService {

    ResponseEntity<?> createUser(User user, Seller seller);
}
