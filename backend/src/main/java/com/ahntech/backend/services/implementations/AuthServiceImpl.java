package com.ahntech.backend.services.implementations;

import com.ahntech.backend.models.AuthenticationResponse;
import com.ahntech.backend.dtos.UserLoginDto;
import com.ahntech.backend.dtos.UserDto;
import com.ahntech.backend.entities.User;
import com.ahntech.backend.enums.AccountRole;
import com.ahntech.backend.repositories.UserRepository;
import com.ahntech.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(UserDto newUser) {
        var user = User.builder()
                .username(newUser.getUsername())
                .address(newUser.getAddress())
                .email(newUser.getEmail())
                .phone(newUser.getPhone())
                .avatar(newUser.getAvatar())
                .password(passwordEncoder.encode(newUser.getPassword()))
                .role(AccountRole.USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }

    @Override
    public AuthenticationResponse login(UserLoginDto user) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword()
        ));
        var userEntity = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        var jwtToken = jwtService.generateToken(userEntity);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(userEntity)
                .build();
    }


}
