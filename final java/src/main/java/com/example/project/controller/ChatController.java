package com.example.project.controller;

import com.example.project.model.Chat;
import com.example.project.model.Users;
import com.example.project.service.ChatRepository;
import com.example.project.service.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/chat")
@RestController
@CrossOrigin
public class ChatController {


    private final UsersRepository usersRepository;
    private ChatRepository chatRepository;

    public ChatController(ChatRepository chatRepository, UsersRepository usersRepository)
    {
        this.usersRepository=usersRepository;
        this.chatRepository = chatRepository;
    }

    @GetMapping("/getChats")
    public ResponseEntity<List<Chat>> getChats() {
        List<Chat> chats = chatRepository.findAll();
        return ResponseEntity.ok(chats);
    }

    @PostMapping("/addChat")
    public ResponseEntity<Chat> addChat(@RequestBody Chat chat) {
        Users carOwner=usersRepository.findById(chat.getCarOwner().getUserId()).orElse(null);
        if(carOwner==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        chat.setCarOwner(carOwner);
        Users renter=usersRepository.findById(chat.getRenter().getUserId()).orElse(null);
        if(renter==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        chat.setRenter(renter);
        Chat newChat= chatRepository.save(chat);
        System.out.println("id of new chat: "+newChat.getId());
        return ResponseEntity.status(HttpStatus.OK).body(newChat);
    }

    @DeleteMapping("/deleteChat/{id}")
    public ResponseEntity<String> deleteChat(@PathVariable Long id) {
        Chat chat=chatRepository.findById(id).orElse(null);
        if(chat==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("chat not found");
        }
        chatRepository.delete(chat);
        return ResponseEntity.status(HttpStatus.OK).body("chat deleted");

    }
}
