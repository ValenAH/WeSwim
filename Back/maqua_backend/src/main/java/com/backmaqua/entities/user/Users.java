package com.demo.entity.User;

import java.util.ArrayList;
import java.util.List;

public class Users {

	private List<User> userList;
	
	public List<User> getUsersList(){
		if( userList == null) {
			userList = new ArrayList<>();
		}
		return userList;
	}
	
	public void setUserList(List<User> userList) {
        this.userList = userList;
    }
	
}
