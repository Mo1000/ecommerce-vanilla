package com.ahntech.backend.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
public enum SectionProduct {
    TODAY,
    CURRENT_MONTH,
    My_Products;
}
