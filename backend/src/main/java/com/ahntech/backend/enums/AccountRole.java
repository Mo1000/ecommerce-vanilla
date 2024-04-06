package com.ahntech.backend.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public enum AccountRole {
    ADMIN(Set.of("ADMIN")),
    USER(Set.of("USER"));

    private final Set<String> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        // authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        var authorities= getPermissions()
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return  authorities;
    }


}
