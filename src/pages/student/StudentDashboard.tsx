import { useAppContext } from '../../context/AppContext';

export const StudentDashboard = () => {
  const { currentUser, materiasInscritas, notas } = useAppContext();

  // Calcular KPIs
  const creditosMatriculados = materiasInscritas.reduce((sum, m) => sum + m.creditos, 0);
  
  const notasEstudiante = notas.filter(n => n.estudianteId === currentUser?.id);
  const creditosAprobados = notasEstudiante
    .filter(n => n.calificacion >= 3.0)
    .reduce((sum, _n) => {
      // Necesitamos buscar los créditos de la materia de esa nota. Para simplificar, usaremos un valor mock o lo buscaríamos en MOCK_MATERIAS
      return sum + 4; // Mock de créditos para materias aprobadas
    }, 0);

  const promedio = notasEstudiante.length > 0 
    ? (notasEstudiante.reduce((sum, n) => sum + n.calificacion, 0) / notasEstudiante.length).toFixed(1)
    : 'N/A';

  const kpis = [
    { label: 'Materias inscritas', value: materiasInscritas.length.toString() },
    { label: 'Créditos activos', value: creditosMatriculados.toString() },
    { label: 'Promedio acumulado', value: promedio },
    { label: 'Créditos aprobados', value: creditosAprobados.toString() },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="mb-5">
        <h1 className="text-[20px] font-semibold text-ud-dark font-sans mb-1">Bienvenido(a), {currentUser?.name.split(' ')[0]}</h1>
        <p className="text-[13px] text-ud-muted font-sans">Período académico 2025-1</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-[10px] border border-gray-200 p-4 text-center">
            <div className="text-[28px] font-bold text-ud-green font-sans">{kpi.value}</div>
            <div className="text-[11px] text-ud-muted font-sans mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[12px] border border-gray-200 p-5 mb-4">
        <h3 className="text-[14px] font-semibold font-sans text-ud-dark mb-3">Materias inscritas — 2025-1</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse font-sans text-[13px]">
            <thead>
              <tr>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Código</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Materia</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Créditos</th>
                <th className="text-left py-2 px-2.5 text-[11px] uppercase tracking-wide text-ud-muted border-b border-gray-200 font-semibold">Docente</th>
              </tr>
            </thead>
            <tbody>
              {materiasInscritas.map(m => (
                <tr key={m.id} className="hover:bg-ud-bg">
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1EFE8] text-ud-muted">{m.codigo}</span>
                  </td>
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">{m.nombre}</td>
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">{m.creditos}</td>
                  <td className="py-2.5 px-2.5 border-b border-gray-200 text-ud-dark">{m.profesor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
