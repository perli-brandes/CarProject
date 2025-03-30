package com.example.project.service;

import com.example.project.model.Car;
import com.example.project.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

List<Review> findByCar(Optional<Car> car);
}
