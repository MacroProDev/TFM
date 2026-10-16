import { useState } from 'react'
import './CreadorRutinas.css'

const SERIES_INICIALES = 3
const serieVacia = () => ({ reps: '', peso: '' })

export default function CreadorRutinas() {
  const [nombreRutina, setNombreRutina] = useState('')
  const [tareas, setTareas] = useState([])

  const anadirTarea = () =>
    setTareas((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        nombre: '',
        series: Array.from({ length: SERIES_INICIALES }, serieVacia),
      },
    ])

  const eliminarTarea = (id) =>
    setTareas((prev) => prev.filter((t) => t.id !== id))

  const cambiarNombre = (id, valor) =>
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, nombre: valor } : t))
    )

  // Solo afecta a la tarea indicada
  const anadirSerie = (id) =>
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, series: [...t.series, serieVacia()] } : t
      )
    )

  const quitarSerie = (id) =>
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id && t.series.length > 1
          ? { ...t, series: t.series.slice(0, -1) }
          : t
      )
    )

  const cambiarSerie = (id, indice, campo, valor) =>
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              series: t.series.map((s, i) =>
                i === indice ? { ...s, [campo]: valor } : s
              ),
            }
          : t
      )
    )

  const guardar = () => {
    const rutina = { nombre: nombreRutina, tareas }
    console.log(JSON.stringify(rutina, null, 2)) // luego aquí irá el fetch al backend
  }

  return (
    <section className="rutina">
      <h2>Creador de rutinas</h2>

      <input
        className="rutina-nombre"
        type="text"
        placeholder="Nombre de la rutina"
        value={nombreRutina}
        onChange={(e) => setNombreRutina(e.target.value)}
      />

      <button className="btn-tarea" onClick={anadirTarea}>
        + Tarea
      </button>

      {tareas.length === 0 ? (
        <p className="rutina-vacia">Aún no hay tareas. Pulsa «+ Tarea».</p>
      ) : (
        <ul className="lista-tareas">
          {tareas.map((tarea) => (
            <li key={tarea.id} className="tarea">
              <div className="tarea-cabecera">
                <input
                  className="tarea-nombre"
                  type="text"
                  placeholder="Ej: Press banca"
                  value={tarea.nombre}
                  onChange={(e) => cambiarNombre(tarea.id, e.target.value)}
                />

                <div className="tarea-acciones">
                  <button onClick={() => anadirSerie(tarea.id)}>+ Serie</button>
                  <button
                    onClick={() => quitarSerie(tarea.id)}
                    disabled={tarea.series.length <= 1}
                  >
                    − Serie
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarTarea(tarea.id)}
                    title="Eliminar tarea"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="tarea-series">
                {tarea.series.map((serie, i) => (
                  <div key={i} className="serie">
                    <span className="serie-titulo">Serie {i + 1}</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="reps"
                      value={serie.reps}
                      onChange={(e) =>
                        cambiarSerie(tarea.id, i, 'reps', e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="kg"
                      value={serie.peso}
                      onChange={(e) =>
                        cambiarSerie(tarea.id, i, 'peso', e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {tareas.length > 0 && (
        <button className="btn-guardar" onClick={guardar}>
          Guardar rutina
        </button>
      )}
    </section>
  )
}