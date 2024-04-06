package com.ahntech.backend.controllers;

import com.ahntech.backend.dtos.UserLoginDto;
import com.ahntech.backend.dtos.UserDto;
import com.ahntech.backend.models.AuthenticationResponse;
import com.ahntech.backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AuthController {


    private  final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody UserDto newUser){
        return ResponseEntity.ok(authService.register(newUser));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid  @RequestBody UserLoginDto user){
        return ResponseEntity.ok(authService.login(user));
    }
}
