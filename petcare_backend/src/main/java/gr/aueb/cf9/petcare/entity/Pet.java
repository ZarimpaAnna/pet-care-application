package gr.aueb.cf9.petcare.entity;

import gr.aueb.cf9.petcare.entity.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

// import gr.aueb.cf9.petcare.entity.Owner;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "pets")
@Getter
@Setter
@NoArgsConstructor

public class Pet {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank
        @Column(nullable = false)
        private String name;

        @NotBlank
        @Column(nullable = false)
        private String species;

        @Column
        private String breed;

        @Column
        private String microchipNumber;

        @Column
        private LocalDate birthDate;

        @Column
        private String color;

        @Column
        private Boolean sterilized;

        @Column
        @Enumerated(EnumType.STRING)
        private Gender gender;

        @Column(length = 1000)
        private String notes;

        @Column
        private String photoUrl;

        @ManyToOne
        @JoinColumn(name = "owner_id", nullable = false)
        private Owner owner;

        @OneToMany(mappedBy = "pet", cascade = CascadeType.REMOVE, orphanRemoval = true)
        private List<Vaccination> vaccinations;

        @OneToMany(mappedBy = "pet", cascade = CascadeType.REMOVE, orphanRemoval = true)
        private List<MedicalRecord> medicalRecords;

}
