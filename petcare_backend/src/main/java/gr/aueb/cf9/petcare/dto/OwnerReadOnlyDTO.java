package gr.aueb.cf9.petcare.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OwnerReadOnlyDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

}