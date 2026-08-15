package gr.aueb.cf9.petcare.controller;


import gr.aueb.cf9.petcare.service.PetService;
import gr.aueb.cf9.petcare.dto.PetInsertDTO;
import gr.aueb.cf9.petcare.dto.PetReadOnlyDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;

import jakarta.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<PetReadOnlyDTO> getAllPets(
            Authentication authentication
    ) {
        return petService.getAllPets(authentication);
    }


    @PostMapping
    public ResponseEntity<PetReadOnlyDTO> createPet(
            @Valid @RequestBody PetInsertDTO dto,
            Authentication authentication
    ) {

        String username = authentication.getName();

        PetReadOnlyDTO createdPet =
                petService.savePet(dto, username);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdPet);
    }

    @GetMapping("/{id}")
    public PetReadOnlyDTO getPetById(
            @PathVariable Long id,
            Authentication authentication
    ) {

        return petService.getPetById(
                id,
                authentication
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(
            @PathVariable Long id,
            Authentication authentication
    ) {

        petService.deletePet(
                id,
                authentication
        );

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public PetReadOnlyDTO updatePet(
            @PathVariable Long id,
            @Valid @RequestBody PetInsertDTO dto,
            Authentication authentication
    ) {

        return petService.updatePet(
                id,
                dto,
                authentication
        );
    }
}
