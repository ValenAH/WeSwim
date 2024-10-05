package com.backmaqua.functions;

import com.backmaqua.entities.teacher.Teacher;
import com.backmaqua.entities.teacher.Teachers;
import com.backmaqua.repository.teacher.TeacherCRUDRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.function.Function;

@Component
public class TeacherFunctions {

    private final TeacherCRUDRepository teacherRepository;

    public TeacherFunctions(TeacherCRUDRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Function<Void, Teachers> getAllTeachers() {
        return (Void) -> {
            Teachers response = new Teachers();
            ArrayList<Teacher> list = new ArrayList<>();
            teacherRepository.findAll().forEach(teacher -> list.add(teacher));
            response.setTeacherList(list);
            return response;
        };
    }

    public Function<Long, Teacher> getTeacherById() {
        return (id) -> teacherRepository.findById(id).orElse(null);
    }

    public Function<Teacher, Teacher> addNewTeacher() {
        return (teacher) -> teacherRepository.save(teacher);
    }

    public Function<Teacher, Teacher> updateTeacher() {
        return (teacher) -> teacherRepository.save(teacher);
    }

    public Function<Teacher, String> deleteTeacher() {
        return (teacher) -> {
            teacherRepository.deleteById(teacher.getId());
            return "Teacher deleted";
        };
    }
}
