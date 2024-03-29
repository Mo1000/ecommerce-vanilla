package com.ahntech.backend.validations.stars;

import com.ahntech.backend.validations.stars.StarsValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StarsValidator.class)
public @interface ValidStars {
    String message() default "Invalid stars value";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
