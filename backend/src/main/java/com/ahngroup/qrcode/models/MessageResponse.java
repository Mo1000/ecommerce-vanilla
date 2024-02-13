package com.ahngroup.qrcode.models;

import com.ahngroup.qrcode.enums.CodeResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class MessageResponse {
    CodeResponse codeResponse;
    Object value;
    String message;

    @Override
    public String toString() {
        return "MessageResponse{" +
                "codeResponse=" + codeResponse +
                ", message='" + message + '\'' +
                '}';
    }
}
