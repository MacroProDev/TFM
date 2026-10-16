import './App.css'
import Calendario from './Calendario'

function App() {
  return (
    <div className="app">
      <header className="cabecera">
        <h1>Mi proyecto</h1>
        <nav>
          <a href="#">Inicio</a>
          <a href="#">Reservas</a>
          <a href="#">Contacto</a>
        </nav>
      </header>

      <div className="contenido">
        <aside className="columna-izquierda">
          <Calendario />
        </aside>

        <main className="columna-derecha">
          <h2>Contenido principal</h2>
          <p>Aquí irán los resultados.</p>
        </main>
      </div>
    </div>
  )
}

export default App