package com.example.project.controller;

import com.example.project.model.Users;
import com.example.project.service.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/users")
@RestController
@CrossOrigin
public class UsersController {
    private UsersRepository usersRepository;
    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<Users> signIn(@RequestBody Users user) {
        Users existingUser = usersRepository.findByEmail(user.getEmail());
        if (existingUser != null) {

            return ResponseEntity.status(409).body(null);
        }


       Users saved= usersRepository.save(user);
        return  ResponseEntity.status(201).body(saved);
    }

    @PostMapping("/logIn")
     public ResponseEntity<Users> logIn(@RequestBody Users user) {
        Users existingUser = usersRepository.findByEmail(user.getEmail());
        if(existingUser==null) {
            return ResponseEntity.status(404).body(null);
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body(null);
        }

        return ResponseEntity.status(200).body(existingUser);
    }

    @DeleteMapping("/deletUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<Users> user=usersRepository.findById(id);
        if (user.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        usersRepository.deleteById(id);

        return ResponseEntity.ok("Account successfully deleted");
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users updatedUser) {
        System.out.println("name: "+updatedUser.getName()+" email: "+updatedUser.getEmail());
        Users existingUser = usersRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.status(404).body(null);
        }
        //עדכון פרטים במידה ויש שינוי
        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getPassword() != null) {
            existingUser.setPassword(updatedUser.getPassword());
        }
        if(updatedUser.getPhone()!=null){
            existingUser.setPhone(updatedUser.getPhone());
        }
        if(updatedUser.getDriverLicenseNumber()!=null){
            existingUser.setDriverLicenseNumber(updatedUser.getDriverLicenseNumber());
        }
        if(updatedUser.getLicenseExpiryDate()!=null){
            existingUser.setLicenseExpiryDate(updatedUser.getLicenseExpiryDate());
        }
        if(updatedUser.getType()!=null){
            existingUser.setType(updatedUser.getType());
        }

        Users savedUser = usersRepository.save(existingUser);

        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/getUsers")
  public ResponseEntity<List<Users>> getAllUsers(){
        List<Users> users = usersRepository.findAll();

        return ResponseEntity.ok(users);

    }

    @GetMapping("/getUserDetails/{id}")
    public ResponseEntity<Optional<Users>> getUserDetails(@PathVariable Long id) {
        Optional<Users> user = usersRepository.findById(id);
        if(user==null)
            return ResponseEntity.status(404).body(null);
        return ResponseEntity.ok(user);

    }

    }
