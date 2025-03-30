package com.example.project.model;

import jakarta.persistence.*;

@Entity
public class Review {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne

    private Car car;
    @ManyToOne
    private Users userReview;
    private String comment;
    private int rating;



    public Review() {
    }


    public Review(Long id, Car car, Users userReview, String comment, int rating) {
        this.id = id;
        this.car = car;
        this.userReview = userReview;
        this.comment = comment;
        this.rating = rating;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car carId) {
        this.car= carId;
    }

    public Users getUserReview() {
        return userReview;
    }

    public void setUserReview(Users userReview) {
        this.userReview = userReview;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
