package com.example.project.controller;

import com.example.project.model.Car;
import com.example.project.model.Review;
import com.example.project.model.Users;
import com.example.project.service.CarRepository;
import com.example.project.service.ReviewRepository;
import com.example.project.service.UsersRepository;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/review")
@RestController
@CrossOrigin
public class ReviewController {

    private final CarRepository carRepository;
    private final UsersRepository usersRepository;
    private ReviewRepository reviewRepository;
    public ReviewController(ReviewRepository reviewRepository, CarRepository carRepository, UsersRepository usersRepository) {
        this.reviewRepository = reviewRepository;
        this.carRepository = carRepository;
        this.usersRepository=usersRepository;
    }
    @GetMapping("/getReviews/{id}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long id) {

        Optional<Car> car=carRepository.findById(id);
        List<Review> reviews = reviewRepository.findByCar(car);
        if(reviews.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(reviews);
    }
    @PostMapping("/addReview")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {

        Car revCar=carRepository.findById(review.getCar().getCarId()).orElse(null);

        if(revCar==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        review.setCar(revCar);
       Users user=usersRepository.findById(review.getUserReview().getUserId()).orElse(null);
       if(user==null) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
       }
       review.setUserReview(user);
       Review saved= reviewRepository.save(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    @DeleteMapping("/DeletReview/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok("Review successfully deleted");
    }

    @GetMapping("/getAllReviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        if(reviews.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(reviews);
    }


}
