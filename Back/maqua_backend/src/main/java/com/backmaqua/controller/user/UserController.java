package com.demo.controller.User;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.demo.entity.User.User;
import com.demo.entity.User.Users;
import com.demo.repository.User.UserCRUDRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserCRUDRepository userRepository;
	
	@GetMapping(path="getAllUsers", produces = "application/json")
	public Users getUsers() {
		Users response = new Users();
		ArrayList<User> list = new ArrayList<>();
		userRepository.findAll().forEach(user -> list.add(user));
		response.setUserList(list);
		return response;
	}
	
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addNewUser", consumes = "application/json", produces = "application/json")
	public User addNewUser(@RequestBody User user) {
        //add resource
     	user = userRepository.save(user);
		return user;
	}
	
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/updateUser", consumes = "application/json", produces = "application/json")
	public User updateUser(@RequestBody User user) {
        //add resource
     	userRepository.save(user);
		return user;
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/removeUser", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deleteUser(@RequestBody User user) {
		userRepository.deleteById(user.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@PostMapping(path= "/addUser", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addUser(@RequestBody User user) {       
        //add resource
    	user = userRepository.save(user);
        //Create resource location
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                    .path("/{id}")
                                    .buildAndExpand(user.getId())
                                    .toUri();
        //Send location in response
        return ResponseEntity.created(location).build();
    }
    
}
