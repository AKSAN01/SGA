import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Users, 
  LogOut,
  LayoutDashboard,
  Map,
  Award
} from 'lucide-react';

export const Sidebar = () => {
  const { currentUser, logout } = useAppContext();

  if (!currentUser) return null;

  const getNavItems = () => {
    switch (currentUser.role) {
      case 'estudiante':
        return [
          { path: '/estudiante', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { path: '/estudiante/matricula', label: 'Matrícula', icon: <BookOpen size={20} /> },
          { path: '/estudiante/horario', label: 'Horario', icon: <Calendar size={20} /> },
          { path: '/estudiante/notas', label: 'Mis Notas', icon: <GraduationCap size={20} /> },
          { path: '/estudiante/plan-estudio', label: 'Plan de Estudios', icon: <Map size={20} /> },
          { path: '/estudiante/certificado', label: 'Certificados', icon: <Award size={20} /> },
        ];
      case 'profesor':
        return [
          { path: '/profesor', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { path: '/profesor/calificaciones', label: 'Calificaciones', icon: <BookOpen size={20} /> },
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { path: '/admin/estudiantes', label: 'Estudiantes', icon: <Users size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-[210px] bg-ud-dark text-white flex flex-col h-full shrink-0">
      <div className="py-5 px-4 border-b border-white/10">
        <div className="text-[18px] font-bold text-[#9FE1CB] tracking-tight">SGA·UD</div>
        <div className="text-[10px] text-white/50 font-sans mt-[1px]">Sistema Académico</div>
      </div>

      <div className="py-3 px-4 bg-white/5 border-b border-white/10">
        <div className="text-[12px] font-semibold font-sans text-white">{currentUser.name}</div>
        <div className="text-[10px] font-sans text-[#9FE1CB] uppercase tracking-wide mt-0.5">
          {currentUser.role === 'estudiante' ? 'Estudiante' : currentUser.role === 'profesor' ? 'Docente' : 'Administrador'}
        </div>
      </div>

      <div className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 font-sans text-[13px] border-l-[3px] transition-all duration-150 ${
                isActive 
                  ? 'bg-[#1d9e75]/20 text-[#9FE1CB] border-[#9FE1CB]' 
                  : 'text-white/70 border-transparent hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <div className="flex items-center justify-center w-4 h-4">
              {item.icon}
            </div>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-3 border-t border-white/10">
        <button 
          onClick={logout}
          className="flex items-center gap-2 font-sans text-[12px] text-white/50 hover:text-white py-1.5 w-full cursor-pointer transition-colors"
        >
          <LogOut size={16} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};
