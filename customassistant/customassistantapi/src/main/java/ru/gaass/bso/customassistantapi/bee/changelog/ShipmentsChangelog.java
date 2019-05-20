package ru.gaass.bso.customassistantapi.bee.changelog;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;
import ru.gaass.bso.customassistantapi.domain.Brand;
import ru.gaass.bso.customassistantapi.domain.Currency;
import ru.gaass.bso.customassistantapi.domain.Customs;
import ru.gaass.bso.customassistantapi.domain.Shipment;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.IntStream;

@ChangeLog
public class ShipmentsChangelog {

    static Shipment shipmentGenerator(MongoTemplate mongoTemplate, boolean completed) {

        List<Brand> brands = mongoTemplate.findAll(Brand.class);
        List<Currency> currencies = mongoTemplate.findAll(Currency.class);
        List<Customs> customs = mongoTemplate.findAll(Customs.class);

        Shipment shipment = new Shipment();

        shipment.setPriority(0);
        shipment.setCompleted(completed);
        shipment.setCreatedDate(new Date());
        shipment.setBrand(brands.get(ThreadLocalRandom.current().nextInt(0, 10)));
        shipment.setStatus("Notes of current status");
        shipment.setCustoms(customs.get(ThreadLocalRandom.current().nextInt(0, 3)));
        shipment.setInvoiceAmount(new BigDecimal(ThreadLocalRandom.current().nextDouble(10000.00)).setScale(2, RoundingMode.CEILING));
        shipment.setInvoiceCurrency(currencies.get(ThreadLocalRandom.current().nextInt(0, 2)));
        shipment.setTaxAmount(new BigDecimal(ThreadLocalRandom.current().nextDouble(10000.00, 100000.00)).setScale(2, RoundingMode.CEILING));
        shipment.setVatAmount(new BigDecimal(ThreadLocalRandom.current().nextDouble(10000.00, 100000.00)).setScale(2, RoundingMode.CEILING));
        shipment.setEtaCustoms(new Date());
        shipment.setExtInvoiceNumber("#" + ThreadLocalRandom.current().nextInt(1000000, 10000000));
        shipment.setNotes("Some common notes");
        shipment.setIntInvoiceNumber("#" + ThreadLocalRandom.current().nextInt(1000000, 10000000));
        shipment.setEtaWarehouse(new Date());
        shipment.setCargoDimensions("Dimensions");
        shipment.setLocalDelivery("Self delivery");

        return shipment;
    }


    @ChangeSet(order = "004", id = "shipmentsStartupFill", author = "baobingo")
    public void startupFill(MongoTemplate mongoTemplate){
        IntStream.range(0, 10).forEach(i->{
            mongoTemplate.insert(shipmentGenerator(mongoTemplate, false));
        });
    }

    @ChangeSet(order = "005", id = "shipmentsStartupFillCompleted", author = "baobingo")
    public void startupFillCompleted(MongoTemplate mongoTemplate){
        IntStream.range(0, 40).forEach(i->{
            mongoTemplate.insert(shipmentGenerator(mongoTemplate, true));
        });
    }
}
