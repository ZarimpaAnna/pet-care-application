package gr.aueb.cf9.petcare.dto;

import gr.aueb.cf9.petcare.entity.enums.Gender;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.PastOrPresent;
//import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
public class PetInsertDTO {

    @NotBlank(message = "Pet name is required")
    @Size(max = 100, message = "Pet name must be up to 100 characters")
    private String name;

    @NotBlank(message = "Species is required")
    @Size(max = 50, message = "Species must be up to 50 characters")
    private String species;

    private String breed;

    @PastOrPresent(message = "Birth date cannot be in the future")
    private LocalDate birthDate;

    private String color;

    private Boolean sterilized;

    private Gender gender;

    private String microchipNumber;

    @Size(max = 1000, message = "Notes must be up to 1000 characters")
    private String notes;

    private String photoUrl;

}