package gr.aueb.cf9.petcare.repository;

import gr.aueb.cf9.petcare.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {

    Optional<Vaccination> findByIdAndPetOwnerAppUserUsername(
            Long id,
            String username
    );

    List<Vaccination> findAllByPetOwnerAppUserUsername(String username);

}