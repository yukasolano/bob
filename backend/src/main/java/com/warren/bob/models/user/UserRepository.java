package com.warren.bob.models.user;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<UserEntity, Long> {
    List<UserEntity> findFirstByUsernameAndPassword(String username, String password);
}
