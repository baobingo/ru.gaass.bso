package ru.gaass.bso.customassistantui.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder, RestTemplateConfigProperties configProperties) {
        return restTemplateBuilder
                .setConnectTimeout(Duration.ofSeconds(configProperties.getConnectiontimeout()))
                .setReadTimeout(Duration.ofSeconds(configProperties.getReadtimeout()))
                .build();
    }
}
