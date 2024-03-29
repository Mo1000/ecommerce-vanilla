package com.ahntech.backend.repositories;

import com.ahntech.backend.entities.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}
