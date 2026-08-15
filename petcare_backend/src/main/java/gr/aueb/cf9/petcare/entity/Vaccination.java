package gr.aueb.cf9.petcare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "vaccinations")
@Getter
@Setter
@NoArgsConstructor

public class Vaccination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String vaccineName;

    @NotNull
    @Column(nullable = false)
    private LocalDate vaccinationDate;

    @Column
    private LocalDate nextDueDate;

    @Column(length = 100)
    private String batchNumber;

    @Column(length = 1000)
    private String notes;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

}
