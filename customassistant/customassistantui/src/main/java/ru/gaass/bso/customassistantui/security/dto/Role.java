package ru.gaass.bso.customassistantui.security.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.springframework.security.core.GrantedAuthority;

@JsonDeserialize(as=Role.class)
public class Role implements GrantedAuthority {
    private String id;
    @JsonProperty("authority")
    private String role;

    public Role(String role) {
        this.role = role;
    }

    public Role() {
        super();
    }

    @Override
    public String getAuthority() {
        return role;
    }
}