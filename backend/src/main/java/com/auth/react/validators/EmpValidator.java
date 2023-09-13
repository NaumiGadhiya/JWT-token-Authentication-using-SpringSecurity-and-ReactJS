package com.auth.react.validators;

import com.auth.react.models.Emp;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;

@Component
public class EmpValidator {

        public boolean supports(Class<?> clazz) {
            return Emp.class.equals(clazz);
        }

        public void validate(Object target, Errors errors) {
            Emp emp = (Emp) target;

            ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "field.required", "username is required.");
            ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "field.required", "email is required.");
            ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "field.required", "password is required.");

            if(emp.getUsername().equals("")||emp.getUsername()==null){
                errors.rejectValue("username", "field.invalid", "username is required.");
            }
            else {
                if (!emp.getUsername().matches("^[a-zA-Z\\s]+$")) {
                    errors.rejectValue("username", "field.invalid", "username is in invalid format. It accepts only alphabets.");
                }
            }


            if(emp.getEmail().equals("")||emp.getEmail()==null){
                errors.rejectValue("email", "field.invalid", "email is required.");
            }
            else {
                if (!emp.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                    errors.rejectValue("email", "field.invalid", "Invalid email format.");
                }
            }

            if(emp.getPassword().equals("")||emp.getPassword()==null){
                errors.rejectValue("password", "field.invalid", "password is required.");
            }

        }
}
