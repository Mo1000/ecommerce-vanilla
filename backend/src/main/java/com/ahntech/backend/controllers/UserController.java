package com.ahntech.backend.controllers;

import com.ahntech.backend.dtos.ChangePasswordDto;
import com.ahntech.backend.dtos.UserDto;
import com.ahntech.backend.entities.User;
import com.ahntech.backend.models.MessageResponse;
import com.ahntech.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/users")
@Slf4j
@RequiredArgsConstructor
@Validated
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserController {


    private final UserService userService;

    @PatchMapping
    public ResponseEntity<MessageResponse> changePassword(
            @RequestBody ChangePasswordDto request,
            Principal connectedUser
    ) {
       return userService.changePassword(request, connectedUser);

    }

    @GetMapping("/allUsers")
    List<User> getUsers() {
        return userService.getAllUser();
    }

    @GetMapping
    User getUser() {
        return userService.getUser();
    }

    @GetMapping(path = "/{userId}")
    User getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }


    @PostMapping
    ResponseEntity<MessageResponse> addUser(@Valid @RequestBody UserDto newUser) {
        return this.userService.addUser(newUser);
    }

    @PostMapping("/many")
    HttpEntity<MessageResponse> addManyUser(@RequestBody List<@Valid UserDto> userList) {

        return this.userService.addManyUser(userList);
    }

    @DeleteMapping(path = "/{userId}")
    Boolean deleteUser(@PathVariable("userId") String userId) throws Exception {
        return this.userService.deleteUser(userId);
    }

    @DeleteMapping(path = "/all")
    Boolean deleteUser(List<String> usersIDList) throws Exception {
        return this.userService.deleteUserList(usersIDList);
    }

}
