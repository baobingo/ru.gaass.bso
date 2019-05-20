package ru.gaass.bso.customassistantapi.bee.changelog.security;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ru.gaass.bso.customassistantapi.domain.security.Role;
import ru.gaass.bso.customassistantapi.domain.security.UserAccount;

@ChangeLog
public class SecurityChangelog {

    @ChangeSet(order = "001", id = "userFillout", author = "baobingo")
    public void userFillout(MongoTemplate mongoTemplate) {
        BCryptPasswordEncoder bCryptPasswordEncoder =  new BCryptPasswordEncoder();

        UserAccount user = new UserAccount("user", bCryptPasswordEncoder.encode("password"));
        Role userRole = new Role("ROLE_USER");
        mongoTemplate.insert(userRole);
        user.addRoles(userRole);
        mongoTemplate.insert(user);

        UserAccount admin = new UserAccount("admin", bCryptPasswordEncoder.encode("password"));
        Role adminRole = new Role("ROLE_ADMIN");
        mongoTemplate.insert(adminRole);
        admin.addRoles(adminRole);
        admin.addRoles(userRole);
        mongoTemplate.insert(admin);
    }
}