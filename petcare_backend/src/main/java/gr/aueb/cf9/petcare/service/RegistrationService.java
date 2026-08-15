package gr.aueb.cf9.petcare.service;

import gr.aueb.cf9.petcare.dto.OwnerReadOnlyDTO;
import gr.aueb.cf9.petcare.dto.RegisterRequestDTO;
import gr.aueb.cf9.petcare.entity.AppUser;
import gr.aueb.cf9.petcare.entity.Owner;
import gr.aueb.cf9.petcare.entity.enums.Role;
import gr.aueb.cf9.petcare.exception.DuplicateResourceException;
import gr.aueb.cf9.petcare.repository.AppUserRepository;
import gr.aueb.cf9.petcare.repository.OwnerRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    private final AppUserRepository appUserRepository;
    private final OwnerRepository ownerRepository;
    private final PasswordEncoder passwordEncoder;
    private final OwnerService ownerService;

    public RegistrationService(
            AppUserRepository appUserRepository,
            OwnerRepository ownerRepository,
            PasswordEncoder passwordEncoder,
            OwnerService ownerService
    ) {
        this.appUserRepository = appUserRepository;
        this.ownerRepository = ownerRepository;
        this.passwordEncoder = passwordEncoder;
        this.ownerService = ownerService;
    }

    @Transactional
    public OwnerReadOnlyDTO register(RegisterRequestDTO dto) {

        if (appUserRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new DuplicateResourceException(
                    "Username already exists"
            );
        }

        if (ownerRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new DuplicateResourceException(
                    "Email already exists"
            );
        }

        AppUser appUser = new AppUser();

        appUser.setUsername(dto.getUsername());
        appUser.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );
        appUser.setRole(Role.USER);

        AppUser savedUser = appUserRepository.save(appUser);

        Owner owner = new Owner();

        owner.setFirstName(dto.getFirstName());
        owner.setLastName(dto.getLastName());
        owner.setEmail(dto.getEmail());
        owner.setPhoneNumber(dto.getPhoneNumber());
        owner.setAppUser(savedUser);

        Owner savedOwner = ownerRepository.save(owner);

        return ownerService.convertToDTO(savedOwner);
    }
}