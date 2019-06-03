package ru.gaass.bso.customassistantui.security.service;

import feign.Param;
import feign.RequestLine;
import ru.gaass.bso.customassistantui.security.dto.UserDto;

public interface UserFeignClient {
    @RequestLine("GET /findByUsername?username={username}")
    UserDto findByUserName(@Param("username") String username);
}
