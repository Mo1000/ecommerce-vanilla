package com.ahntech.backend.services.implementations;

import com.ahntech.backend.dtos.UserRegisterDto;
import com.ahntech.backend.entities.User;
import com.ahntech.backend.enums.CodeResponse;
import com.ahntech.backend.exceptions.BadRequestException;
import com.ahntech.backend.exceptions.RessourcesNotFoundException;
import com.ahntech.backend.exceptions.UnprocessableEntityException;
import com.ahntech.backend.models.MessageResponse;
import com.ahntech.backend.repositories.UserRepository;
import com.ahntech.backend.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User getUserById(String idUser) {
        return userRepository.findById(idUser).orElseThrow(RessourcesNotFoundException::new);
    }


    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }




    @Override
    public ResponseEntity<MessageResponse> addUser(UserRegisterDto newUser) {
        try {
            User user = new User();
            user.setAllAttributes(newUser);
            String id = userRepository.save(user).getId();
            if (id == null) {
                throw new UnprocessableEntityException("User not added.Something was wrong");
            }
            return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.builder()
                    .message(CodeResponse.RES200.getLabel())
                    .value(user)
                    .build());
        } catch (Exception e) {
            if (e instanceof DuplicateKeyException) {
                throw new BadRequestException("User already exist with username or email");
            }
        throw e;
        }
    }


    @Override
    public ResponseEntity<MessageResponse> addManyUser(List<UserRegisterDto> userList) {
        if (!CollectionUtils.isEmpty(userList)) {
            for (UserRegisterDto user : userList) {
                this.addUser(user);
            }
            return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.builder()
                    .message("Users added successfully")
                    .value(userList)
                    .build());
        } else
            throw new BadRequestException("List of users is empty");


    }

    /**
     * @param usersId id de l'user à supprimer
     * @return true si la suppression s'est bien passée
     */
    @Override
    public Boolean deleteUser(String usersId) {
        User user = this.getUserById(usersId);
        if (user != null) {
            this.userRepository.deleteById(usersId);
            return true;
        } else {
            throw new RessourcesNotFoundException();
        }


    }

    @Override
    public Boolean deleteUserList(List<String> usersIdList) {
        if (usersIdList != null && !CollectionUtils.isEmpty(usersIdList)) {
            for (Iterator<String> iterator = usersIdList.listIterator(); iterator.hasNext(); ) {
                String id = iterator.next();
                Optional<User> userToDeleted = this.userRepository.findById(id);
                if (userToDeleted.isPresent()) {
                    this.deleteUser(id);
                    iterator.remove();
                }
            }
            return usersIdList.isEmpty();
        }
        try {
            throw new Exception("Liste vide");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
