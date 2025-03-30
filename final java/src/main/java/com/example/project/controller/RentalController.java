package com.example.project.controller;

import com.example.project.dto.CarDTO;
import com.example.project.dto.RentalDTO;
import com.example.project.model.*;
import com.example.project.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("api/rental")
@RestController
@CrossOrigin
public class RentalController {

    private final CarRepository carRepository;
    private final UsersRepository usersRepository;
    private final AvailableRepository availableRepository;
    private RentalRepository rentalRepository;
    private MapStruct mapper;
    private  RentalMapStruct rentalMapStruct;
    public RentalController(RentalMapStruct rentalMapStruct,MapStruct mapper,AvailableRepository availableRepository, RentalRepository rentalRepository, CarRepository carRepository, UsersRepository usersRepository)
    {
        this.rentalRepository = rentalRepository;
        this.carRepository = carRepository;
        this.usersRepository=usersRepository;
        this.availableRepository=availableRepository;
        this.mapper=mapper;
        this.rentalMapStruct=rentalMapStruct;
    }

    @GetMapping("/getRentals")
    public ResponseEntity<List<Rental>> getRentals() {
        List<Rental> rental=rentalRepository.findAll();
        if(rental.isEmpty())
            return ResponseEntity.status(HttpStatus.OK).body(null);
         return ResponseEntity.status(HttpStatus.OK).body(rental);
    }

    @PostMapping("/addRental")
    public ResponseEntity<Rental> addRental(@RequestBody RentalDTO rentalDTO) throws IOException {


        Rental  rental=rentalMapStruct.DTOToRental(rentalDTO);
        System.out.println("rental renter"+rental.getRenter().getName());

        Car rentCar=carRepository.findById(rental.getCar().getCarId()).orElse(null);
        if(rentCar==null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        rental.setCar(rentCar);
        Users renterUser=usersRepository.findById(rental.getRenter().getUserId()).orElse(null);
        if(renterUser==null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        rental.setRenter(renterUser);
       Rental newR= rentalRepository.save(rental);
        List<Available>  period=  rentalDTO.getRentalPeriod();
    for(Available available:period){

        available.setRental(newR);
        available.setStatus(Available.Status.booked);
    }


        availableRepository.saveAll(period);
       return ResponseEntity.status(HttpStatus.OK).body(newR);
    }

    @DeleteMapping("/deleteRental/{id}")
    public ResponseEntity<String> deleteRental(@PathVariable Long id) {
      rentalRepository.deleteById(id);
        return ResponseEntity.ok("Rntal successfully deleted");
    }

    @PutMapping("/updateRental/{id}")
    public ResponseEntity<Rental> updateReview( @RequestBody Rental rental,@PathVariable Long id) {
        Rental existingRental = rentalRepository.findById(id).orElse(null);
        if (existingRental == null) {
            return ResponseEntity.status(404).body(null);
        }
        if (rental.getSt() != null) {
            existingRental.setSt(rental.getSt());
        }
        Rental savedRental = rentalRepository.save(existingRental);
        System.out.println(savedRental.getSt());
        return ResponseEntity.ok(savedRental);
    }





}
