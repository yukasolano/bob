package com.warren.bob.models.user;

import com.warren.bob.controllers.user.UserDTO;
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

    public boolean isTaken(String username) {
        List<UserEntity> user = userRepository.findByUsername(username);
        return user != null && !user.isEmpty();
    }

    public void create(UserDTO user) {
        UserEntity entity = new UserEntity();
        entity.setName(user.getName());
        entity.setUsername(user.getUsername());
        entity.setPassword(user.getPassword());
        entity.setEmail(user.getEmail());
        userRepository.save(entity);
    }
}
