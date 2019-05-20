package ru.gaass.bso.customassistantapi.bee.changelog;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;
import ru.gaass.bso.customassistantapi.domain.Customs;


@ChangeLog
public class CustomsChangelog {
    @ChangeSet(order = "003", id = "customsStartupFill", author = "baobingo")
    public void startupFill(MongoTemplate mongoTemplate){
        mongoTemplate.insert(new Customs("MO Istra"));
        mongoTemplate.insert(new Customs("Baltika"));
        mongoTemplate.insert(new Customs("SVO"));
    }
}
