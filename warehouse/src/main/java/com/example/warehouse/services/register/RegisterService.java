package com.example.warehouse.services.register;

import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import com.example.warehouse.payload.request.AddUserRequest;
import org.springframework.http.ResponseEntity;

public interface RegisterService {

    ResponseEntity<?> createUser(User user, Seller seller);
    ResponseEntity<?> addUser(AddUserRequest addUserRequest);

}
