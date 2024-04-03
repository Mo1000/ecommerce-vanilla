package com.ahntech.backend.exceptions.handledJwtError;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;


import java.io.IOException;

@Component
@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {
        CustomJwtError customJwtError = new CustomJwtError(request, response);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write(customJwtError.getError());
    }
}
