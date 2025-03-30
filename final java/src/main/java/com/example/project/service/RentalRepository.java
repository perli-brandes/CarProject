package com.example.project.service;

import com.example.project.dto.RentalDTO;
import com.example.project.model.Available;
import com.example.project.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {


}
