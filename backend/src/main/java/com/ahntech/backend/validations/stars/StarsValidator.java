package com.ahntech.backend.validations.stars;


import com.ahntech.backend.entities.Stars;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StarsValidator implements ConstraintValidator<ValidStars, Stars> {

    @Override
    public void initialize(ValidStars constraintAnnotation) {
    }

    @Override
    public boolean isValid(Stars stars, ConstraintValidatorContext context) {
        // If stars is null, it's considered invalid
        if (stars == null) {
            return false;
        }
        // Validate number and total
        return stars.getNumber() >= 0 && stars.getTotal() >= 0;
    }
}

