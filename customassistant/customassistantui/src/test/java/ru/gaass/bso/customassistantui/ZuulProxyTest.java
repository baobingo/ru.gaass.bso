package ru.gaass.bso.customassistantui;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class ZuulProxyTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @BeforeEach
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }


    @Test
    @WithMockUser("admin")
    public void givenAuthRequestOnPrivateService_shouldSucceedWith200() throws Exception {
        mvc.perform(get("http://localhost:8080/api/").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(content().string("{\r\n" +
                "  \"_links\" : {\r\n" +
                "    \"shipments\" : {\r\n" +
                "      \"href\" : \"http://localhost:8081/api/shipments{?page,size,sort}\",\r\n" +
                "      \"templated\" : true\r\n" +
                "    },\r\n" +
                "    \"userAccounts\" : {\r\n" +
                "      \"href\" : \"http://localhost:8081/api/userAccounts{?page,size,sort}\",\r\n" +
                "      \"templated\" : true\r\n" +
                "    },\r\n" +
                "    \"profile\" : {\r\n" +
                "      \"href\" : \"http://localhost:8081/api/profile\"\r\n" +
                "    }\r\n" +
                "  }\r\n" +
                "}"));
    }
}