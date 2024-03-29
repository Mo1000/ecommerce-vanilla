package com.ahntech.backend.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.utils.SpringDocUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Ecommerce").version("1.0.0"));
    }

//    static {
//        SpringDocUtils.getConfig()
//                .addAnnotationsToIgnore(
//                        org.springframework.web.bind.annotation.RequestBody.class,
//                        org.springframework.web.bind.annotation.RequestHeader.class);
//    }
}
