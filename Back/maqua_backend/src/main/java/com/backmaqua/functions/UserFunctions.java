package com.backmaqua.functions;

import com.backmaqua.entities.user.User;
import com.backmaqua.entities.user.Users;
import com.backmaqua.repository.user.UserCRUDRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.function.Function;

@Component
public class UserFunctions {

    private final UserCRUDRepository userRepository;

    public UserFunctions(UserCRUDRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Function<Void, Users> getAllUsers() {
        return (Void) -> {
            Users response = new Users();
            ArrayList<User> list = new ArrayList<>();
            userRepository.findAll().forEach(user -> list.add(user));
            response.setUserList(list);
            return response;
        };
    }

    public Function<Long, User> getUserById() {
        return (id) -> userRepository.findById(id).orElse(null);
    }

    public Function<User, User> addNewUser() {
        return (user) -> userRepository.save(user);
    }

    public Function<User, User> updateUser() {
        return (user) -> userRepository.save(user);
    }

    public Function<User, String> deleteUser() {
        return (user) -> {
            userRepository.deleteById(user.getId());
            return "User deleted";
        };
    }
}
