package com.ahntech.backend.models;

import com.ahntech.backend.entities.User;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private  String token;
    private User user;
}
