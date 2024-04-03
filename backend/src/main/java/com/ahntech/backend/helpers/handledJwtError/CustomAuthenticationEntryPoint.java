package com.ahntech.backend.helpers.handledJwtError;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(HttpServletRequest request, @NotNull HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        CustomJwtError customJwtError = new CustomJwtError(request, response);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(customJwtError.getError());



    }



}
