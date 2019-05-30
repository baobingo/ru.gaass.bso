package ru.gaass.bso.customassistantui.security.dto;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.NotNull;

@Data
class RoleDto implements GrantedAuthority {
    @NotNull
    private String role;

    @Override
    public String getAuthority() {
        return role;
    }
}