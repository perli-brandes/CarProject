package com.example.project.service;

import com.example.project.model.Available;
import com.example.project.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

public interface AvailableRepository extends JpaRepository<Available, Long> {
 public default void updateAvailStatus(){
     LocalDate today = LocalDate.now();
     List<Available> availables = findAll();
     for (Available available : availables) {
         LocalDate startDate = available.getStartDate();
        Available.Status st= available.getStatus();
         if (startDate.isBefore(today) &&(st==null||!st.equals(Available.Status.booked)) ) {
             available.setStatus(Available.Status.expired);
         }
     }
       saveAll(availables);
 }
}

