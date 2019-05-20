package ru.gaass.bso.customassistantapi.bee;

import com.github.mongobee.Mongobee;
import com.mongodb.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoBeeConfig {

    private MongoClient mongo;
    private MongoTemplate mongoTemplate;

    public MongoBeeConfig(MongoClient mongo, MongoTemplate mongoTemplate) {
        this.mongo = mongo;
        this.mongoTemplate = mongoTemplate;
    }

    @Bean
    public Mongobee mongobee(final Environment environment) {
        Mongobee runner = new Mongobee(mongo);
        runner.setDbName(mongoTemplate.getMongoDbFactory().getDb().getName());
        runner.setChangeLogsScanPackage("ru.gaass.bso.customassistantapi.bee.changelog");
        runner.setMongoTemplate(mongoTemplate);
        runner.setSpringEnvironment(environment);
        return runner;
    }
}

