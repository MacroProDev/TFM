package com.miempresa.backend.controller;

import com.miempresa.backend.dto.*;
import com.miempresa.backend.service.RutinaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/rutinas")
public class RutinaController {

    private final RutinaService service;

    public RutinaController(RutinaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<RutinaResponse> crear(@Valid @RequestBody RutinaRequest req) {
        RutinaResponse creada = service.crear(req);
        return ResponseEntity.created(URI.create("/api/rutinas/" + creada.id())).body(creada);
    }

    @GetMapping
    public List<RutinaResponse> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RutinaResponse> obtener(@PathVariable Long id) {
        RutinaResponse r = service.obtener(id);
        return r == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(r);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return service.eliminar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}