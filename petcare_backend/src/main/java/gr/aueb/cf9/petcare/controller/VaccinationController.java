package gr.aueb.cf9.petcare.controller;

import gr.aueb.cf9.petcare.dto.VaccinationInsertDTO;
import gr.aueb.cf9.petcare.dto.VaccinationReadOnlyDTO;
import gr.aueb.cf9.petcare.service.VaccinationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vaccinations")
public class VaccinationController {

    private final VaccinationService vaccinationService;

    public VaccinationController(VaccinationService vaccinationService) {
        this.vaccinationService = vaccinationService;
    }

    @GetMapping
    public List<VaccinationReadOnlyDTO> getAllVaccinations(
            Authentication authentication
    ) {
        return vaccinationService.getAllVaccinations(authentication);
    }

    @PostMapping
    public ResponseEntity<VaccinationReadOnlyDTO> createVaccination(
            @Valid @RequestBody VaccinationInsertDTO dto,
            Authentication authentication
    ) {

        VaccinationReadOnlyDTO createdVaccination =
                vaccinationService.saveVaccination(
                        dto,
                        authentication
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdVaccination);
    }

    @GetMapping("/{id}")
    public VaccinationReadOnlyDTO getVaccinationById(
            @PathVariable Long id,
            Authentication authentication
    ) {
        return vaccinationService.getVaccinationById(
                id,
                authentication
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVaccination(
            @PathVariable Long id,
            Authentication authentication
    ) {

        vaccinationService.deleteVaccination(
                id,
                authentication
        );

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public VaccinationReadOnlyDTO updateVaccination(
            @PathVariable Long id,
            @Valid @RequestBody VaccinationInsertDTO dto,
            Authentication authentication
    ) {

        return vaccinationService.updateVaccination(
                id,
                dto,
                authentication
        );
    }
}