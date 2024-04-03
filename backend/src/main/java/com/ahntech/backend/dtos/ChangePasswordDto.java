package com.ahntech.backend.dtos;

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
public class ChangePasswordDto {
    @NotNull(message = "currentPassword is required")
    @NotBlank(message = "currentPassword must not be blank")
    @Size(min = 3, message = "currentPassword must be at least 3 characters")
    private String currentPassword;

    @NotNull(message = "newPassword is required")
    @NotBlank(message = "newPassword must not be blank")
    @Size(min = 3, message = "newPassword must be at least 3 characters")
    private String newPassword;

    @NotNull(message = "confirmationPassword is required")
    @NotBlank(message = "confirmationPassword must not be blank")
    @Size(min = 3, message = "confirmationPassword must be at least 3 characters")
    private String confirmationPassword;
}
