package com.demo.repository.User;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.demo.entity.User.User;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserQUERYRepository extends PagingAndSortingRepository<User, Long>{
	//List<User> findByFirstName(@Param("name") String name);
}