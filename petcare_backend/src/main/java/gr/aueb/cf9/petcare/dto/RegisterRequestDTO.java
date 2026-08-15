package gr.aueb.cf9.petcare.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {

    @NotBlank(message = "Username is required")
    @Size(max = 20, message = "Username must be up to 20 characters")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 4, max = 20, message = "Password must be between 4 and 20 characters")
    private String password;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be up to 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be up to 50 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 50, message = "Email must be up to 50 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Size(max = 50, message = "Phone number must be up to 50 characters")
    private String phoneNumber;
}