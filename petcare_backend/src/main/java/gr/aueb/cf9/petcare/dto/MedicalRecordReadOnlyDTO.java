package gr.aueb.cf9.petcare.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MedicalRecordReadOnlyDTO {

    private Long id;

    private LocalDate visitDate;

    private String reason;

    private String diagnosis;

    private String treatment;

    private String notes;

    private PetReadOnlyDTO pet;
}