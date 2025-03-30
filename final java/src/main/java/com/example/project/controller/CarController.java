package com.example.project.controller;

import com.example.project.dto.CarDTO;
import com.example.project.model.Available;
import com.example.project.model.Car;
import com.example.project.model.Rental;
import com.example.project.model.Users;
import com.example.project.service.*;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequestMapping("api/car")
@RestController
@CrossOrigin
public class CarController {
    public static String DIRECTORY_URL=System.getProperty("user.dir")+"\\images\\";
    private final UsersRepository usersRepository;
    private final AvailableRepository availableRepository;
    private final RentalRepository rentalRepository;
    private MapStruct mapper;
    private CarRepository carRepository;
    public CarController(CarRepository carRepository, UsersRepository usersRepository, MapStruct mapper, AvailableRepository availableRepository, RentalRepository rentalRepository) {
        this.carRepository = carRepository;
        this.usersRepository=usersRepository;
        this.availableRepository=availableRepository;
        this.mapper=mapper;
        this.rentalRepository = rentalRepository;
    }
@GetMapping("/getCars")
    public ResponseEntity<List<CarDTO>> getCars() {
        List<Car> cars = carRepository.findAll();
        if(cars.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(mapper.CarsToDTO(cars));

}
@PostMapping("/addCar")
    public ResponseEntity<CarDTO> addCar(@RequestPart("car") Car car,@RequestPart("images") List<MultipartFile> files) throws IOException {
    System.out.println("car"+car.getOwner().getUserId()+"car model"+car.getModel());
   if(car==null){
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
   }
        Users carOwner=usersRepository.findById(car.getOwner().getUserId()).orElse(null);
        if (carOwner==null)
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

    car.setOwner(carOwner);

    car.setImageUrls(carRepository.Pic(files));


CarDTO newCar=mapper.CarToDTO(carRepository.save(car));


        return ResponseEntity.status(HttpStatus.CREATED).body(newCar);

}
@DeleteMapping("/deletCar/{id}")
public ResponseEntity<Long> deleteCar(@PathVariable Long id) {
    Car car=carRepository.findById(id).orElse(null);
    if(car==null)
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    carRepository.deleteById(id);
    return ResponseEntity.status(HttpStatus.OK).body(id);
}
@PutMapping("/Update/{id}")
    public ResponseEntity<CarDTO> updateCar(@PathVariable Long id,@RequestBody Car newCar) throws IOException {
        Car existingcar=carRepository.findById(id).orElse(null);
        if(existingcar==null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        if(newCar.getDayRate()!=null)
            existingcar.setDayRate(newCar.getDayRate());

        if(newCar.getLocation()!=null)
            existingcar.setLocation(newCar.getLocation());
        Car saved=carRepository.save(existingcar);
        CarDTO dtoC=mapper.CarToDTO(saved);
        return ResponseEntity.status(HttpStatus.OK).body(dtoC);

}


@GetMapping("/getDTO/{id}")
    public  ResponseEntity<CarDTO> getDTO(@PathVariable Long id) throws IOException {
        return new ResponseEntity<>(mapper.CarToDTO(carRepository.findById(id).orElse(null)),HttpStatus.OK);
}



}
