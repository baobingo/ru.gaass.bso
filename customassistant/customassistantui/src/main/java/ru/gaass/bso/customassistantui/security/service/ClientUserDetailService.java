package ru.gaass.bso.customassistantui.security.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import ru.gaass.bso.customassistantui.config.ZuulConfigProperties;
import ru.gaass.bso.customassistantui.security.dto.UserAccount;


@Component
public class ClientUserDetailService implements UserDetailsService {

    private RestTemplate restTemplate;
    private ZuulConfigProperties zuulConfigProperties;

    public ClientUserDetailService(RestTemplate restTemplate, ZuulConfigProperties zuulConfigProperties) {
        this.restTemplate = restTemplate;
        this.zuulConfigProperties = zuulConfigProperties;
    }

    @Override
    @HystrixCommand(fallbackMethod = "UserServiceUnreachable", groupKey = "UserService")
    public UserDetails loadUserByUsername(String s){
        try {
            UserAccount userAccount = restTemplate.getForObject(zuulConfigProperties.getUrl()+"/userAccounts/search/findByUsername?username={s}",
                    UserAccount.class, s);
            return userAccount;
        }catch (RestClientException e){
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