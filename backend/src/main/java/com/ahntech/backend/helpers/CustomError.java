package com.ahntech.backend.helpers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Builder
@AllArgsConstructor
@Slf4j
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CustomError {
    HttpStatus httpStatus;
    String message;
    WebRequest request;
    Object dataError;


    public CustomError(HttpStatus httpStatus, String message, WebRequest request) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.request = request;
    }

    private String extractPathFromRequest() {
        // Extract path from the request and remove the "uri=" prefix
        String fullDescription = this.request.getDescription(false);
        if (fullDescription.startsWith("uri=")) {
            return fullDescription.substring(4);
        }
        return fullDescription;
    }

    private Map<String, Object> getMetaData() {
        Map<String, Object> meta = new HashMap<>();
        meta.put("path", extractPathFromRequest());
        meta.put("timestamp", new Date());
        return meta;
    }


    public Map<String, Object> getErrorAttributes() {
        Map<String, Object> data = new HashMap<>();

        //handle error data
        Map<String,Object> error = new HashMap<>();
        error.put("statusCode", this.httpStatus.value());
        error.put("code", this.httpStatus.getReasonPhrase());

        data.put("error", error);
        data.put("message", this.message);
        if (this.dataError != null) {
            data.put("data", this.dataError);
        }
        data.put("meta", getMetaData()); // Extract path from the request
        return data;
    }
}
