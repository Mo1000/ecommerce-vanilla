package com.ahntech.backend.dtos;

import com.ahntech.backend.entities.Stars;
import com.ahntech.backend.enums.SectionProduct;
import com.ahntech.backend.validations.isList.IsListOfAnything;
import com.ahntech.backend.validations.stars.ValidStars;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.URL;

import java.util.List;


@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDto {

    @NotNull(message = "title is required")
    @NotBlank(message = "title must not be blank")
    @Size(min = 3, message = "title must be at least 3 characters")
     String title;

    @NotNull(message = "finalPrice is required")
     Double finalPrice;


     Double previousPrice; // Use Double for optional fields


    @NotNull(message = "image is required")
    @NotBlank(message = "image must not be blank")
    @URL(message = "image must be a valid URL")
     String image;


     Double reductionPrice; // Use Double for optional fields


    @NotNull(message = "stars is required")
    @ValidStars()
     Stars stars;



    @IsListOfAnything(message = "colorList must be a List")
    @Size(min = 1, message = "colorList must contain at least 1 color")
     List<String> colorList;

    @IsListOfAnything(message = "sizeList must be a List")
    @Size(min = 1, message = "sizeList must contain at least 1 size")
    List<String> sizeList;



   List<SectionProduct> sections;


}
