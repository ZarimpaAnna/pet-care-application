package gr.aueb.cf9.petcare.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class VaccinationInsertDTO {

    @NotBlank(message = "Vaccine name is required")
    @Size(max = 100, message = "Vaccine name must be up to 100 characters")
    private String vaccineName;

    @NotNull(message = "Vaccination Date given is required")
    @PastOrPresent(message = "Vaccination date cannot be in the future")
    private LocalDate vaccinationDate;

    private LocalDate nextDueDate;

    @Size(max = 100, message = "Batch number must be up to 100 characters")
    private String batchNumber;

    @Size(max = 1000, message = "Notes must be up to 1000 characters")
    private String notes;

    @NotNull
    private Long petId;
}