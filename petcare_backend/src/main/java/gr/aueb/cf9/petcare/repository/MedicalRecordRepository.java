package gr.aueb.cf9.petcare.repository;

import gr.aueb.cf9.petcare.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    Optional<MedicalRecord> findByIdAndPetOwnerAppUserUsername(
            Long id,
            String username
    );

    List<MedicalRecord>  findAllByPetOwnerAppUserUsername(String username);

}