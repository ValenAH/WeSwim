package com.backmaqua.controller.transaction;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.backmaqua.entities.transaction.Transaction;
import com.backmaqua.entities.transaction.Transactions;
import com.backmaqua.repository.transaction.TransactionCRUDRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/transactionAPI")
public class TransactionController {
	@Autowired
	private TransactionCRUDRepository transactionRepository;
	
	@GetMapping(path="getAllTransactions",produces = "application/json")
	public Transactions getAllTransactionsApi() {
		Transactions response = new Transactions();
		ArrayList<Transaction> list = new ArrayList<>();
		transactionRepository.findAll().forEach(e -> list.add(e));
		response.setTransactionList(list);
		return response;
	}
	
	@GetMapping(path="/getTransactionByUser/{idUser}",produces = "application/json")
    public List<Transaction> getTransactionsByUserId(@PathVariable String idUser) {
		List<Transaction> transactions = transactionRepository.findByIdUser(idUser);
        return transactions;
    }
	
    @PostMapping(path= "/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addNewTransaction(@RequestBody Transaction transaction) {
        
        if(transaction.getId() != null) {
            return ResponseEntity.badRequest().body("Id must be null");
        }

        // Saving the transaction, id will be generated automatically
        transaction = transactionRepository.save(transaction);
                
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(transaction.getId())
            .toUri();
        
        //Send location in response
        return ResponseEntity.created(location).build();
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path= "/updatetransaction", consumes = "application/json", produces = "application/json")
	public Transaction updateTransaction(@RequestBody Transaction transaction) {
        //add resource
    	transactionRepository.save(transaction);
		return transaction;
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/transactionremove", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deleteTransactionApi(@RequestBody Transaction transaction) {
		transactionRepository.deleteById(transaction.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
