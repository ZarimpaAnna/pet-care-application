package gr.aueb.cf9.petcare.service;

import gr.aueb.cf9.petcare.dto.VaccinationInsertDTO;
import gr.aueb.cf9.petcare.dto.VaccinationReadOnlyDTO;
import gr.aueb.cf9.petcare.entity.Pet;
import gr.aueb.cf9.petcare.entity.Vaccination;
import gr.aueb.cf9.petcare.entity.enums.VaccinationStatus;
import gr.aueb.cf9.petcare.exception.ResourceNotFoundException;
import gr.aueb.cf9.petcare.repository.VaccinationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VaccinationService {

    private final VaccinationRepository vaccinationRepository;
    private final PetService petService;

    public VaccinationService(
            VaccinationRepository vaccinationRepository,
            PetService petService
    ) {
        this.vaccinationRepository = vaccinationRepository;
        this.petService = petService;
    }

    public List<VaccinationReadOnlyDTO> getAllVaccinations(
            Authentication authentication
    ) {

        if (authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {

            return vaccinationRepository.findAll()
                    .stream()
                    .map(this::convertToDTO)
                    .toList();
        }

        return vaccinationRepository
                .findAllByPetOwnerAppUserUsername(authentication.getName())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public VaccinationReadOnlyDTO saveVaccination(
            VaccinationInsertDTO dto,
            Authentication authentication
    ) {

        validateVaccinationDates(dto);

        Vaccination vaccination = new Vaccination();

        Pet pet = petService.getAccessiblePetEntity(
                dto.getPetId(),
                authentication
        );

        vaccination.setVaccineName(dto.getVaccineName());
        vaccination.setVaccinationDate(dto.getVaccinationDate());
        vaccination.setNextDueDate(dto.getNextDueDate());
        vaccination.setBatchNumber(dto.getBatchNumber());
        vaccination.setNotes(dto.getNotes());
        vaccination.setPet(pet);

        Vaccination savedVaccination =
                vaccinationRepository.save(vaccination);

        return convertToDTO(savedVaccination);
    }

    public VaccinationReadOnlyDTO getVaccinationById(
            Long id,
            Authentication authentication
    ) {

        Vaccination vaccination =
                getAccessibleVaccination(id, authentication);

        return convertToDTO(vaccination);
    }

    public void deleteVaccination(
            Long id,
            Authentication authentication
    ) {

        Vaccination vaccination =
                getAccessibleVaccination(id, authentication);

        vaccinationRepository.delete(vaccination);
    }

    private VaccinationReadOnlyDTO convertToDTO(
            Vaccination vaccination
    ) {

        VaccinationReadOnlyDTO dto =
                new VaccinationReadOnlyDTO();

        dto.setId(vaccination.getId());
        dto.setVaccineName(vaccination.getVaccineName());
        dto.setVaccinationDate(vaccination.getVaccinationDate());
        dto.setNextDueDate(vaccination.getNextDueDate());
        dto.setBatchNumber(vaccination.getBatchNumber());
        dto.setNotes(vaccination.getNotes());
        dto.setPet(
                petService.convertToDTO(vaccination.getPet())
        );
        dto.setStatus(
                calculateVaccinationStatus(
                        vaccination.getNextDueDate()
                )
        );

        return dto;
    }

    private VaccinationStatus calculateVaccinationStatus(
            LocalDate nextDueDate
    ) {

        LocalDate today = LocalDate.now();

        if (nextDueDate == null) {
            return VaccinationStatus.NO_DUE_DATE;
        }

        if (nextDueDate.isBefore(today)) {
            return VaccinationStatus.EXPIRED;
        }

        if (!nextDueDate.isAfter(today.plusDays(30))) {
            return VaccinationStatus.UPCOMING;
        }

        return VaccinationStatus.VALID;
    }

    private Vaccination getAccessibleVaccination(
            Long id,
            Authentication authentication
    ) {

        if (authentication.getAuthorities()
                .stream()
                .anyMatch(a ->
                        a.getAuthority().equals("ROLE_ADMIN")
                )) {

            return vaccinationRepository.findById(id)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Vaccination not found with id: " + id
                            )
                    );
        }

        return vaccinationRepository
                .findByIdAndPetOwnerAppUserUsername(
                        id,
                        authentication.getName()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vaccination not found with id: " + id
                        )
                );
    }

    public VaccinationReadOnlyDTO updateVaccination(
            Long id,
            VaccinationInsertDTO dto,
            Authentication authentication
    ) {

        validateVaccinationDates(dto);

        Vaccination vaccination =
                getAccessibleVaccination(id, authentication);

        Pet pet = petService.getAccessiblePetEntity(
                dto.getPetId(),
                authentication
        );

        vaccination.setVaccineName(dto.getVaccineName());
        vaccination.setVaccinationDate(dto.getVaccinationDate());
        vaccination.setNextDueDate(dto.getNextDueDate());
        vaccination.setBatchNumber(dto.getBatchNumber());
        vaccination.setNotes(dto.getNotes());
        vaccination.setPet(pet);

        Vaccination updatedVaccination =
                vaccinationRepository.save(vaccination);

        return convertToDTO(updatedVaccination);
    }

    private void validateVaccinationDates(
            VaccinationInsertDTO dto
    ) {

        if (dto.getVaccinationDate() == null
                || dto.getNextDueDate() == null) {
            return;
        }

        if (!dto.getNextDueDate()
                .isAfter(dto.getVaccinationDate())) {

            throw new IllegalArgumentException(
                    "Next due date must be after vaccination date"
            );
        }
    }
}