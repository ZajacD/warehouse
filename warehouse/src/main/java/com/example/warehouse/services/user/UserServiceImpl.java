package com.example.warehouse.services.user;

import com.example.warehouse.model.User;
import com.example.warehouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public User getUser() {
        return null;
    }

    @Override
    public User createUser(User user) {
        user.setLogin(user.getEmail());
        return userRepository.save(user);
    }
}
