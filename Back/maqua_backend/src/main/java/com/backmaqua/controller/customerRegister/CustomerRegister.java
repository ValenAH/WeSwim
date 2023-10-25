package com.backmaqua.controller.customerRegister;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backmaqua.entities.customer.Customer;
import com.backmaqua.entities.user.User;
import com.backmaqua.repository.customer.CustomerCRUDRepository;
import com.backmaqua.repository.user.UserCRUDRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/registerCustomer")
public class CustomerRegister {
	@Autowired
    private UserCRUDRepository UserCRUDRepository;
    @Autowired
    private CustomerCRUDRepository CustomerCRUDRepository;


    @CrossOrigin(origins = "*")
    @PostMapping(path= "/saveRegister", consumes = "application/json", produces = "application/json")
    public String saveRegister(@ModelAttribute User user, @ModelAttribute Customer customer) {
    	UserCRUDRepository.save(user); // Guarda el usuario
        customer.setUserId(user.getId()); // Establece el ID del usuario en el cliente
        CustomerCRUDRepository.save(customer); // Guarda el cliente con el ID del usuario relacionado
        return "ok"; // Redirige a la página de formulario o a donde desees
    }
}
