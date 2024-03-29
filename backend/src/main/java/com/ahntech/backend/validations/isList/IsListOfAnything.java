package com.ahntech.backend.validations.isList;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IsListOfAnythingValidator.class)
public @interface IsListOfAnything {
    String message() default "Attribute must be a List";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
