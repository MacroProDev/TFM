import './App.css'
import Calendario from './Calendario'
import CreadorRutinas from './CreadorRutinas'

function App() {
  return (
    <div className="app">
      <header className="cabecera">
        <h1>Mi proyecto</h1>
        <nav>
          <a href="#">Inicio</a>
          <a href="#">Rutinas</a>
          <a href="#">Contacto</a>
        </nav>
      </header>

      <div className="contenido">
        <aside className="columna-izquierda">
          <Calendario />
        </aside>

        <main className="columna-derecha">
          <CreadorRutinas />
        </main>
      </div>
    </div>
  )
}

export default App