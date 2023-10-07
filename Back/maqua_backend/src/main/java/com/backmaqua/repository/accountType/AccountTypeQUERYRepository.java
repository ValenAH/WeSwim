package com.backmaqua.repository.accountType;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.backmaqua.entities.accountType.AccountType;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface AccountTypeQUERYRepository extends PagingAndSortingRepository<AccountType, Long>{
	//List<AccountType> findByFirstName(@Param("name") String name);
}