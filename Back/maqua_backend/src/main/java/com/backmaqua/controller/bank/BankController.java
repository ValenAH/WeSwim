package com.backmaqua.controller.bank;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backmaqua.entities.bank.Bank;
import com.backmaqua.entities.bank.Banks;
import com.backmaqua.repository.bank.BankCRUDRepository;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/bankCustomAPI")
public class BankController {
	
	@Autowired
	private BankCRUDRepository bankRepository;
	
	@GetMapping(path="getAllBanksapi",produces = "application/json")
	public Banks getAllBanksApi() {
		Banks response = new Banks();
		ArrayList<Bank> list = new ArrayList<>();
		bankRepository.findAll().forEach(e -> list.add(e));
		response.setBankList(list);
		return response;
	}

	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addnewbankapi", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Object> addNewBankApi(@RequestBody Bank bank) {
		//Esto tiene un problema puesto que si se manda un id que ya existe lo que hace es un update
		bank = bankRepository.save(bank);
				
		URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(bank.getId())
                .toUri();
		//Send location in response
		return ResponseEntity.created(location).build();
	}
	
	@GetMapping(path="/getBank/{id}", produces = "application/json")
    public ResponseEntity<Bank> getBankByIdApi(@PathVariable Long id) {
        Optional<Bank> bank = bankRepository.findById(id);
        
        if (bank.isPresent()) {
            return new ResponseEntity<>(bank.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/updatebank", consumes = "application/json", produces = "application/json")
	public Bank updateBank(@RequestBody Bank bank) {
        //add resource
		bankRepository.save(bank);
		return bank;
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/bankremove", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deleteBankApi(@RequestBody Bank bank) {
		bankRepository.deleteById(bank.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
    
}
