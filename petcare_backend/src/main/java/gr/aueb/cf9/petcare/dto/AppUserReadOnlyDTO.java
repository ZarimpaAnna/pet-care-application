package gr.aueb.cf9.petcare.dto;

import gr.aueb.cf9.petcare.entity.enums.Role;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AppUserReadOnlyDTO {

    private Long id;
    private String username;
    private Role role;
}
