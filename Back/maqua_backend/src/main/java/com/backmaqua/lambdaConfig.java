package com.backmaqua;
import com.backmaqua.entities.teacher.Teacher;
import com.backmaqua.entities.teacher.Teachers;
import com.backmaqua.entities.user.User;
import com.backmaqua.entities.user.Users;
import com.backmaqua.functions.TeacherFunctions;
import com.backmaqua.functions.UserFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.function.Function;

@Configuration
public class lambdaConfig {

        private final UserFunctions userFunctions;
        private final TeacherFunctions teacherFunctions;

        public lambdaConfig(UserFunctions userFunctions, TeacherFunctions teacherFunctions) {
            this.userFunctions = userFunctions;
            this.teacherFunctions = teacherFunctions;
        }

        // Registro de las funciones del usuario
        @Bean
        public Function<Void, Users> getAllUsers() {
            return userFunctions.getAllUsers();
        }

        @Bean
        public Function<Long, User> getUserById() {
            return userFunctions.getUserById();
        }

        @Bean
        public Function<User, User> addNewUser() {
            return userFunctions.addNewUser();
        }

        @Bean
        public Function<User, User> updateUser() {
            return userFunctions.updateUser();
        }

        @Bean
        public Function<User, String> deleteUser() {
            return userFunctions.deleteUser();
        }

        // Registro de las funciones de teacher
        @Bean
        public Function<Void, Teachers> getAllTeachers() {
            return teacherFunctions.getAllTeachers();
        }

        @Bean
        public Function<Long, Teacher> getTeacherById() {
            return teacherFunctions.getTeacherById();
        }


}
