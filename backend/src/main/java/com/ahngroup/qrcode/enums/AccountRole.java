package com.ahngroup.qrcode.enums;

import lombok.Getter;

@Getter
public enum AccountRole {
    ADMIN("ADMIN"),
    USER("USER");


    private final String label;
    AccountRole(String label) {
        this.label = label;
    }
}
