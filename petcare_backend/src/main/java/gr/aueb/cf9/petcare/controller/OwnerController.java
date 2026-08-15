package gr.aueb.cf9.petcare.controller;

import gr.aueb.cf9.petcare.service.OwnerService;
import gr.aueb.cf9.petcare.dto.OwnerInsertDTO;
import gr.aueb.cf9.petcare.dto.OwnerReadOnlyDTO;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/owners")
public class OwnerController {

    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @GetMapping
    public List<OwnerReadOnlyDTO> getAllOwners(
            Authentication authentication
    ) {
        return ownerService.getAllOwners(authentication);
    }


    @PostMapping
    public ResponseEntity<OwnerReadOnlyDTO> createOwner(
            @Valid @RequestBody OwnerInsertDTO dto,
            Authentication authentication
    ) {

        String username = authentication.getName();

        OwnerReadOnlyDTO createdOwner =
                ownerService.saveOwner(dto, username);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdOwner);
    }

    @GetMapping("/{id}")
    public OwnerReadOnlyDTO getOwnerById(@PathVariable Long id) {
        return ownerService.getOwnerById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOwner(@PathVariable Long id) {

        ownerService.deleteOwner(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public OwnerReadOnlyDTO getCurrentOwner(
            Authentication authentication
    ) {
        return ownerService.getCurrentOwner(
                authentication.getName()
        );
    }
}
