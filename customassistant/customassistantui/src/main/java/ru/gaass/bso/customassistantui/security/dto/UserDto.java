package ru.gaass.bso.customassistantui.security.dto;

import lombok.Data;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Data
public class UserDto {
    @NotNull
    private String username;
    @NotNull
    private String password;

    private List<RoleDto> roles;

    public Optional<UserDetails> get(){
        return Optional.of(new User(getUsername(), getPassword(), getRoles()));
    }
}
