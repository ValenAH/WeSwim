package com.demo.repository.User;

import org.springframework.stereotype.Repository;

import com.demo.entity.User.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Repository
@RepositoryRestResource(collectionResourceRel = "users", path ="users")


public interface UserCRUDRepository extends CrudRepository<User, Long>{

}
