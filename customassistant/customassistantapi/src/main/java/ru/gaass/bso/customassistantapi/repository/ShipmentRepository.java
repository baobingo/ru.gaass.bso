package ru.gaass.bso.customassistantapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.gaass.bso.customassistantapi.domain.Shipment;

import java.util.List;

public interface ShipmentRepository extends MongoRepository<Shipment, String> {
    List<Shipment> findShipmentByCompletedFalseOrderByPriority();
    Page<Shipment> findShipmentByCompletedIsTrue(Pageable pageable);
}
