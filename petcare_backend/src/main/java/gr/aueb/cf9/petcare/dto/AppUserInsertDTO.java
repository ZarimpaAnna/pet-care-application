package gr.aueb.cf9.petcare.dto;

import gr.aueb.cf9.petcare.entity.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUserInsertDTO {

    @NotBlank(message = "Username is required")
    @Size(max = 20, message = "Username must be up to 20 characters")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(max = 20, message = "Password must be up to 20 characters")
    private String password;

    @NotNull(message = "Role is required")
    private Role role;

}