package com.weatherwear.controller;

import com.weatherwear.model.User;
import com.weatherwear.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // In production, hash the password before saving!
        return userService.registerUser(user);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserProfile(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{username}/preference")
    public User updateClothingPreference(@PathVariable String username, @RequestBody String clothingPreference) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            user.setClothingPreference(clothingPreference);
            return userService.updateUserProfile(user);
        }
        return null;
    }
}
