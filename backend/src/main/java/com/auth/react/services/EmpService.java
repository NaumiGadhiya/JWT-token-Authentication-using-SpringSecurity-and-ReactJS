package com.auth.react.services;

import com.auth.react.models.Emp;
import com.auth.react.models.EmpDetails;
import com.auth.react.repository.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmpService implements UserDetailsService {

    @Autowired
    private EmpRepo empRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Emp> emp=empRepo.findByUsername(username);
        GrantedAuthority authority = new SimpleGrantedAuthority(emp.get().getRole());
        List<GrantedAuthority> authorityList = new ArrayList<GrantedAuthority>();
        authorityList.add(authority);


        return new org.springframework.security.core.userdetails.User(emp.get().getUsername(), emp.get().getPassword(), authorityList);
    }


}