package com.miempresa.backend.service;

import com.miempresa.backend.dto.*;
import com.miempresa.backend.model.*;
import com.miempresa.backend.repository.RutinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RutinaService {

    private final RutinaRepository repo;

    public RutinaService(RutinaRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public RutinaResponse crear(RutinaRequest req) {
        Rutina rutina = new Rutina();
        rutina.setNombre(req.nombre());

        int ordenTarea = 0;
        for (TareaDto td : req.tareas()) {
            Tarea tarea = new Tarea();
            tarea.setNombre(td.nombre());
            tarea.setOrden(ordenTarea++);

            if (td.series() != null) {
                int ordenSerie = 0;
                for (SerieDto sd : td.series()) {
                    Serie serie = new Serie();
                    serie.setOrden(ordenSerie++);
                    serie.setReps(sd.reps());
                    serie.setPeso(sd.peso());
                    tarea.anadirSerie(serie);
                }
            }
            rutina.anadirTarea(tarea);
        }
        return aRespuesta(repo.save(rutina));
    }

    @Transactional(readOnly = true)
    public List<RutinaResponse> listar() {
        return repo.findAll().stream().map(this::aRespuesta).toList();
    }

    @Transactional(readOnly = true)
    public RutinaResponse obtener(Long id) {
        return repo.findById(id).map(this::aRespuesta).orElse(null);
    }

    @Transactional
    public boolean eliminar(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

    private RutinaResponse aRespuesta(Rutina r) {
        List<TareaDto> tareas = r.getTareas().stream()
                .map(t -> new TareaDto(
                        t.getNombre(),
                        t.getSeries().stream()
                                .map(s -> new SerieDto(s.getReps(), s.getPeso()))
                                .toList()))
                .toList();
        return new RutinaResponse(r.getId(), r.getNombre(), tareas);
    }
}