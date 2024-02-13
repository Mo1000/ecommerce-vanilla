package com.ahngroup.qrcode.services;


import com.ahngroup.qrcode.dtos.UserDto;
import com.ahngroup.qrcode.entities.User;
import com.ahngroup.qrcode.models.MessageResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;



public interface UserService {

    /**
     * Méthode permettant de trouver un user à travers son username
     *
     * @param username user à trouver
     * @return User
     **/
    User findOneByUsername(String username);

    /**
     * Méthode d'obtention du user à travers son idArticle
     *
     * @param idUser id de l'user
     * @return User
     */
    User getUserById(String idUser);

    List<User> getAllUser();



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
