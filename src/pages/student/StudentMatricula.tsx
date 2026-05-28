import { useAppContext } from '../../context/AppContext';

export const StudentMatricula = () => {
  const { materiasDisponibles, materiasInscritas, inscribirMateria, cancelarMateria } = useAppContext();

  const handleInscribir = (id: string) => {
    inscribirMateria(id);
  };

  const handleCancelar = (id: string) => {
    cancelarMateria(id);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="mb-5">
        <h1 className="text-[20px] font-semibold text-ud-dark font-sans mb-1">Matrícula de asignaturas</h1>
        <p className="text-[13px] text-ud-muted font-sans">Período 2025-1 — Matrícula abierta</p>
      </div>

      {/* Materias Inscritas */}
      <div className="bg-white rounded-[12px] border border-gray-200 p-5 mb-4">
        <h3 className="text-[14px] font-semibold font-sans text-ud-dark mb-3">Materias inscritas</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse font-sans text-[13px]">
            <thead>
              <tr>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Código</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Materia</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold text-center">Créditos</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Horario</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {materiasInscritas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[13px] text-ud-muted">
                    No tienes materias inscritas actualmente.
                  </td>
                </tr>
              ) : (
                materiasInscritas.map((materia) => (
                  <tr key={materia.id} className="hover:bg-ud-bg">
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-ud-green-light text-ud-green">{materia.codigo}</span>
                    </td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">{materia.nombre}</td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark text-center">{materia.creditos}</td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">{materia.horario}</td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">
                      <button 
                        onClick={() => handleCancelar(materia.id)}
                        className="px-[10px] py-[4px] border border-ud-danger text-ud-danger rounded-[7px] text-[11px] font-semibold hover:bg-ud-bg transition-colors"
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Materias Disponibles */}
      <div className="bg-white rounded-[12px] border border-gray-200 p-5 mb-4">
        <h3 className="text-[14px] font-semibold font-sans text-ud-dark mb-3">Asignaturas disponibles</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse font-sans text-[13px]">
            <thead>
              <tr>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Código</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Materia</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold text-center">Créditos</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold text-center">Cupos</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Docente</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {materiasDisponibles.map((materia) => {
                const yaInscrita = materiasInscritas.some(m => m.id === materia.id);
                if (yaInscrita) return null;

                const sinCupos = materia.cuposDisponibles === 0;

                return (
                  <tr key={materia.id} className="hover:bg-ud-bg">
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1EFE8] text-ud-muted">{materia.codigo}</span>
                    </td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">{materia.nombre}</td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark text-center">{materia.creditos}</td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        sinCupos ? 'bg-[#FCEBEB] text-ud-danger' : 'bg-ud-green-light text-ud-green'
                      }`}>
                        {sinCupos ? 'Sin cupos' : `${materia.cuposDisponibles} disp.`}
                      </span>
                    </td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">{materia.profesor}</td>
                    <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">
                      <button 
                        onClick={() => handleInscribir(materia.id)}
                        disabled={sinCupos}
                        className={`px-[10px] py-[4px] rounded-[7px] text-[11px] font-semibold transition-colors ${
                          sinCupos 
                            ? 'border border-gray-200 text-ud-dark opacity-40 cursor-not-allowed bg-transparent' 
                            : 'bg-ud-green text-white hover:bg-ud-green-mid'
                        }`}
                      >
                        {sinCupos ? 'Sin cupos' : 'Inscribir'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
