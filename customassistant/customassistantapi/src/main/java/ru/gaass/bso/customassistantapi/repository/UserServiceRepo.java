package ru.gaass.bso.customassistantapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.gaass.bso.customassistantapi.domain.security.UserAccount;

public interface UserServiceRepo extends MongoRepository<UserAccount, Long> {
    UserAccount findByUsername(String username);
}
