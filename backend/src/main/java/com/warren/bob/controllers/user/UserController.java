package com.warren.bob.controllers.user;


import com.warren.bob.models.user.UserDAO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.warren.bob.configuration.JWTAuthorizationFilter.HEADER;

@RestController()
@RequestMapping("/api/auth/")
@CrossOrigin
public class UserController {

    @Resource
    private UserDAO userDAO;

    @Value("${bob.secret}")
    private String secretKey;

    @PostMapping("/login")
    public void login(@RequestBody UserLoginDTO user,
                      HttpServletResponse response) {
        if (!userDAO.isValid(user.getUsername(), user.getPassword())) {
            throw new RuntimeException("Invalid username and/or password");
        }

        String token = getJWTToken(user.getUsername());
        response.setHeader(HEADER, token);
        response.setHeader("Access-Control-Expose-Headers", HEADER);
    }

    @PostMapping("/user")
    public void signup(@RequestBody UserDTO user,
                       HttpServletResponse response) {
        userDAO.create(user);
        response.setStatus(HttpServletResponse.SC_CREATED);
    }

    private String getJWTToken(String username) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("USER");

        return Jwts
                .builder()
                .setId("softtekJWT")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 600000))
                .signWith(SignatureAlgorithm.HS512,
                        secretKey).compact();
    }

    @GetMapping("/isTaken")
    public boolean isUsernameTaken(@RequestParam(name = "username") String username) {
        return userDAO.isTaken(username);
    }
}
