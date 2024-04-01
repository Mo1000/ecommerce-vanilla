package com.ahntech.backend.interfaces.user;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserInformations extends UserDetails {

    String getEmail();


}
