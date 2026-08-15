package gr.aueb.cf9.petcare.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import java.util.List;

@Entity
@Table(name = "owners")
@Getter
@Setter
@NoArgsConstructor

public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String firstName;

    @NotBlank
    @Column(nullable = false)
    private String lastName;

    @NotBlank
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String phoneNumber;

    @OneToMany(
            mappedBy = "owner",
            cascade = CascadeType.REMOVE,
            orphanRemoval = true
    )
    private List<Pet> pets;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private AppUser appUser;

}
