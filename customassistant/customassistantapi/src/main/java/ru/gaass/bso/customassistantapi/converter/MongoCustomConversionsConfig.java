package ru.gaass.bso.customassistantapi.converter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import java.util.List;

@Configuration
public class MongoCustomConversionsConfig{

    @Bean
    public MongoCustomConversions register(ZonedDateTimeReadConverter zonedDateTimeReadConverter, ZonedDateTimeWriteConverter zonedDateTimeWriteConverter){
        return new MongoCustomConversions(List.of(zonedDateTimeReadConverter, zonedDateTimeWriteConverter));
    }

}
