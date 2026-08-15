package gr.aueb.cf9.petcare.dto;

import gr.aueb.cf9.petcare.entity.enums.Gender;
import gr.aueb.cf9.petcare.entity.enums.MicrochipStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PetReadOnlyDTO {

    private Long id;

    private String name;

    private String species;

    private String breed;

    private LocalDate birthDate;

    private String color;

    private Boolean sterilized;

    private Gender gender;

    private String microchipNumber;

    private MicrochipStatus microchipStatus;

    private Boolean hasOverdueVaccinations;

    private String notes;

    private String photoUrl;

    private OwnerReadOnlyDTO owner;
}