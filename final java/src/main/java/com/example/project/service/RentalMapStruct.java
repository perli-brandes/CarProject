package com.example.project.service;

import com.example.project.dto.CarDTO;
import com.example.project.dto.RentalDTO;
import com.example.project.model.Car;
import com.example.project.model.Rental;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface RentalMapStruct {





default Rental DTOToRental(RentalDTO rentalDTO) throws IOException {
   Rental newRental=new Rental();
   newRental.setCar(rentalDTO.getCar());
   newRental.setSt(rentalDTO.getSt());
   newRental.setRenter(rentalDTO.getRenter());
   newRental.setTotalPrice(rentalDTO.getTotalPrice());

   return  newRental;
}


}
