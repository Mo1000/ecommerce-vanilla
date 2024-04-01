package com.ahntech.backend.interfaces.user;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserInformationsService extends UserDetailsService {

    UserInformations loadUserByUsername(String username) throws UsernameNotFoundException;


}
