package com.campus.transit.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("!prod")
@OpenAPIDefinition(
        info = @Info(
                title = "Smart Campus Transit API",
                description = "Backend APIs for Shuttle Booking, Wallet Management, and Route Optimization.",
                version = "1.0"
        ),
        security = @SecurityRequirement(name = "bearerAuth") // applies security to all endpoints globally
)
@SecurityScheme(
        name = "bearerAuth",
        description = "Enter your JWT token here. (Do not type 'Bearer ', just the token)",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class SwaggerConfig {

}
