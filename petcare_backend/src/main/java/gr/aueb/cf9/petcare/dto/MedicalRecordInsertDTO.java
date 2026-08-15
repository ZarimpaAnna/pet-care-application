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
public class MedicalRecordInsertDTO {

    @NotNull(message = "Date of visit is required")
    @PastOrPresent(message = "Visit date cannot be in the future")
    private LocalDate visitDate;

    @NotBlank(message = "Reason of visit is required")
    @Size(max = 1000, message = "Reason must be up to 1000 characters")
    private String reason;

    @Size(max = 1000, message = "Diagnosis must be up to 1000 characters")
    private String diagnosis;

    @Size(max = 1000, message = "Treatment must be up to 1000 characters")
    private String treatment;

    @Size(max = 5000, message = "Notes must be up to 5000 characters")
    private String notes;

    @NotNull
    private Long petId;
}