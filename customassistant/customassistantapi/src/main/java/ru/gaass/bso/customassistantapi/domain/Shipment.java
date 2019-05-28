package ru.gaass.bso.customassistantapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Document(collection = "shipments")
@Data
@NoArgsConstructor
public class Shipment {
    @Id
    private String id;

    private int priority;//pay priority
    private boolean completed;
    private ZonedDateTime createdDate;

    private Brand brand;
    private String status;
    private Customs customs;

    private BigDecimal invoiceAmount;
    private Currency invoiceCurrency;
    private BigDecimal taxAmount;//always in RUB
    private BigDecimal vatAmount;//always in RUB

    private ZonedDateTime etaCustoms;
    private String extInvoiceNumber;
    private String notes;

    private String internalInvoiceNumber;
    private ZonedDateTime etaWarehouse;
    private String cargoDimensions;
    private String localDelivery;
}