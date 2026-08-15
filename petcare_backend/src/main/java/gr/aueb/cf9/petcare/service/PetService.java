package gr.aueb.cf9.petcare.service;

import gr.aueb.cf9.petcare.exception.ResourceNotFoundException;
import gr.aueb.cf9.petcare.repository.PetRepository;
import org.springframework.stereotype.Service;
import gr.aueb.cf9.petcare.entity.Pet;
import java.util.List;
import gr.aueb.cf9.petcare.dto.PetInsertDTO;
import gr.aueb.cf9.petcare.dto.PetReadOnlyDTO;
import gr.aueb.cf9.petcare.entity.Owner;
import gr.aueb.cf9.petcare.entity.enums.MicrochipStatus;
import java.time.LocalDate;
import org.springframework.security.core.Authentication;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final OwnerService ownerService;

    public PetService(PetRepository petRepository, OwnerService ownerService) {
        this.petRepository = petRepository;
        this.ownerService = ownerService;
    }

    public PetReadOnlyDTO savePet(
            PetInsertDTO dto,
            String username
    ) {

        Pet pet = new Pet();
        Owner owner = ownerService.getOwnerEntityByUsername(username);

        pet.setName(dto.getName());
        pet.setSpecies(dto.getSpecies());
        pet.setBreed(dto.getBreed());
        pet.setBirthDate(dto.getBirthDate());
        pet.setColor(dto.getColor());
        pet.setSterilized(dto.getSterilized());
        pet.setGender(dto.getGender());
        pet.setMicrochipNumber(dto.getMicrochipNumber());
        pet.setNotes(dto.getNotes());
        pet.setPhotoUrl(dto.getPhotoUrl());
        pet.setOwner(owner);

        Pet savedPet = petRepository.save(pet);

        return convertToDTO(savedPet);
    }


    public void deletePet(
            Long id,
            Authentication authentication
    ) {
        Pet pet = getAccessiblePetEntity(id, authentication);

        petRepository.delete(pet);
    }

    public PetReadOnlyDTO convertToDTO(Pet pet) {
        PetReadOnlyDTO dto = new PetReadOnlyDTO();


        dto.setId(pet.getId());
        dto.setName(pet.getName());
        dto.setSpecies(pet.getSpecies());
        dto.setBreed(pet.getBreed());
        dto.setBirthDate(pet.getBirthDate());
        dto.setColor(pet.getColor());
        dto.setSterilized(pet.getSterilized());
        dto.setGender(pet.getGender());
        dto.setMicrochipNumber(pet.getMicrochipNumber());
        dto.setNotes(pet.getNotes());
        dto.setPhotoUrl(pet.getPhotoUrl());
        dto.setOwner(ownerService.convertToDTO(pet.getOwner()));
        dto.setMicrochipStatus(
                calculateMicrochipStatus(pet.getMicrochipNumber())
        );
        dto.setHasOverdueVaccinations(
                calculateHasOverdueVaccinations(pet)
        );

        return dto;
    }

    public PetReadOnlyDTO getPetById(
            Long id,
            Authentication authentication
    ) {
        Pet pet = getAccessiblePetEntity(id, authentication);

        return convertToDTO(pet);
    }

    private MicrochipStatus calculateMicrochipStatus(String microchipNumber) {

        if (microchipNumber != null && !microchipNumber.isBlank()) {
            return MicrochipStatus.REGISTERED;
        }

        return MicrochipStatus.NOT_REGISTERED;
    }

    private Boolean calculateHasOverdueVaccinations(Pet pet) {

        if (pet.getVaccinations() == null) {
            return false;
        }

        LocalDate today = LocalDate.now();

        return pet.getVaccinations()
                .stream()
                .anyMatch(vaccination ->
                        vaccination.getNextDueDate() != null
                                && vaccination.getNextDueDate().isBefore(today)
                );
    }

    public List<PetReadOnlyDTO> getAllPets(Authentication authentication) {
        if (isAdmin(authentication)) {

            return petRepository.findAll()
                    .stream()
                    .map(this::convertToDTO)
                    .toList();
        }

        return petRepository
                .findAllByOwnerAppUserUsername(authentication.getName())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    private boolean isAdmin(Authentication authentication) {

        return authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals("ROLE_ADMIN")
                );
    }

    public Pet getAccessiblePetEntity(
            Long id,
            Authentication authentication
    ) {

        if (isAdmin(authentication)) {
            return petRepository.findById(id)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Pet not found with id: " + id
                            )
                    );
        }

        return petRepository
                .findByIdAndOwnerAppUserUsername(
                        id,
                        authentication.getName()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Pet not found with id: " + id
                        )
                );
    }

    public PetReadOnlyDTO updatePet(
            Long id,
            PetInsertDTO dto,
            Authentication authentication
    ) {

        Pet pet = getAccessiblePetEntity(id, authentication);

        pet.setName(dto.getName());
        pet.setSpecies(dto.getSpecies());
        pet.setBreed(dto.getBreed());
        pet.setBirthDate(dto.getBirthDate());
        pet.setColor(dto.getColor());
        pet.setSterilized(dto.getSterilized());
        pet.setGender(dto.getGender());
        pet.setMicrochipNumber(dto.getMicrochipNumber());
        pet.setNotes(dto.getNotes());
        pet.setPhotoUrl(dto.getPhotoUrl());

        Pet updatedPet = petRepository.save(pet);

        return convertToDTO(updatedPet);
    }
}
