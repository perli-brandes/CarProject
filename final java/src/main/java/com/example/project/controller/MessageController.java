package com.example.project.controller;

import com.example.project.model.Chat;
import com.example.project.model.Message;
import com.example.project.model.Users;
import com.example.project.service.ChatRepository;
import com.example.project.service.MessageRepository;
import com.example.project.service.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/message")
@RestController
@CrossOrigin
public class MessageController {
    private final UsersRepository usersRepository;
    private final ChatRepository chatRepository;
    private MessageRepository messageRepository;
    public MessageController(MessageRepository messageRepository, UsersRepository usersRepository, ChatRepository chatRepository)
    {
        this.chatRepository=chatRepository;
        this.messageRepository = messageRepository;
        this.usersRepository=usersRepository;
    }

    @GetMapping("/getMessages")
    public ResponseEntity<List<Message>> getMessages(){
        List<Message> messages = messageRepository.findAll();
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/addMessage")
    public ResponseEntity<Message> addMessage(@RequestBody Message message){

        Users sender=usersRepository.findById(message.getSender().getUserId()).orElse(null);
        if(sender==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        message.setSender(sender);
        Chat chat=chatRepository.findById(message.getChat().getId()).orElse(null);
        if(chat==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        message.setChat(chat);
      Message saved=  messageRepository.save(message);
      return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/deleteMessage/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id){
        Message message=messageRepository.findById(id).orElse(null);
        if (message==null) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Massege not found");
        }
        messageRepository.deleteById(id);

        return ResponseEntity.ok("Account successfully deleted");
    }

    @PutMapping("/updateMessage/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable Long id, @RequestBody Message message){
        Message existingMes = messageRepository.findById(id).orElse(null);
        if (existingMes == null) {
            return ResponseEntity.status(404).body(null);
        }
        if(!message.getContent().equals(existingMes.getContent())) {
            existingMes.setContent(message.getContent());
        }

        Message saved = messageRepository.save(existingMes);

        return ResponseEntity.ok(saved);
    }
}
