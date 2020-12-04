package com.example.warehouse.services.user;

import com.example.warehouse.model.User;

public interface UserService {

    User getUser();
    User createUser(User user);
}
