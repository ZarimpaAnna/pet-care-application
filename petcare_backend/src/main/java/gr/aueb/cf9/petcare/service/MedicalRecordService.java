package gr.aueb.cf9.petcare.service;


import gr.aueb.cf9.petcare.dto.MedicalRecordInsertDTO;
import gr.aueb.cf9.petcare.dto.MedicalRecordReadOnlyDTO;
import gr.aueb.cf9.petcare.entity.Pet;
import gr.aueb.cf9.petcare.entity.MedicalRecord;
import gr.aueb.cf9.petcare.exception.ResourceNotFoundException;
import gr.aueb.cf9.petcare.repository.MedicalRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import java.util.List;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final PetService petService;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository, PetService petService)
    {
        this.medicalRecordRepository = medicalRecordRepository;
        this.petService = petService;
    }

    public List<MedicalRecordReadOnlyDTO> getAllMedicalRecords(
            Authentication authentication
    ) {

        if (authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {

            return medicalRecordRepository.findAll()
                    .stream()
                    .map(this::convertToDTO)
                    .toList();
        }

        return medicalRecordRepository
                .findAllByPetOwnerAppUserUsername(authentication.getName())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public MedicalRecordReadOnlyDTO saveMedicalRecord(
            MedicalRecordInsertDTO dto,
            Authentication authentication
    ) {

        MedicalRecord medicalRecord = new MedicalRecord();

        Pet pet = petService.getAccessiblePetEntity(
                dto.getPetId(),
                authentication
        );

        medicalRecord.setVisitDate(dto.getVisitDate());
        medicalRecord.setReason(dto.getReason());
        medicalRecord.setDiagnosis(dto.getDiagnosis());
        medicalRecord.setTreatment(dto.getTreatment());
        medicalRecord.setNotes(dto.getNotes());
        medicalRecord.setPet(pet);

        MedicalRecord savedMedicalRecord =
                medicalRecordRepository.save(medicalRecord);

        return convertToDTO(savedMedicalRecord);
    }

    public MedicalRecordReadOnlyDTO getMedicalRecordById(
            Long id,
            Authentication authentication
    ) {

        MedicalRecord medicalRecord =
                getAccessibleMedicalRecord(id, authentication);

        return convertToDTO(medicalRecord);
    }

    public void deleteMedicalRecord(
            Long id,
            Authentication authentication
    ) {

        MedicalRecord medicalRecord =
                getAccessibleMedicalRecord(id, authentication);

        medicalRecordRepository.delete(medicalRecord);
    }

    private MedicalRecordReadOnlyDTO convertToDTO(MedicalRecord medicalRecord) {
        MedicalRecordReadOnlyDTO dto = new MedicalRecordReadOnlyDTO();

        dto.setId(medicalRecord.getId());
        dto.setVisitDate(medicalRecord.getVisitDate());
        dto.setReason(medicalRecord.getReason());
        dto.setDiagnosis(medicalRecord.getDiagnosis());
        dto.setTreatment(medicalRecord.getTreatment());
        dto.setNotes(medicalRecord.getNotes());
        dto.setPet(petService.convertToDTO(medicalRecord.getPet()));

        return dto;
    }

    private MedicalRecord getAccessibleMedicalRecord(
            Long id,
            Authentication authentication
    ) {

        if (authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {

            return medicalRecordRepository.findById(id)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Medical record not found with id: " + id
                            )
                    );
        }

        return medicalRecordRepository
                .findByIdAndPetOwnerAppUserUsername(
                        id,
                        authentication.getName()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical record not found with id: " + id
                        )
                );
    }

    public MedicalRecordReadOnlyDTO updateMedicalRecord(
            Long id,
            MedicalRecordInsertDTO dto,
            Authentication authentication
    ) {

        MedicalRecord medicalRecord =
                getAccessibleMedicalRecord(id, authentication);

        Pet pet = petService.getAccessiblePetEntity(
                dto.getPetId(),
                authentication
        );

        medicalRecord.setVisitDate(dto.getVisitDate());
        medicalRecord.setReason(dto.getReason());
        medicalRecord.setDiagnosis(dto.getDiagnosis());
        medicalRecord.setTreatment(dto.getTreatment());
        medicalRecord.setNotes(dto.getNotes());
        medicalRecord.setPet(pet);

        MedicalRecord updatedMedicalRecord =
                medicalRecordRepository.save(medicalRecord);

        return convertToDTO(updatedMedicalRecord);
    }
}
