package gr.aueb.cf9.petcare.dto;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@JsonPropertyOrder({"timestamp", "status", "message", "errors"})
public class ErrorResponseDTO {

    private LocalDateTime timestamp;

    private int status;

    private String message;

    private Map<String, String> errors;
}