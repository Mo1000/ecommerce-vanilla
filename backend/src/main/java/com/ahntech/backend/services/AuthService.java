package com.ahntech.backend.services;

import com.ahntech.backend.models.AuthenticationResponse;
import com.ahntech.backend.dtos.UserLoginDto;
import com.ahntech.backend.dtos.UserRegisterDto;

public interface AuthService {
    AuthenticationResponse register(UserRegisterDto newUser);

    AuthenticationResponse login(UserLoginDto user);
}
