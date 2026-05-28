import React from 'react';
import { useAppContext } from '../../context/AppContext';

export const StudentHorario = () => {
  const { materiasInscritas } = useAppContext();

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const horas = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  // Función simplificada para parsear el string de horario y mapearlo a la cuadrícula
  // Ej: 'Lunes 08:00-10:00, Miércoles 08:00-10:00'
  const obtenerMateriaEnHorario = (dia: string, horaBase: string) => {
    for (const materia of materiasInscritas) {
      if (materia.horario.includes(`${dia} ${horaBase}`)) {
        return materia;
      }
    }
    return null;
  };

  return (
    <div className="space-y-6 h-full flex flex-col font-sans">
      <div className="mb-5">
        <h1 className="text-[20px] font-semibold text-ud-dark font-sans mb-1">Mi horario</h1>
        <p className="text-[13px] text-ud-muted font-sans">Período 2025-1</p>
      </div>

      <div className="bg-white rounded-[12px] border border-gray-200 p-5 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto h-full">
          <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-0.5 font-sans text-[11px] h-full min-w-[700px]">
            <div className="bg-transparent text-ud-muted p-1.5 text-center rounded-[4px] font-semibold">Hora</div>
            {dias.map(dia => (
              <div key={dia} className="bg-ud-dark text-white p-1.5 text-center rounded-[4px] font-semibold">{dia}</div>
            ))}
            
            {horas.map(hora => (
              <React.Fragment key={hora}>
                <div className="bg-ud-bg p-1.5 text-center text-ud-muted flex items-center justify-center rounded-[4px]">
                  {hora}
                </div>
                {dias.map(dia => {
                  const materia = obtenerMateriaEnHorario(dia, hora);
                  return materia ? (
                    <div key={`${dia}-${hora}`} className="bg-ud-green-light text-ud-green p-1.5 rounded-[4px] font-semibold border-l-[3px] border-ud-green text-[10px] leading-[1.3] min-h-[36px] flex flex-col justify-center overflow-hidden">
                      <b className="truncate w-full block">{materia.nombre}</b>
                      <span className="truncate w-full font-normal opacity-80 mt-0.5">{materia.codigo}</span>
                    </div>
                  ) : (
                    <div key={`${dia}-${hora}`} className="bg-ud-bg rounded-[4px] min-h-[36px]"></div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
