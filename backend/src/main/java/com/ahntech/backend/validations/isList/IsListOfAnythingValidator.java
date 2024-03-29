package com.ahntech.backend.validations.isList;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class IsListOfAnythingValidator implements ConstraintValidator<IsListOfAnything, Object> {

    @Override
    public void initialize(IsListOfAnything constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        // If the value is null, it's considered valid
        if (value == null) {
            return true;
        }
        // Check if the value is a List
        return value instanceof List;
    }
}
