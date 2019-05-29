package ru.gaass.bso.customassistantui.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.yml")
@ConfigurationProperties(prefix = "zuul.routes.api")
@Getter
@Setter
public class ZuulConfigProperties {
    private String url;
}
