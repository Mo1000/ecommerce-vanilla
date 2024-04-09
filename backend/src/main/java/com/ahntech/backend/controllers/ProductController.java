package com.ahntech.backend.controllers;
import com.ahntech.backend.dtos.ProductDto;
import com.ahntech.backend.entities.Product;
import com.ahntech.backend.models.MessageResponse;
import com.ahntech.backend.services.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Slf4j
@RequiredArgsConstructor
@Validated
@FieldDefaults(level = AccessLevel.PUBLIC)
//@PreAuthorize("hasRole('USER')")
public class ProductController {


    private final ProductService productService;

  // @Secured("ROLE_ADMIN")
    @GetMapping
    List<Product> getProducts() {
        return productService.getAllProduct();
    }

    @GetMapping(path = "/section")
    List<Product> getProductsBySection(@RequestParam("list") String list,@RequestParam(value = "limit" ,required = false, defaultValue = "0") Integer limit) {
        List<String> sections = List.of(list.split(","));
        return productService.findBySection(sections, limit);
    }

    @GetMapping(path = "/{productId}")
    Product getProductById(@PathVariable String productId) {
        return productService.getProductById(productId);
    }


    @PostMapping
    ResponseEntity<MessageResponse> addProduct(@Valid @RequestBody ProductDto newProduct) {
        return this.productService.addProduct(newProduct);
    }

    @PostMapping("/many")
    HttpEntity<MessageResponse> addManyProduct(@RequestBody List<@Valid ProductDto> productList) {

        return this.productService.addManyProduct(productList);
    }

    @DeleteMapping(path = "/{productId}")
    Boolean deleteProduct(@PathVariable("productId") String productId) throws Exception {
        return this.productService.deleteProduct(productId);
    }

    @DeleteMapping(path = "/all")
    Boolean deleteProduct(List<String> productsIDList) throws Exception {
        return this.productService.deleteProductList(productsIDList);
    }
}
