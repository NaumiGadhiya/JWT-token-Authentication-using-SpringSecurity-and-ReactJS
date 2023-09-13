package com.auth.react.repository;

import com.auth.react.models.Emp;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface EmpRepo extends CrudRepository<Emp, Integer> {

//    Emp findByUsername(String username);

    Optional<Emp> findByUsername(String username);
    Emp findByRole(String role);

}
