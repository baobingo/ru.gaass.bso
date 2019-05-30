package ru.gaass.bso.customassistantui;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@EnableZuulProxy
@SpringBootApplication
@Controller
public class CustomassistantuiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomassistantuiApplication.class, args);
	}

	@RequestMapping(value = "/{[path:[^\\.]*}")
	public String forward() {
		return "forward:/";
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
