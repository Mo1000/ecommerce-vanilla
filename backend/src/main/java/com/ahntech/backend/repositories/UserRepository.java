package com.ahntech.backend.repositories;

import com.ahntech.backend.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
