package com.ahntech.backend.dtos;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRegisterDto {
    @NotNull(message = "username is required")
    @NotBlank(message = "username must not be blank")
    @Size(min = 3, message = "username must be at least 3 characters")
     String username;

    @NotNull(message = "email is required")
    @NotBlank(message = "email must not be blank")
    @Email(message = "email must be a valid email")
     String email;

    @NotNull(message = "password is required")
    @NotBlank(message = "password must not be blank")
     String password;


     String avatar;


     String address;


     String phone;
}
