package com.ahntech.backend.services;

import com.ahntech.backend.models.AuthenticationResponse;
import com.ahntech.backend.dtos.UserLoginDto;
import com.ahntech.backend.dtos.UserDto;

public interface AuthService {
    AuthenticationResponse register(UserDto newUser);

    AuthenticationResponse login(UserLoginDto user);
}
