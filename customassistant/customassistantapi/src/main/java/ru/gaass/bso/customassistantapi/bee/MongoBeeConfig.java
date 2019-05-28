package ru.gaass.bso.customassistantapi.bee;

import com.github.mongobee.Mongobee;
import com.mongodb.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoBeeConfig {

    @Bean
    public Mongobee mongobee(final Environment environment, MongoClient mongo, MongoTemplate mongoTemplate) {
        Mongobee runner = new Mongobee(mongo);
        runner.setDbName(mongoTemplate.getMongoDbFactory().getDb().getName());
        runner.setChangeLogsScanPackage("ru.gaass.bso.customassistantapi.bee.changelog");
        runner.setMongoTemplate(mongoTemplate);
        runner.setSpringEnvironment(environment);
        return runner;
    }
}

