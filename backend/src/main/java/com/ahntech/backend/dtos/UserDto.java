package com.ahntech.backend.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class UserDto {
    @NotNull(message = "username is required")
    @NotBlank(message = "username must not be blank")
    @Size(min = 3, message = "username must be at least 3 characters")
    private String username;

    @NotNull(message = "email is required")
    @NotBlank(message = "email must not be blank")
    @Email(message = "email must be a valid email")
    private String email;

    @NotNull(message = "password is required")
    @NotBlank(message = "password must not be blank")
    private String password;


    private String avatar;

    @NotNull(message = "address is required")
    @NotBlank(message = "address must not be blank")
    private String address;

    @NotNull(message = "phone is required")
    @NotBlank(message = "phone must not be blank")
    private String phone;
}
