package com.example.warehouse.controller;

import com.example.warehouse.model.User;
import com.example.warehouse.payload.request.AddUserRequest;
import com.example.warehouse.payload.request.LoginRequest;
import com.example.warehouse.payload.response.JwtResponse;
import com.example.warehouse.security.jwt.JwtUtils;
import com.example.warehouse.services.register.RegisterService;
import com.example.warehouse.services.user.UserDetailsImpl;
import com.example.warehouse.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    private final RegisterService registerService;


    public UserController(UserService userService, RegisterService registerService) {
        this.userService = userService;
        this.registerService = registerService;
    }

    @RequestMapping(value = "/api/user", method = RequestMethod.GET)
    public User getUser() {

        //  userRepository.save(user);
        return new User();
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {

        return registerService.createUser(user,user.getSeller());
    }
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser( @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/api/addUser")
    public ResponseEntity<?> addUser( @RequestBody AddUserRequest addUserRequest) {
        return registerService.addUser(addUserRequest);
    }
}
