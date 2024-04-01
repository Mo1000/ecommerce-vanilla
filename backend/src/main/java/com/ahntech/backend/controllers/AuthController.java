package com.ahntech.backend.controllers;

import com.ahntech.backend.dtos.UserLoginDto;
import com.ahntech.backend.dtos.UserRegisterDto;
import com.ahntech.backend.models.AuthenticationResponse;
import com.ahntech.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private  final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserRegisterDto newUser){
        return ResponseEntity.ok(authService.register(newUser));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody UserLoginDto user){
        return ResponseEntity.ok(authService.login(user));
    }
}
