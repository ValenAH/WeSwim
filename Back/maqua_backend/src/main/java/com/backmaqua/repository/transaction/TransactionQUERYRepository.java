package com.backmaqua.repository.transaction;

import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.backmaqua.entities.transaction.Transaction;


@RepositoryRestResource(collectionResourceRel = "transactions", path = "transactions")
public interface TransactionQUERYRepository extends PagingAndSortingRepository<Transaction, Long>{
	//List<AccountType> findByFirstName(@Param("name") String name);
}