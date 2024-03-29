package com.ahntech.backend.services;

import com.ahntech.backend.dtos.ProductDto;
import com.ahntech.backend.entities.Product;
import com.ahntech.backend.models.MessageResponse;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface ProductService {

    /**
     * Méthode d'obtention du product à travers son id
     *
     * @param idProduct id de l'user
     * @return User
     */
    Product getProductById(String idProduct);



     List<Product> findBySection(List<String> sections,Integer limit);

    List<Product> getAllProduct();

    ResponseEntity<MessageResponse> addProduct(ProductDto newProduct);


    ResponseEntity<MessageResponse> addManyProduct(List<ProductDto> productList);


    /**
     * Méthode permettant de supprimer une liste d'user.
     *
     * @param productIdList liste des id des users à supprimer
     * @return true si la suppression s'est bien passée
     * @throws Exception si la suppression ne s'est pas bien passée
     */
    Boolean deleteProductList(List<String> productIdList) throws Exception;

    /**
     * Méthode permettant de supprimer un user.
     *
     * @param productId id de l'user à supprimer
     * @return true si la suppression s'est bien passée
     * @throws Exception si la suppression ne s'est pas bien passée
     */
    Boolean deleteProduct(String productId) throws Exception;
}
