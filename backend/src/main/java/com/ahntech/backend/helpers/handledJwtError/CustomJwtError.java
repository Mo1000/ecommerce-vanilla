package com.ahntech.backend.helpers.handledJwtError;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class CustomJwtError {
    HttpServletRequest request;
    HttpServletResponse response;

    public CustomJwtError(HttpServletRequest request,HttpServletResponse response) {
        this.request = request;
        this.response = response;
        this.response.setContentType("application/json");
    }

    public String getError() {
        // Convert map to JSON string
       return mapToJson(getErrorAttributes(request));
    }

    private Map<String, Object> getMetaData(HttpServletRequest request) {
        Map<String, Object> meta = new HashMap<>();
        meta.put("path", request.getRequestURI());
        meta.put("timestamp", new Date());
        return meta;
    }

    private Map<String, Object> getErrorAttributes(HttpServletRequest request) {
        Map<String, Object> errors = new HashMap<>();
        errors.put("statusCode", HttpStatus.UNAUTHORIZED.value());
        errors.put("code", HttpStatus.UNAUTHORIZED.getReasonPhrase());
        errors.put("message", HttpStatus.UNAUTHORIZED.getReasonPhrase());
        errors.put("meta", getMetaData(request)); // Extract path from the request
        return errors;
    }

    public static String mapToJson(Map<String, Object> map) {
        try {
            // Create ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();
            // Convert map to JSON string
            return objectMapper.writeValueAsString(map);
        } catch (IOException e) {
            return "{}"; // Return empty JSON object if conversion fails
        }
    }

}
