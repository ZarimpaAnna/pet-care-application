package gr.aueb.cf9.petcare.repository;

import gr.aueb.cf9.petcare.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findAllByOwnerAppUserUsername(String username);

    Optional<Pet> findByIdAndOwnerAppUserUsername(
            Long id,
            String username
    );

}