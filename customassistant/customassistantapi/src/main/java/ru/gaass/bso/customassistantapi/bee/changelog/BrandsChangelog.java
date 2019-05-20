package ru.gaass.bso.customassistantapi.bee.changelog;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;
import ru.gaass.bso.customassistantapi.domain.Brand;

import java.util.stream.IntStream;

@ChangeLog
public class BrandsChangelog {
    @ChangeSet(order = "001", id = "brandsStartupFill", author = "baobingo")
    public void startupFill(MongoTemplate mongoTemplate){
        IntStream.range(0, 10).forEach(i->{
            mongoTemplate.insert(new Brand("Brand " + i, "Some notes"));
        });
    }
}
