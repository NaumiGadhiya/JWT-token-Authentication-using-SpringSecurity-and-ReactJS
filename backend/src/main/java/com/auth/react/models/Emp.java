package com.auth.react.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "emprole")
@Entity
public class Emp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id")
    private int id;

    @Column(name = "emp_username")
    private String username;

    @Column(name = "emp_email")
    private String email;

    @Column(name = "emp_pwd")
    private String password;

    @Column(name = "emp_role")
    private String role;

}
