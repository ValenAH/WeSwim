package com.backmaqua.controller.accountType;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backmaqua.entities.accountType.AccountType;
import com.backmaqua.entities.accountType.AccountTypes;
import com.backmaqua.repository.accountType.AccountTypeCRUDRepository;

public class AccountTypeController {

	@Autowired
    private AccountTypeCRUDRepository accountTypeRepository;
	@Autowired
	private AccountTypeCRUDRepository accountTypeRepositoryQuery;


    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addAccountType", consumes = "application/json", produces = "application/json")
	public AccountType addNewPaymentPlan(@RequestBody AccountType accountType) {
        //add resource
     	accountType = accountTypeRepository.save(accountType);
		return accountType;
	}
    
    //***Api Final Para FRONT
	@CrossOrigin(origins = "*")
    @GetMapping(path= "/GetAccountType", produces = "application/json")
    public AccountTypes getAllAccountTypes() 
    {
		AccountTypes response = new AccountTypes();
		ArrayList<AccountType> list = new ArrayList<>();
		accountTypeRepository.findAll().forEach(e -> list.add(e));
		response.setAccountTypeList(list);
        return response;
    }
       
    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/updateAccountType", consumes = "application/json", produces = "application/json")
	public AccountType updateAccountType(@RequestBody AccountType accountType) {
        //add resource
		accountTypeRepository.save(accountType);
		return accountType;
	}
    //***Api Final Front
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/AccountTypeRemove", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deleteAccountType(@RequestBody AccountType accountType) {
		accountTypeRepository.deleteById(accountType.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
    
      	
	/* Otras Formas  pero Bajo jUnit Testing*/
	@GetMapping(path="getAllAccountTypes", produces = "application/json")
    public AccountTypes getAccountTypes() 
    {
		AccountTypes response = new AccountTypes();
		ArrayList<AccountType> list = new ArrayList<>();
		accountTypeRepository.findAll().forEach(e -> list.add(e));
		response.setAccountTypeList(list);
        return response;
    }
    
    @PostMapping(path= "/addAccountType", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addAccountType(@RequestBody AccountType accountType) {       
        //add resource
    	accountType = accountTypeRepository.save(accountType);
        //Create resource location
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                    .path("/{id}")
                                    .buildAndExpand(accountType.getId())
                                    .toUri();
        //Send location in response
        return ResponseEntity.created(location).build();
    }
}
