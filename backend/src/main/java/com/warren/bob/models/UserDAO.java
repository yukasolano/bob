package com.warren.bob.models;

import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class UserDAO {

    @Resource
    private UserRepository userRepository;

    public boolean isValid(String username,
                           String password) {
        List<UserEntity> user = userRepository.findFirstByUsernameAndPassword(username, password);
        return user != null && !user.isEmpty();
    }
}
