package ru.gaass.bso.customassistantapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "customs")
@Data
@NoArgsConstructor
public class Customs {
    @Id
    private String id;
    private String title;

    public Customs(String title) {
        this.title = title;
    }
}
