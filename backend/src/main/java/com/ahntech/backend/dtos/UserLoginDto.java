package com.ahntech.backend.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;


@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserLoginDto {


    @NotNull(message = "email is required")
    @NotBlank(message = "email must not be blank")
    @Email(message = "email must be a valid email")
      String email;


    @NotNull(message = "password is required")
    @NotBlank(message = "password must not be blank")
    @Size(min = 3, message = "password must be at least 3 characters")
      String password;


}
