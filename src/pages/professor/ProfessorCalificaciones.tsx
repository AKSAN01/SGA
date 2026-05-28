import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export const ProfessorCalificaciones = () => {
  const { currentUser, materiasDisponibles, estudiantesAdmin, notas, registrarNota } = useAppContext();

  // Filtrar las materias dictadas por este profesor
  const misMaterias = materiasDisponibles.filter(m => m.profesor === currentUser?.name);

  const [selectedMateria, setSelectedMateria] = useState<string>(misMaterias[0]?.id || '');

  const handleNotaChange = (estudianteId: string, value: string) => {
    const calificacion = parseFloat(value);
    if (!isNaN(calificacion) && calificacion >= 0 && calificacion <= 5) {
      registrarNota({
        materiaId: selectedMateria,
        estudianteId,
        calificacion,
        periodo: '2023-1'
      });
    }
  };

  const getNotaValue = (estudianteId: string) => {
    const nota = notas.find(n => n.materiaId === selectedMateria && n.estudianteId === estudianteId);
    return nota ? nota.calificacion.toString() : '';
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Carga de Calificaciones</h2>
        <p className="mt-1 text-sm text-gray-500">Registra o actualiza las notas de tus estudiantes por asignatura.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
        <label htmlFor="materia" className="block text-sm font-medium text-gray-700 mb-2">Selecciona la Asignatura</label>
        <select
          id="materia"
          value={selectedMateria}
          onChange={(e) => setSelectedMateria(e.target.value)}
          className="block w-full md:w-1/3 border-gray-300 rounded-md shadow-sm focus:ring-ud-green focus:border-ud-green sm:text-sm border p-2"
        >
          {misMaterias.map(m => (
            <option key={m.id} value={m.id}>{m.codigo} - {m.nombre}</option>
          ))}
        </select>
      </div>

      {selectedMateria && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Listado de Estudiantes (Periodo 2023-1)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Calificación (0.0 - 5.0)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estudiantesAdmin.map((estudiante) => (
                  <tr key={estudiante.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{estudiante.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estudiante.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={getNotaValue(estudiante.id)}
                        onChange={(e) => handleNotaChange(estudiante.id, e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-ud-green focus:border-ud-green sm:text-sm border p-2 text-center font-semibold"
                        placeholder="--"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
