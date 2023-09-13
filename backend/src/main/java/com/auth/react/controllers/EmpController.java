package com.auth.react.controllers;

import com.auth.react.models.Emp;
import com.auth.react.models.EmpDetails;
import com.auth.react.models.JwtRequest;
import com.auth.react.models.JwtResponse;
import com.auth.react.repository.EmpRepo;
import com.auth.react.services.EmpService;
import com.auth.react.services.JwtService;
import com.auth.react.validators.EmpValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/emp")
public class EmpController {

    @Autowired
    private EmpRepo empRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmpValidator empValidator;


    @Autowired
    private EmpService empService;

    @GetMapping()
//    @PreAuthorize("hasAuthority('user') || hasAuthority('admin')")
    public List<Emp> getAllEmp(){
        return (List<Emp>) this.empRepo.findAll();
    }

    @GetMapping("{id}")
//    @PreAuthorize("hasAuthority('user') || hasAuthority('admin')")
    public Emp getEmpById(@PathVariable int id){
        Emp emp=this.empRepo.findById(id).get();
        return emp;
    }

    @PostMapping()
    @ResponseBody
//    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<?> processForm(@RequestBody Emp emp, BindingResult result) {

        empValidator.validate(emp, result);

        if (result.hasErrors()) {
            Map<String, String> fieldErrors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                fieldErrors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(fieldErrors);
        }

        emp.setPassword(encoder.encode(emp.getPassword()));
        this.empRepo.save(emp);

        return ResponseEntity.ok("data inserted successfully");
    }


    @PostMapping("/auth")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        Optional<Emp> emp =empRepo.findByUsername(jwtRequest.getUsername());
        UserDetails userDetails=empService.loadUserByUsername(jwtRequest.getUsername());

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
        }catch (Exception ex)
        {
            throw new Exception("Invalid Username and password");
        }

        JwtResponse authResponse = null;
        final String token=  jwtService.generateToken(userDetails,emp);
        authResponse=new JwtResponse(token,emp.get().getId(),emp.get().getUsername(),emp.get().getRole());

        return ResponseEntity.ok(authResponse);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

    @PutMapping("{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('admin') || hasAuthority('user')")
    public ResponseEntity<?> updateEmp(@PathVariable int id, @RequestBody Emp emp, BindingResult result){

        Emp updateEmp=this.empRepo.findById(id).get();
        updateEmp.setUsername(emp.getUsername());
        updateEmp.setEmail(emp.getEmail());
        updateEmp.setPassword(emp.getPassword());
        updateEmp.setRole(emp.getRole());

        empValidator.validate(emp, result);

        if (result.hasErrors()) {
            Map<String, String> fieldErrors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                fieldErrors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(fieldErrors);
        }

        this.empRepo.save(updateEmp);

        return ResponseEntity.ok("data updated successfully");
    }


    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('admin')")
    public String deleteEmp(@PathVariable int id){
        Optional<Emp> getId=empRepo.findById(id);
        if (getId.isPresent()){
            empRepo.deleteById(id);
            return "data deleted successfully.";
        }
        else {
            return "no found data of "+id;
        }
    }

}
