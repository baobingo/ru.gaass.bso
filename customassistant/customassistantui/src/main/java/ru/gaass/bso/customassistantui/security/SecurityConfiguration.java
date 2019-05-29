package ru.gaass.bso.customassistantui.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private ClientAuthenticationProvider clientAuthenticationProvider;

    public SecurityConfiguration(ClientAuthenticationProvider clientAuthenticationProvider) {
        this.clientAuthenticationProvider = clientAuthenticationProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/bundle.js", "/login**","/images/**").permitAll()
                .anyRequest().authenticated()
                .and().formLogin().loginPage("/login")
                .failureHandler((request, response, exception)->{
                            response.addHeader("Autherror", exception.getMessage());
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        })
                .and().logout()
                .and().sessionManagement().disable();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.authenticationProvider(clientAuthenticationProvider);
    }
}
