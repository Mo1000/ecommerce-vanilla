package com.ahngroup.qrcode.exceptions;

public class UnprocessableEntityException extends RuntimeException{
    public UnprocessableEntityException(String message) {
        super(message);
    }
    public UnprocessableEntityException() {
        super();
    }
}
