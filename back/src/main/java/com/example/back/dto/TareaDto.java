package com.miempresa.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record TareaDto(@NotBlank String nombre, List<SerieDto> series) {}