package gr.aueb.cf9.petcare.controller;

import gr.aueb.cf9.petcare.dto.MedicalRecordInsertDTO;
import gr.aueb.cf9.petcare.dto.MedicalRecordReadOnlyDTO;
import gr.aueb.cf9.petcare.service.MedicalRecordService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;


@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @GetMapping
    public List<MedicalRecordReadOnlyDTO> getAllMedicalRecords(
            Authentication authentication
    ) {
        return medicalRecordService.getAllMedicalRecords(authentication);
    }

    @PostMapping
    public ResponseEntity<MedicalRecordReadOnlyDTO> createMedicalRecord(
            @Valid @RequestBody MedicalRecordInsertDTO dto,
            Authentication authentication
    ) {

        MedicalRecordReadOnlyDTO createdMedicalRecord =
                medicalRecordService.saveMedicalRecord(
                        dto,
                        authentication
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdMedicalRecord);
    }

    @GetMapping("/{id}")
    public MedicalRecordReadOnlyDTO getMedicalRecordById(
            @PathVariable Long id,
            Authentication authentication
    ) {
        return medicalRecordService.getMedicalRecordById(
                id,
                authentication
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(
            @PathVariable Long id,
            Authentication authentication
    ) {

        medicalRecordService.deleteMedicalRecord(
                id,
                authentication
        );

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public MedicalRecordReadOnlyDTO updateMedicalRecord(
            @PathVariable Long id,
            @Valid @RequestBody MedicalRecordInsertDTO dto,
            Authentication authentication
    ) {

        return medicalRecordService.updateMedicalRecord(
                id,
                dto,
                authentication
        );
    }
}
