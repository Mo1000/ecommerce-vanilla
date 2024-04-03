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
        return getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority("ROLE_".concat(permission)))
                .collect(Collectors.toList());
    }


}
