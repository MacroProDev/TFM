import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale'
import 'react-day-picker/style.css'

const formatear = (fecha) =>
  fecha ? fecha.toLocaleDateString('es-ES') : '-'

export default function Calendario() {
  const [rango, setRango] = useState()

  return (
    <div>
      <DayPicker
        mode="single"
        locale={es}
       // selected={rango}
        //onSelect={setRango}
     //   disabled={{ before: new Date() }} // no permite fech
        weekStartsOn={1}                  // la semana empieza en lunes
      />

      <p><strong>Ida:</strong> {formatear(rango?.from)}</p>
      <p><strong>Vuelta:</strong> {formatear(rango?.to)}</p>
    </div>
  )
}