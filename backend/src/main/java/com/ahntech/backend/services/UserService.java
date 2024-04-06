package com.ahntech.backend.services;


import com.ahntech.backend.dtos.ChangePasswordDto;
import com.ahntech.backend.dtos.UserDto;
import com.ahntech.backend.entities.User;
import com.ahntech.backend.models.MessageResponse;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;



public interface UserService {


    /**
     * Méthode d'obtention du user à travers son idArticle
     *
     * @param idUser id de l'user
     * @return User
     */
    User getUserById(String idUser);

    List<User> getAllUser();


     User getUser();

     ResponseEntity<MessageResponse> changePassword(ChangePasswordDto request, Principal connectedUser);

    ResponseEntity<MessageResponse> addUser(UserDto newUser);


    ResponseEntity<MessageResponse> addManyUser(List<UserDto> userList);



    /**
     * Méthode permettant de supprimer une liste d'user.
     *
     * @param usersIdList liste des id des users à supprimer
     * @return true si la suppression s'est bien passée
     * @throws Exception si la suppression ne s'est pas bien passée
     */
    Boolean deleteUserList(List<String> usersIdList) throws Exception;

    /**
     * Méthode permettant de supprimer un user.
     *
     * @param usersId id de l'user à supprimer
     * @return true si la suppression s'est bien passée
     * @throws Exception si la suppression ne s'est pas bien passée
     */
    Boolean deleteUser(String usersId) throws Exception;




}
