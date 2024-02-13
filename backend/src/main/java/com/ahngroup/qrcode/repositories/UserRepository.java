package com.ahngroup.qrcode.repositories;

import com.ahngroup.qrcode.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
