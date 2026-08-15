package gr.aueb.cf9.petcare.dto;

import gr.aueb.cf9.petcare.entity.enums.VaccinationStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class VaccinationReadOnlyDTO {

    private Long id;

    private String vaccineName;

    private LocalDate vaccinationDate;

    private LocalDate nextDueDate;

    private VaccinationStatus status;

    private String batchNumber;

    private String notes;

    private PetReadOnlyDTO pet;

}