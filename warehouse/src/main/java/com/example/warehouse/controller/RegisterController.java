package com.example.warehouse.controller;

import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import com.example.warehouse.services.register.RegisterService;
import com.example.warehouse.services.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {

    private final RegisterService registerService;

    public RegisterController (RegisterService registerService) {
        this.registerService = registerService;
    }
    @RequestMapping(value = "/api/register", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user) {

        return registerService.createUser(user,user.getSeller());
    }
}
