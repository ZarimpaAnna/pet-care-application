package gr.aueb.cf9.petcare.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

@Getter
@Setter
public class OwnerInsertDTO {

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be up to 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name  must be up to 50 characters")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Size(max = 50, message = "Email must be up to 50 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Size(max = 50, message = "Phone number must be up to 50 characters")
    private String phoneNumber;

}