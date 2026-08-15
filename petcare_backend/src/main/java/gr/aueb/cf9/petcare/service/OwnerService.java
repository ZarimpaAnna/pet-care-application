package gr.aueb.cf9.petcare.service;

import gr.aueb.cf9.petcare.entity.AppUser;
import gr.aueb.cf9.petcare.exception.DuplicateResourceException;
import gr.aueb.cf9.petcare.exception.ResourceNotFoundException;
import gr.aueb.cf9.petcare.repository.OwnerRepository;
import org.springframework.stereotype.Service;
import gr.aueb.cf9.petcare.entity.Owner;
import java.util.List;
import gr.aueb.cf9.petcare.dto.OwnerInsertDTO;
import gr.aueb.cf9.petcare.dto.OwnerReadOnlyDTO;
import org.springframework.security.core.Authentication;

@Service
public class OwnerService {

    private final OwnerRepository ownerRepository;
    private final AppUserService appUserService;

    public OwnerService(
            OwnerRepository ownerRepository,
            AppUserService appUserService
    ) {
        this.ownerRepository = ownerRepository;
        this.appUserService = appUserService;
    }

    public List<OwnerReadOnlyDTO> getAllOwners(
            Authentication authentication
    ) {

        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals("ROLE_ADMIN")
                );

        if (isAdmin) {
            return ownerRepository.findAll()
                    .stream()
                    .map(this::convertToDTO)
                    .toList();
        }

        Owner owner = ownerRepository
                .findByAppUserUsername(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner profile not found for user: "
                                        + authentication.getName()
                        )
                );

        return List.of(convertToDTO(owner));
    }


    public OwnerReadOnlyDTO saveOwner(
            OwnerInsertDTO dto,
            String username
    ) {
        if (ownerRepository.findByAppUserUsername(username).isPresent()) {
            throw new DuplicateResourceException(
                    "Owner profile already exists for this user"
            );
        }

        AppUser appUser =
                appUserService.getUserEntityByUsername(username);

        Owner owner = new Owner();

        owner.setFirstName(dto.getFirstName());
        owner.setLastName(dto.getLastName());
        owner.setEmail(dto.getEmail());
        owner.setPhoneNumber(dto.getPhoneNumber());
        owner.setAppUser(appUser);

        Owner savedOwner = ownerRepository.save(owner);

        return convertToDTO(savedOwner);
    }

    public OwnerReadOnlyDTO getOwnerById(Long id) {
        return ownerRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner not found with id: " + id
                        )
                );
    }


    public void deleteOwner(Long id) {

        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner not found with id: " + id
                        )
                );

        ownerRepository.delete(owner);
    }

    public OwnerReadOnlyDTO convertToDTO(Owner owner) {
        OwnerReadOnlyDTO dto = new OwnerReadOnlyDTO();

        dto.setId(owner.getId());
        dto.setFirstName(owner.getFirstName());
        dto.setLastName(owner.getLastName());
        dto.setEmail(owner.getEmail());
        dto.setPhoneNumber(owner.getPhoneNumber());

        return dto;
    }

    public Owner getOwnerEntityById(Long id) {
        return ownerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner not found with id: " + id
                        )
                );
    }

    public Owner getOwnerEntityByUsername(String username) {
        return ownerRepository.findByAppUserUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner profile not found for user: " + username
                        )
                );
    }

    public OwnerReadOnlyDTO getCurrentOwner(String username) {

        Owner owner = ownerRepository.findByAppUserUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner profile not found for user: " + username
                        )
                );

        return convertToDTO(owner);
    }
}
