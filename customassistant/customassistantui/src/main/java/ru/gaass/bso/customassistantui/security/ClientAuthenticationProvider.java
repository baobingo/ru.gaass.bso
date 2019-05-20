package ru.gaass.bso.customassistantui.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.gaass.bso.customassistantui.security.service.ClientUserDetailService;

@Component
public class ClientAuthenticationProvider implements AuthenticationProvider {

    private ClientUserDetailService clientUserDetailService;

    public ClientAuthenticationProvider(ClientUserDetailService clientUserDetailService) {
        this.clientUserDetailService = clientUserDetailService;
    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        UserDetails userDetails = clientUserDetailService.loadUserByUsername(name);

        if("cduj20u9j239fuc0j23".equals(userDetails.getUsername())){
            throw new BadCredentialsException("Service temporary unavailable.");
        }

        if (name.equals(userDetails.getUsername()) && new BCryptPasswordEncoder().matches(password, userDetails.getPassword())) {
            Authentication auth = new UsernamePasswordAuthenticationToken(name,
                    password, userDetails.getAuthorities());
            return auth;
        }

        throw new BadCredentialsException("Bad credentials.");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}
