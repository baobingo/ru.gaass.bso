package ru.gaass.bso.customassistantapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Document(collection = "shipments")
@Data
@NoArgsConstructor
public class Shipment {
    @Id
    private String id;

    private int priority;//pay priority
    private boolean completed;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date createdDate;

    private Brand brand;
    private String status;
    private Customs customs;

    private BigDecimal invoiceAmount;
    private Currency invoiceCurrency;
    private BigDecimal taxAmount;//always in RUB
    private BigDecimal vatAmount;//always in RUB

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date etaCustoms;
    private String extInvoiceNumber;
    private String notes;

    private String intInvoiceNumber;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date etaWarehouse;
    private String cargoDimensions;
    private String localDelivery;
}