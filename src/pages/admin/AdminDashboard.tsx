import { useAppContext } from '../../context/AppContext';
import { Users } from 'lucide-react';

export const AdminDashboard = () => {
  const { currentUser, estudiantesAdmin } = useAppContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bienvenido(a), {currentUser?.name}</h2>
        <p className="mt-1 text-sm text-gray-500">Panel de administración de la Secretaría Académica.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-ud-green-light rounded-lg">
            <Users size={24} className="text-ud-green" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Estudiantes Activos</p>
            <p className="text-2xl font-bold text-gray-900">{estudiantesAdmin.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
