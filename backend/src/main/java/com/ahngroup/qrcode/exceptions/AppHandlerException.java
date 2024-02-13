package com.ahngroup.qrcode.exceptions;

import com.ahngroup.qrcode.helpers.CustomError;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.*;

@RestControllerAdvice
@Slf4j
public class AppHandlerException {


    // Handle all exceptions
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    protected Map<String, Object> handleInternalServerErrorExceptions(
            @NonNull Exception ex, WebRequest request) {
        CustomError customError = new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", request, ex.getMessage());
        return customError.getErrorAttributes();
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected Map<String, Object> handleValidationExceptions(
            @NonNull MethodArgumentNotValidException ex, WebRequest request) {
        BindingResult result = ex.getBindingResult();
//        List<String> errors = result.getAllErrors()
//                .stream()
//                .map(DefaultMessageSourceResolvable::getDefaultMessage)
//                .collect(Collectors.toList());

        Map<String, List<String>> errors = new HashMap<>();
        result.getFieldErrors().forEach(violation -> {
            String message = violation.getDefaultMessage() != null ? violation.getDefaultMessage() : "Invalid field value";
            List<String> errorMessages = new ArrayList<>();
            errorMessages.add(message);
            if (errors.get(violation.getField()) != null) {
                errors.get(violation.getField()).add(message);
            } else
                errors.put(violation.getField(), errorMessages);
        });
        CustomError customError = new CustomError(HttpStatus.BAD_REQUEST, "Fields validation failed", request, errors);
        return customError.getErrorAttributes();
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(DuplicateKeyException.class)
    protected Map<String, Object> handleValidationExceptions(
            @NonNull DuplicateKeyException ex, WebRequest request) {
        CustomError customError = new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, "Duplicate key error", request, ex.getMessage());
        return customError.getErrorAttributes();
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ConstraintViolationException.class})
    protected Map<String, Object> handleAllValidationExceptions(
            ConstraintViolationException ex, WebRequest request) {

        Map<String, Object> errors = new HashMap<>();
        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();

        constraintViolations.forEach(violation -> {
            int index = violation.getPropertyPath().toString().indexOf(".");
            String fieldName = index > 0 ? violation.getPropertyPath().toString().substring(index + 1) : violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errors.put(fieldName, errorMessage);
        });

        CustomError customError = new CustomError(HttpStatus.BAD_REQUEST, "Fields validation failed", request, errors);
        return customError.getErrorAttributes();
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(RessourcesNotFoundException.class)
    protected Map<String, Object> handleNotFoundExceptions(WebRequest request) {

        CustomError customError = new CustomError(HttpStatus.NOT_FOUND, "Ressource or entity not found", request);
        return customError.getErrorAttributes();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    protected Map<String, Object> handleBadRequestExceptions(BadRequestException ex, WebRequest request) {
        String message;
        if (ex.getMessage() == null) {
            message = "Your request is not valid";
        } else {
            message = ex.getMessage();
        }
        CustomError customError = new CustomError(HttpStatus.BAD_REQUEST, message, request);
        return customError.getErrorAttributes();
    }

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(UnprocessableEntityException.class)
    protected Map<String, Object> handleUnprocessableEntityExceptions(UnprocessableEntityException ex, WebRequest request) {
        CustomError customError = new CustomError(HttpStatus.NOT_FOUND, ex.getMessage(), request);
        return customError.getErrorAttributes();
    }
}
