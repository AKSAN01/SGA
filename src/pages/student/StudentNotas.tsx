import { useAppContext } from '../../context/AppContext';

export const StudentNotas = () => {
  const { currentUser, materiasInscritas, notas, materiasDisponibles } = useAppContext();

  // Consolidar notas (mezclando notas con el nombre de la materia)
  // En un sistema real, el backend enviaría la info relacionada
  const historial = notas
    .filter(n => n.estudianteId === currentUser?.id)
    .map(nota => {
      // Buscar en disponibles o inscritas para obtener el nombre
      const mat = materiasDisponibles.find(m => m.id === nota.materiaId) || materiasInscritas.find(m => m.id === nota.materiaId);
      return {
        ...nota,
        nombreMateria: mat?.nombre || 'Materia Desconocida',
        creditos: mat?.creditos || 0,
        codigo: mat?.codigo || 'N/A'
      };
    });

  return (
    <div className="space-y-6 font-sans">
      <div className="mb-5">
        <h1 className="text-[20px] font-semibold text-ud-dark font-sans mb-1">Mis calificaciones</h1>
        <p className="text-[13px] text-ud-muted font-sans">Historial académico completo</p>
      </div>

      <div className="bg-white rounded-[12px] border border-gray-200 p-5 mb-4">
        <h3 className="text-[14px] font-semibold font-sans text-ud-dark mb-3">Notas por período</h3>
        
        <table className="w-full border-collapse font-sans text-[13px]">
          <thead>
            <tr>
              <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Código</th>
              <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Asignatura</th>
              <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold text-center">Créditos</th>
              <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold text-center">Nota Final</th>
              <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold text-right">Estado</th>
            </tr>
          </thead>
          <tbody>
            {historial.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[13px] text-ud-muted">
                  No tienes calificaciones registradas.
                </td>
              </tr>
            ) : (
              historial.map((item, idx) => (
                <tr key={idx} className="hover:bg-ud-bg">
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1EFE8] text-ud-muted">{item.codigo}</span>
                  </td>
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">{item.nombreMateria}</td>
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark text-center">{item.creditos}</td>
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-center">
                    <b className={item.calificacion >= 3.0 ? 'text-ud-green' : 'text-ud-danger'}>
                      {item.calificacion.toFixed(1)}
                    </b>
                  </td>
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      item.calificacion >= 3.0 ? 'bg-ud-green-light text-ud-green' : 'bg-[#FCEBEB] text-ud-danger'
                    }`}>
                      {item.calificacion >= 3.0 ? 'Aprobado' : 'Reprobado'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
