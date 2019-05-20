package ru.gaass.bso.customassistantapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "brands")
@Data
@NoArgsConstructor
public class Brand {
    @Id
    private String id;
    private String title;
    private String notes;

    public Brand(String title, String notes) {
        this.title = title;
        this.notes = notes;
    }

    public Brand(String title) {
        this.title = title;
    }
}
