package ru.gaass.bso.customassistantapi.bee.changelog;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;
import ru.gaass.bso.customassistantapi.domain.Currency;


@ChangeLog
public class CurrenciesChangelog {
    @ChangeSet(order = "002", id = "currenciesStartupFill", author = "baobingo")
    public void startupFill(MongoTemplate mongoTemplate){
        mongoTemplate.insert(new Currency("US Dollar", "USD"));
        mongoTemplate.insert(new Currency("Pound sterling", "GBP"));
    }
}
