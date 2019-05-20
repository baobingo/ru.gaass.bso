package ru.gaass.bso.customassistantapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "currencies")
@Data
@NoArgsConstructor
public class Currency {
    @Id
    private String id;
    private String title;
    private String code;

    public Currency(String title, String code) {
        this.title = title;
        this.code = code;
    }
}
