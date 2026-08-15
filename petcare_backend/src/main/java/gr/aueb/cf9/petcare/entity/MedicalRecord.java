package gr.aueb.cf9.petcare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "medicalrecords")
@Getter
@Setter
@NoArgsConstructor

public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private LocalDate visitDate;

    @NotBlank
    @Column(nullable = false, length = 1000)
    private String reason;

    @Column(length = 1000)
    private String diagnosis;

    @Column(length = 1000)
    private String treatment;

    @Column(length = 5000)
    private String notes;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

}
