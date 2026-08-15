package gr.aueb.cf9.petcare.service;

import gr.aueb.cf9.petcare.dto.AppUserInsertDTO;
import gr.aueb.cf9.petcare.dto.AppUserReadOnlyDTO;
import gr.aueb.cf9.petcare.entity.AppUser;
import gr.aueb.cf9.petcare.exception.DuplicateResourceException;
import gr.aueb.cf9.petcare.exception.ResourceNotFoundException;
import gr.aueb.cf9.petcare.repository.AppUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserService(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUserReadOnlyDTO createUser(AppUserInsertDTO dto) {

        if (appUserRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new DuplicateResourceException("Username already exists");
        }

        AppUser appUser = new AppUser();

        appUser.setUsername(dto.getUsername());
        appUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        appUser.setRole(dto.getRole());

        AppUser savedUser = appUserRepository.save(appUser);

        AppUserReadOnlyDTO readOnlyDTO = new AppUserReadOnlyDTO();

        readOnlyDTO.setId(savedUser.getId());
        readOnlyDTO.setUsername(savedUser.getUsername());
        readOnlyDTO.setRole(savedUser.getRole());

        return readOnlyDTO;
    }

    public List<AppUserReadOnlyDTO> getAllUsers() {

        return appUserRepository.findAll()
                .stream()
                .map(user -> {
                    AppUserReadOnlyDTO dto = new AppUserReadOnlyDTO();

                    dto.setId(user.getId());
                    dto.setUsername(user.getUsername());
                    dto.setRole(user.getRole());

                    return dto;
                })
                .toList();
    }

    public void deleteUser(Long id) {

        AppUser appUser = appUserRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id: " + id)
                );

        appUserRepository.delete(appUser);
    }

    public AppUser getUserEntityByUsername(String username) {
        return appUserRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found: " + username
                        )
                );
    }

}