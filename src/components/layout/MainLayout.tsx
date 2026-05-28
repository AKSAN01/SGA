import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const MainLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { currentUser } = useAppContext();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-ud-bg overflow-hidden">
      {/* Barra superior móvil */}
      {currentUser && (
        <header className="flex md:hidden items-center justify-between px-4 py-3 bg-ud-dark text-white border-b border-white/10 shadow-sm z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-[#9FE1CB] cursor-pointer"
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
            <div>
              <span className="text-[15px] font-extrabold text-[#9FE1CB] tracking-tight">SGA · UD</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2 py-0.5 bg-white/10 rounded-full font-bold text-white uppercase tracking-wider">
              {currentUser.role === 'estudiante' ? 'Est.' : currentUser.role === 'profesor' ? 'Doc.' : 'Adm.'}
            </span>
          </div>
        </header>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

      {/* Contenedor de contenido */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-ud-bg p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
