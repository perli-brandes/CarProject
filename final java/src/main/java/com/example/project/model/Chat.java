package com.example.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Chat {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Users carOwner;

    @ManyToOne
    private Users renter;

    @JsonIgnore
    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    private List<Message> messages ;

    private LocalDateTime createdAt;



    public Chat() {
    }



    public Chat(Long id, Users carOwner, Users renter, List<Message> messages, LocalDateTime createdAt) {
        this.id = id;
        this.carOwner = carOwner;
        this.renter = renter;
        this.messages = messages;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getCarOwner() {
        return carOwner;
    }

    public void setCarOwner(Users carOwner) {
        this.carOwner = carOwner;
    }

    public Users getRenter() {
        return renter;
    }

    public void setRenter(Users renter) {
        this.renter = renter;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

