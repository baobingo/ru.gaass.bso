package ru.gaass.bso.customassistantui.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.validation.Valid;

@Configuration
@PropertySource("classpath:application.yml")
@ConfigurationProperties(prefix = "resttemplate")
@Getter
@Setter
public class RestTemplateConfigProperties {
    @Valid
    private int connectiontimeout;
    @Valid
    private int readtimeout;
}
