package com.example.warehouse.controller;

import com.example.warehouse.model.Seller;
import com.example.warehouse.model.User;
import com.example.warehouse.services.register.RegisterService;
import com.example.warehouse.services.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
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
