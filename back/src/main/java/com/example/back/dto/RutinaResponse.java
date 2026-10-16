package com.miempresa.backend.dto;

import java.util.List;

public record RutinaResponse(Long id, String nombre, List<TareaDto> tareas) {}