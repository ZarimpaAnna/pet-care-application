package gr.aueb.cf9.petcare.controller;

import gr.aueb.cf9.petcare.dto.LoginRequestDTO;
import gr.aueb.cf9.petcare.dto.LoginResponseDTO;
import gr.aueb.cf9.petcare.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import gr.aueb.cf9.petcare.dto.OwnerReadOnlyDTO;
import gr.aueb.cf9.petcare.dto.RegisterRequestDTO;
import gr.aueb.cf9.petcare.service.RegistrationService;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RegistrationService registrationService;

    @PostMapping("/login")
    public LoginResponseDTO login(
            @Valid @RequestBody LoginRequestDTO dto
    ) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                dto.getUsername(),
                                dto.getPassword()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        String token = jwtService.generateToken(userDetails);

        return new LoginResponseDTO(token);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public OwnerReadOnlyDTO register(
            @Valid @RequestBody RegisterRequestDTO dto
    ) {
        return registrationService.register(dto);
    }
}