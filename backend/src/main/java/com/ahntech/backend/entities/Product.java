package com.ahntech.backend.entities;

import com.ahntech.backend.dtos.ProductDto;
import com.ahntech.backend.enums.SectionProduct;
import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.EnumNaming;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "product")
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class Product {

     @Id
     String id;
     String title;
     Double finalPrice;
     Double previousPrice; // Use Double for optional fields
     String image;
     Double reductionPrice; // Use Double for optional fields
     Stars stars;
     List<String> colorList;
     List<String> sizeList;
     SectionProduct section;



    public void setAllAttributes(ProductDto newProduct) {
        this.title = newProduct.getTitle();
        this.finalPrice = newProduct.getFinalPrice();
        this.previousPrice = newProduct.getPreviousPrice();
        this.image = newProduct.getImage();
        this.reductionPrice = newProduct.getReductionPrice();
        this.stars = newProduct.getStars();
        this.colorList = newProduct.getColorList();
        this.sizeList = newProduct.getSizeList();
        this.section = newProduct.getSection();
    }



    @Override
    public String toString() {
        return "Product{" +
                "title='" + title + '\'' +
                ", finalPrice=" + finalPrice +
                ", previousPrice=" + previousPrice +
                ", image='" + image + '\'' +
                ", reductionPrice=" + reductionPrice +
                ", stars=" + stars +
                ", colorList=" + colorList +
                ", sizeList=" + sizeList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product product)) return false;
        return Double.compare(finalPrice, product.finalPrice) == 0 && Objects.equals(title, product.title) && Objects.equals(previousPrice, product.previousPrice) && Objects.equals(image, product.image) && Objects.equals(reductionPrice, product.reductionPrice) && Objects.equals(stars, product.stars) && Objects.equals(colorList, product.colorList) && Objects.equals(sizeList, product.sizeList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, finalPrice, previousPrice, image, reductionPrice, stars, colorList, sizeList);
    }
}
