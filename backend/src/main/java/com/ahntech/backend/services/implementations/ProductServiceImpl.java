package com.ahntech.backend.services.implementations;

import com.ahntech.backend.dtos.ProductDto;
import com.ahntech.backend.entities.Product;
import com.ahntech.backend.enums.CodeResponse;
import com.ahntech.backend.exceptions.BadRequestException;
import com.ahntech.backend.exceptions.RessourcesNotFoundException;
import com.ahntech.backend.exceptions.UnprocessableEntityException;
import com.ahntech.backend.models.MessageResponse;
import com.ahntech.backend.repositories.ProductRepository;
import com.ahntech.backend.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private MongoOperations mongoOperations;

    public static final String COLLECTION_NAME = "product";

    public final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public Product getProductById(String idProduct) {
        return productRepository.findById(idProduct).orElseThrow(RessourcesNotFoundException::new);
    }


    @Override
    public List<Product> findBySection(List<String> sections, Integer limit) {

        if (!CollectionUtils.isEmpty(sections)) {
            List<Product> productList = new ArrayList<>();
            for (String section : sections) {
                Query query = new Query(Criteria.where("sections").is(section));
                productList.addAll(mongoOperations.find(query, Product.class, COLLECTION_NAME));
            }
            return (limit != null &&  limit != 0 )  ?  productList.subList(0, limit) : productList;
        } else
            throw new BadRequestException("List of section is empty");

    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }


    @Override
    public ResponseEntity<MessageResponse> addProduct(ProductDto newProduct) {
        try {
            Product product = new Product();
            product.setAllAttributes(newProduct);
            String id = productRepository.save(product).getId();
            if (id == null) {
                throw new UnprocessableEntityException("User not added.Something was wrong");
            }
            return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.builder()
                    .message(CodeResponse.RES200.getLabel())
                    .value(product)
                    .build());
        } catch (Exception e) {
            if (e instanceof DuplicateKeyException) {
                throw new BadRequestException("User already exist with username or email");
            }
            throw e;
        }
    }


    @Override
    public ResponseEntity<MessageResponse> addManyProduct(List<ProductDto> productList) {
        if (!CollectionUtils.isEmpty(productList)) {
            for (ProductDto product : productList) {
                this.addProduct(product);
            }
            return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.builder()
                    .message("Users added successfully")
                    .value(productList)
                    .build());
        } else
            throw new BadRequestException("List of users is empty");


    }

    @Override
    public Boolean deleteProduct(String productId) {
        Product product = this.getProductById(productId);
        if (product != null) {
            this.productRepository.deleteById(productId);
            return true;
        } else {
            throw new RessourcesNotFoundException();
        }


    }

    @Override
    public Boolean deleteProductList(List<String> productIdList) {

        try {
            if (productIdList != null && !CollectionUtils.isEmpty(productIdList)) {
                for (Iterator<String> iterator = productIdList.listIterator(); iterator.hasNext(); ) {
                    String id = iterator.next();
                    Optional<Product> userToDeleted = this.productRepository.findById(id);
                    if (userToDeleted.isPresent()) {
                        this.deleteProduct(id);
                        iterator.remove();
                    }
                }
                return productIdList.isEmpty();
            } else
                throw new Exception("Liste vide");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
