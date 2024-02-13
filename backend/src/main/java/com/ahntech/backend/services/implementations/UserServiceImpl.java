package com.ahntech.backend.services.implementations;

import com.ahntech.backend.dtos.UserDto;
import com.ahntech.backend.entities.User;
import com.ahntech.backend.enums.CodeResponse;
import com.ahntech.backend.exceptions.BadRequestException;
import com.ahntech.backend.exceptions.RessourcesNotFoundException;
import com.ahntech.backend.exceptions.UnprocessableEntityException;
import com.ahntech.backend.models.MessageResponse;
import com.ahntech.backend.repositories.UserRepository;
import com.ahntech.backend.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
    @Autowired
    private MongoOperations mongoOperations;

    public static final String COLLECTION_NAME = "user";

    public final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param idUser id de l'user
     * @return User
     */
    @Override
    public User getUserById(String idUser) {
        return userRepository.findById(idUser).orElseThrow(RessourcesNotFoundException::new);
    }


    /**
     * @return List<User> liste des users
     */
    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }


    @Override
    public User findOneByUsername(String username) {
        Query query = new Query(Criteria.where("username").is(username));
        return mongoOperations.findOne(query, User.class, COLLECTION_NAME);
    }

    /**
     * @return true si l'ajout s'est bien passé
     */
    @Override
    public ResponseEntity<MessageResponse> addUser(UserDto newUser) {
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

    /**
     * @param userList liste des users à ajouter
     * @return true si l'ajout s'est bien passé
     */
    @Override
    public ResponseEntity<MessageResponse> addManyUser(List<UserDto> userList) {
        if (!CollectionUtils.isEmpty(userList)) {
            for (UserDto user : userList) {
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
