package gr.aueb.cf9.petcare.controller;

import gr.aueb.cf9.petcare.dto.AppUserInsertDTO;
import gr.aueb.cf9.petcare.dto.AppUserReadOnlyDTO;
import gr.aueb.cf9.petcare.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserReadOnlyDTO createUser(@Valid @RequestBody AppUserInsertDTO dto) {
        return appUserService.createUser(dto);
    }

    @GetMapping
    public List<AppUserReadOnlyDTO> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        appUserService.deleteUser(id);
    }
}