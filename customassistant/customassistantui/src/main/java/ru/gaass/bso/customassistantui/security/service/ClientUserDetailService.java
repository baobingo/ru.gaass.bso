package ru.gaass.bso.customassistantui.security.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import feign.Feign;
import feign.jackson.JacksonDecoder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.gaass.bso.customassistantui.config.ZuulConfigProperties;
import ru.gaass.bso.customassistantui.security.dto.UserDto;


@Component
public class ClientUserDetailService implements UserDetailsService {

    private ZuulConfigProperties zuulConfigProperties;
    private UserFeignClient userFeignClient;

    public ClientUserDetailService(ZuulConfigProperties zuulConfigProperties) {
        this.zuulConfigProperties = zuulConfigProperties;
        userFeignClient = Feign.builder()
                .decoder(new JacksonDecoder())
                .target(UserFeignClient.class, zuulConfigProperties.getUrl()+"/userAccounts/search");
    }

    @Override
    @HystrixCommand(fallbackMethod = "UserServiceUnreachable", groupKey = "UserService")
    public UserDetails loadUserByUsername(String s){
        try{
            UserDto userDto = userFeignClient.findByUserName(s);
            return userDto.get().orElseThrow();
        }catch (Exception e){
            throw new UsernameNotFoundException("Bad credentials.");
        }
    }

    public UserDetails UserServiceUnreachable(String s){
        return User.builder().username("cduj20u9j239fuc0j23")
                .password(new BCryptPasswordEncoder()
                        .encode("jdx823ucdpj23ucdn2ul3cj238"))
                .authorities(new SimpleGrantedAuthority("user")).build();
    }

}