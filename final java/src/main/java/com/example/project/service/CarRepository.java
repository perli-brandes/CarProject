package com.example.project.service;

import com.example.project.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static com.example.project.controller.CarController.DIRECTORY_URL;

public interface CarRepository extends JpaRepository<Car, Long> {

    public  default List<String> Pic(List<MultipartFile> files)throws IOException {
        List<String> imageUrls = new ArrayList<>();
        for(MultipartFile file:files){
            String imageUrl=DIRECTORY_URL+file.getOriginalFilename();

            Path filePath= Paths.get(imageUrl);

            Files.write(filePath,file.getBytes());
            imageUrls.add(imageUrl);
        }
        return imageUrls;
    }
}
