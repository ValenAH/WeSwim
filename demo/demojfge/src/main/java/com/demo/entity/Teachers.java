package com.demo.entity;

import java.util.ArrayList;
import java.util.List;

public class Teachers {

private List<Teacher> TeacherList;
    
    public List<Teacher> getTeacherList() {
        if(TeacherList == null) {
            TeacherList = new ArrayList<>();
        }
        return TeacherList;
    }
 
    public void setTeacherList(List<Teacher> TeacherList) {
        this.TeacherList = TeacherList;
    }
	
	
	
}
