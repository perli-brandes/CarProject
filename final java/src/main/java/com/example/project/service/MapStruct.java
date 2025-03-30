package com.example.project.service;

import com.example.project.dto.CarDTO;
import com.example.project.dto.RentalDTO;
import com.example.project.model.Car;
import com.example.project.model.Rental;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStruct {

    List<CarDTO> CarsToDTO(List<Car> cars);

    default CarDTO CarToDTO(Car car) throws IOException {
        CarDTO carDTO=new CarDTO();
        carDTO.setCarId(car.getCarId());
        carDTO.setCarYear(car.getCarYear());
        carDTO.setLocation(car.getLocation());
        carDTO.setModel(car.getModel());
        carDTO.setOwner(car.getOwner());
        carDTO.setDayRate(car.getDayRate());
        carDTO.setLicensePlate(car.getLicensePlate());
        carDTO.setAvailable(car.getAvailable());



        List<byte[]> images = new ArrayList<>();

        for (String imageUrl : car.getImageUrls()) {
            Path filePath = Paths.get(imageUrl);
            images.add(Files.readAllBytes(filePath));
        }

        carDTO.setImages(images);
        return carDTO;
    }



}
