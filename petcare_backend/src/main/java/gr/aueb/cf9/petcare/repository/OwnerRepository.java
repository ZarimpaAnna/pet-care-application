package gr.aueb.cf9.petcare.repository;

import gr.aueb.cf9.petcare.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

    Optional<Owner> findByAppUserUsername(String username);
    Optional<Owner> findByEmail(String email);

}