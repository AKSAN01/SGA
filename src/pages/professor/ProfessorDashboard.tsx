import { useAppContext } from '../../context/AppContext';
import { BookOpen } from 'lucide-react';

export const ProfessorDashboard = () => {
  const { currentUser, materiasDisponibles } = useAppContext();

  // En un caso real veríamos cuáles materias enseña este profesor
  const misMaterias = materiasDisponibles.filter(m => m.profesor === currentUser?.name);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bienvenido(a), Prof. {currentUser?.name}</h2>
        <p className="mt-1 text-sm text-gray-500">Panel de gestión docente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <BookOpen size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Cursos Asignados</p>
            <p className="text-2xl font-bold text-gray-900">{misMaterias.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
