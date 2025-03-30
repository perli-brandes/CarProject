package com.example.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Users {
    public enum licenseType{
    car,bus,motorcycle,other
}
    @Id
    @GeneratedValue
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String password;
    private String driverLicenseNumber;
    private LocalDate licenseExpiryDate;
    private  licenseType type;


  @OneToMany(mappedBy="owner")
   @JsonIgnore
    private List<Car> cars;

    @JsonIgnore
    @OneToMany(mappedBy = "renter")
    private List<Rental> rent;

    @JsonIgnore
    @OneToMany(mappedBy = "userReview")
    private List<Review>reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "renter")
    private List<Chat> renterChat;

    @JsonIgnore
    @OneToMany(mappedBy = "carOwner")
    private List<Chat> ownerChat;

    @JsonIgnore
    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    private List<Message> sentMessages;


    public Users() {
    }




    public Users(Long userId, String name, String email, String phone, String driverLicenseNumber, LocalDate licenseExpiryDate, licenseType type, List<Car> cars, List<Rental> rent, List<Review> reviews, List<Chat> renterChat, List<Chat> ownerChat, List<Message> sentMessages,String password) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.driverLicenseNumber = driverLicenseNumber;
        this.licenseExpiryDate = licenseExpiryDate;
        this.type = type;
        this.cars = cars;
        this.rent = rent;
        this.reviews = reviews;
        this.renterChat = renterChat;
        this.ownerChat = ownerChat;
        this.sentMessages = sentMessages;
        this.password = password;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDriverLicenseNumber() {
        return driverLicenseNumber;
    }

    public void setDriverLicenseNumber(String driverLicenseNumber) {
        this.driverLicenseNumber = driverLicenseNumber;
    }

    public LocalDate getLicenseExpiryDate() {
        return licenseExpiryDate;
    }

    public void setLicenseExpiryDate(LocalDate licenseExpiryDate) {
        this.licenseExpiryDate = licenseExpiryDate;
    }

    public licenseType getType() {
        return type;
    }

    public void setType(licenseType type) {
        this.type = type;
    }

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }

    public List<Rental> getRent() {
        return rent;
    }

    public void setRent(List<Rental> rent) {
        this.rent = rent;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Chat> getRenterChat() {
        return renterChat;
    }

    public void setRenterChat(List<Chat> renterChat) {
        this.renterChat = renterChat;
    }

    public List<Chat> getOwnerChat() {
        return ownerChat;
    }

    public void setOwnerChat(List<Chat> ownerChat) {
        this.ownerChat = ownerChat;
    }

    public List<Message> getSentMessages() {
        return sentMessages;
    }

    public void setSentMessages(List<Message> sentMessages) {
        this.sentMessages = sentMessages;
    }
}

