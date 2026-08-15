package gr.aueb.cf9.petcare.config;

import gr.aueb.cf9.petcare.entity.AppUser;
import gr.aueb.cf9.petcare.entity.MedicalRecord;
import gr.aueb.cf9.petcare.entity.Owner;
import gr.aueb.cf9.petcare.entity.Pet;
import gr.aueb.cf9.petcare.entity.Vaccination;
import gr.aueb.cf9.petcare.entity.enums.Gender;
import gr.aueb.cf9.petcare.entity.enums.Role;
import gr.aueb.cf9.petcare.repository.AppUserRepository;
import gr.aueb.cf9.petcare.repository.MedicalRecordRepository;
import gr.aueb.cf9.petcare.repository.OwnerRepository;
import gr.aueb.cf9.petcare.repository.PetRepository;
import gr.aueb.cf9.petcare.repository.VaccinationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final OwnerRepository ownerRepository;
    private final PetRepository petRepository;
    private final VaccinationRepository vaccinationRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            AppUserRepository appUserRepository,
            OwnerRepository ownerRepository,
            PetRepository petRepository,
            VaccinationRepository vaccinationRepository,
            MedicalRecordRepository medicalRecordRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.appUserRepository = appUserRepository;
        this.ownerRepository = ownerRepository;
        this.petRepository = petRepository;
        this.vaccinationRepository = vaccinationRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (appUserRepository.count() > 0) {
            return;
        }

        // =========================
        // USERS
        // =========================

        AppUser admin1 = new AppUser();
        admin1.setUsername("admin1");
        admin1.setPassword(passwordEncoder.encode("0000"));
        admin1.setRole(Role.ADMIN);
        admin1 = appUserRepository.save(admin1);

        AppUser user1 = new AppUser();
        user1.setUsername("user1");
        user1.setPassword(passwordEncoder.encode("0000"));
        user1.setRole(Role.USER);
        user1 = appUserRepository.save(user1);

        AppUser user2 = new AppUser();
        user2.setUsername("user2");
        user2.setPassword(passwordEncoder.encode("0000"));
        user2.setRole(Role.USER);
        user2 = appUserRepository.save(user2);


        // =========================
        // OWNERS
        // =========================

        Owner adminOwner = new Owner();
        adminOwner.setFirstName("Admin");
        adminOwner.setLastName("Petcare");
        adminOwner.setEmail("admin1@petcare.local");
        adminOwner.setPhoneNumber("6900000001");
        adminOwner.setAppUser(admin1);
        adminOwner = ownerRepository.save(adminOwner);

        Owner owner1 = new Owner();
        owner1.setFirstName("Anna");
        owner1.setLastName("Zarimpa");
        owner1.setEmail("user1@petcare.local");
        owner1.setPhoneNumber("6900000002");
        owner1.setAppUser(user1);
        owner1 = ownerRepository.save(owner1);

        Owner owner2 = new Owner();
        owner2.setFirstName("Nikos");
        owner2.setLastName("Georgiou");
        owner2.setEmail("user2@petcare.local");
        owner2.setPhoneNumber("6900000003");
        owner2.setAppUser(user2);
        owner2 = ownerRepository.save(owner2);


        // =========================
        // PETS
        // =========================

        Pet pico = new Pet();
        pico.setName("Pico");
        pico.setSpecies("Cat");
        pico.setBreed("European Shorthair");
        pico.setMicrochipNumber("900215000111111");
        pico.setBirthDate(LocalDate.of(2020, 6, 15));
        pico.setColor("Orange");
        pico.setSterilized(true);
        pico.setGender(Gender.MALE);
        pico.setNotes("Chronic rhinitis. Needs regular check-ups.");
        pico.setPhotoUrl("");
        pico.setOwner(adminOwner);
        pico = petRepository.save(pico);

        Pet luna = new Pet();
        luna.setName("Luna");
        luna.setSpecies("Cat");
        luna.setBreed("European Shorthair");
        luna.setMicrochipNumber("900215000222222");
        luna.setBirthDate(LocalDate.of(2024, 5, 10));
        luna.setColor("Calico");
        luna.setSterilized(false);
        luna.setGender(Gender.FEMALE);
        luna.setNotes("Playful and energetic.");
        luna.setPhotoUrl("");
        luna.setOwner(owner1);
        luna = petRepository.save(luna);

        Pet nova = new Pet();
        nova.setName("Nova");
        nova.setSpecies("Cat");
        nova.setBreed("European Shorthair");
        nova.setMicrochipNumber("");
        nova.setBirthDate(LocalDate.of(2024, 5, 10));
        nova.setColor("Black");
        nova.setSterilized(false);
        nova.setGender(Gender.FEMALE);
        nova.setNotes("Still waiting for microchip.");
        nova.setPhotoUrl("");
        nova.setOwner(owner1);
        nova = petRepository.save(nova);

        Pet rex = new Pet();
        rex.setName("Rex");
        rex.setSpecies("Dog");
        rex.setBreed("Golden Retriever");
        rex.setMicrochipNumber("900215000333333");
        rex.setBirthDate(LocalDate.of(2021, 3, 22));
        rex.setColor("Golden");
        rex.setSterilized(true);
        rex.setGender(Gender.MALE);
        rex.setNotes("Friendly and loves swimming.");
        rex.setPhotoUrl("");
        rex.setOwner(owner2);
        rex = petRepository.save(rex);


        // =========================
        // VACCINATIONS
        // =========================

        Vaccination picoRabies = new Vaccination();
        picoRabies.setVaccineName("Rabies");
        picoRabies.setVaccinationDate(LocalDate.of(2026, 7, 15));
        picoRabies.setNextDueDate(LocalDate.of(2027, 7, 15));
        picoRabies.setBatchNumber("RAB-2026-001");
        picoRabies.setNotes("Annual vaccination");
        picoRabies.setPet(pico);
        vaccinationRepository.save(picoRabies);

        Vaccination lunaTricat = new Vaccination();
        lunaTricat.setVaccineName("Tricat");
        lunaTricat.setVaccinationDate(LocalDate.of(2026, 7, 20));
        lunaTricat.setNextDueDate(LocalDate.of(2027, 7, 20));
        lunaTricat.setBatchNumber("TRI-2026-015");
        lunaTricat.setNotes("Booster dose");
        lunaTricat.setPet(luna);
        vaccinationRepository.save(lunaTricat);

        Vaccination rexDhppiL = new Vaccination();
        rexDhppiL.setVaccineName("DHPPiL");
        rexDhppiL.setVaccinationDate(LocalDate.of(2026, 5, 10));
        rexDhppiL.setNextDueDate(LocalDate.of(2027, 5, 10));
        rexDhppiL.setBatchNumber("DOG-2026-007");
        rexDhppiL.setNotes("Annual booster");
        rexDhppiL.setPet(rex);
        vaccinationRepository.save(rexDhppiL);

        Vaccination rexRabies = new Vaccination();
        rexRabies.setVaccineName("Rabies");
        rexRabies.setVaccinationDate(LocalDate.of(2025, 8, 1));
        rexRabies.setNextDueDate(LocalDate.of(2026, 8, 1));
        rexRabies.setBatchNumber("RAB-2025-155613");
        rexRabies.setNotes("Annual vaccination");
        rexRabies.setPet(rex);
        vaccinationRepository.save(rexRabies);

        Vaccination rexFelv = new Vaccination();
        rexFelv.setVaccineName("FeLV");
        rexFelv.setVaccinationDate(LocalDate.of(2026, 7, 1));
        rexFelv.setNextDueDate(null);
        rexFelv.setBatchNumber("458145-54496-2");
        rexFelv.setNotes("");
        rexFelv.setPet(rex);
        vaccinationRepository.save(rexFelv);

        Vaccination rexFvrcp = new Vaccination();
        rexFvrcp.setVaccineName("FVRCP");
        rexFvrcp.setVaccinationDate(LocalDate.of(2025, 8, 15));
        rexFvrcp.setNextDueDate(LocalDate.of(2026, 8, 15));
        rexFvrcp.setBatchNumber("59598985-5598");
        rexFvrcp.setNotes("");
        rexFvrcp.setPet(rex);
        vaccinationRepository.save(rexFvrcp);


        // =========================
        // MEDICAL RECORDS
        // =========================

        MedicalRecord picoRecord = new MedicalRecord();
        picoRecord.setVisitDate(LocalDate.of(2026, 6, 20));
        picoRecord.setReason("Routine check-up");
        picoRecord.setDiagnosis("Chronic rhinitis");
        picoRecord.setTreatment("Saline nebulization and monitoring");
        picoRecord.setNotes("Condition stable.");
        picoRecord.setPet(pico);
        medicalRecordRepository.save(picoRecord);

        MedicalRecord lunaRecord = new MedicalRecord();
        lunaRecord.setVisitDate(LocalDate.of(2026, 7, 20));
        lunaRecord.setReason("Vaccination visit");
        lunaRecord.setDiagnosis("Healthy");
        lunaRecord.setTreatment("Routine vaccination");
        lunaRecord.setNotes("No abnormalities detected.");
        lunaRecord.setPet(luna);
        medicalRecordRepository.save(lunaRecord);

        MedicalRecord novaRecord = new MedicalRecord();
        novaRecord.setVisitDate(LocalDate.of(2026, 7, 18));
        novaRecord.setReason("First examination");
        novaRecord.setDiagnosis("Healthy kitten");
        novaRecord.setTreatment("General health check");
        novaRecord.setNotes("Recommended vaccination schedule.");
        novaRecord.setPet(nova);
        medicalRecordRepository.save(novaRecord);

        MedicalRecord rexRecord = new MedicalRecord();
        rexRecord.setVisitDate(LocalDate.of(2026, 5, 10));
        rexRecord.setReason("Annual health check");
        rexRecord.setDiagnosis("Excellent health");
        rexRecord.setTreatment("Routine examination");
        rexRecord.setNotes("Weight and vital signs within normal limits.");
        rexRecord.setPet(rex);
        medicalRecordRepository.save(rexRecord);
    }
}