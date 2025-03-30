package com.example.project.controller;

import com.example.project.model.Available;
import com.example.project.model.Car;
import com.example.project.model.Rental;
import com.example.project.service.AvailableRepository;
import com.example.project.service.CarRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/available")
@RestController
@CrossOrigin
public class AvailableController {

    private final CarRepository carRepository;

    private AvailableRepository availableRepository;

    public AvailableController(AvailableRepository availableRepository, CarRepository carRepository) {
        this.availableRepository = availableRepository;
        this.carRepository=carRepository;
    }
    @GetMapping("/getAvailables")
    public ResponseEntity<List<Available>> getAvailables() {
        List<Available> availables = availableRepository.findAll();
        return ResponseEntity.ok(availables);
    }

    @PostMapping("/addAvailable")
    public ResponseEntity<Available> addAvailable(@RequestBody Available available) {
        System.out.println("new avail: "+available.getStartDate());
        Car car=carRepository.findById(available.getCar().getCarId()).orElse(null);
        if(car==null) {
            System.out.println("car is null");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        available.setCar(car);
        available.setStatus(Available.Status.active);
        Available saved = availableRepository.save(available);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

   @PutMapping("/updateAvailable/{id}")
   public ResponseEntity<Available> updateAvailable(@RequestBody Available available, @PathVariable Long id) {
      Available existingAvail=availableRepository.findById(id).orElse(null);
      if(existingAvail==null) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
      }
      if(available.getStartDate()!=existingAvail.getStartDate())
          existingAvail.setStartDate(available.getStartDate());
      if(available.getEndDate()!=existingAvail.getEndDate())
          existingAvail.setEndDate(available.getEndDate());
      if(available.getStatus()!=existingAvail.getStatus())
          existingAvail.setStatus(available.getStatus());
       System.out.println("status apdate "+existingAvail.getStatus());
       Available saved=availableRepository.save(existingAvail);
       return ResponseEntity.status(HttpStatus.OK).body(saved);
   }

    @DeleteMapping("/deletAvailable/{id}")

    public ResponseEntity<Long> deleteCar(@PathVariable Long id) {
        System.out.println("delete Avail id: "+id);
       Available available=availableRepository.findById(id).orElse(null);


        if(available==null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        availableRepository.delete(available);
        return ResponseEntity.ok(id);
    }
    @PutMapping("/updateAvailableRental")
    public void updateAvailableRental(@RequestBody List<Available> available, Rental rent) {
        for(Available ava:available) {
            ava.setRental(rent);
        }

    }

}


