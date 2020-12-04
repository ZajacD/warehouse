package com.example.warehouse.controller;

import com.example.warehouse.model.User;
import com.example.warehouse.repository.UserRepository;
import com.example.warehouse.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {
    private final UserService userService;

    public UserController (UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/api/user", method = RequestMethod.GET)
    public User getUser() {

        //  userRepository.save(user);
        return new User();
    }
}
