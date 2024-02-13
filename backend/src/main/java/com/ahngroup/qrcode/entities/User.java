package com.ahngroup.qrcode.entities;

import com.ahngroup.qrcode.dtos.UserDto;
import com.ahngroup.qrcode.enums.AccountRole;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Setter
@Getter
@Builder
@AllArgsConstructor
@Document(collection = "user")
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class User {

    @Id
    String id;
    @Indexed(unique = true)
    String username;
    @Indexed(unique = true)
    String email;
    String password;
    AccountRole role;
    String avatar;
    String address;
    String phone;


    public User() {

    }

    public void setAllAttributes(UserDto newUser) {
        this.username = newUser.getUsername();
        this.email = newUser.getEmail();
        this.phone = newUser.getPhone();
        this.address = newUser.getAddress();
        this.avatar = newUser.getAvatar();
        this.role = AccountRole.USER;
        this.password = newUser.getPassword();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && role == user.role && Objects.equals(avatar, user.avatar) && Objects.equals(address, user.address) && Objects.equals(phone, user.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email, password, role, avatar, address, phone);
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", avatar='" + avatar + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
