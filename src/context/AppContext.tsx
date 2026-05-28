import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Materia, Nota } from '../data/mockData';
import { USERS, MOCK_MATERIAS, MOCK_NOTAS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  materiasDisponibles: Materia[];
  materiasInscritas: Materia[];
  notas: Nota[];
  estudiantesAdmin: User[];
  login: (email: string) => boolean;
  logout: () => void;
  inscribirMateria: (materiaId: string) => boolean;
  cancelarMateria: (materiaId: string) => void;
  registrarNota: (nota: Nota) => void;
  agregarEstudiante: (estudiante: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [materiasDisponibles, setMateriasDisponibles] = useState<Materia[]>(MOCK_MATERIAS);
  const [materiasInscritas, setMateriasInscritas] = useState<Materia[]>([]);
  const [notas, setNotas] = useState<Nota[]>(MOCK_NOTAS);
  const [estudiantesAdmin, setEstudiantesAdmin] = useState<User[]>(USERS.filter(u => u.role === 'estudiante'));

  // Cargar estado inicial desde localStorage si existe
  useEffect(() => {
    const savedState = localStorage.getItem('sga_state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setCurrentUser(parsed.currentUser || null);
      if (parsed.materiasDisponibles) setMateriasDisponibles(parsed.materiasDisponibles);
      if (parsed.materiasInscritas) setMateriasInscritas(parsed.materiasInscritas);
      if (parsed.notas) setNotas(parsed.notas);
      if (parsed.estudiantesAdmin) setEstudiantesAdmin(parsed.estudiantesAdmin);
    }
  }, []);

  // Guardar estado en localStorage al cambiar
  useEffect(() => {
    const stateToSave = {
      currentUser,
      materiasDisponibles,
      materiasInscritas,
      notas,
      estudiantesAdmin
    };
    localStorage.setItem('sga_state', JSON.stringify(stateToSave));
  }, [currentUser, materiasDisponibles, materiasInscritas, notas, estudiantesAdmin]);

  const login = (email: string) => {
    const user = USERS.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const inscribirMateria = (materiaId: string) => {
    const materia = materiasDisponibles.find(m => m.id === materiaId);
    if (materia && materia.cuposDisponibles > 0) {
      // Disminuir cupo
      setMateriasDisponibles(prev => prev.map(m => m.id === materiaId ? { ...m, cuposDisponibles: m.cuposDisponibles - 1 } : m));
      // Agregar a inscritas
      setMateriasInscritas(prev => [...prev, materia]);
      return true;
    }
    return false;
  };

  const cancelarMateria = (materiaId: string) => {
    // Aumentar cupo
    setMateriasDisponibles(prev => prev.map(m => m.id === materiaId ? { ...m, cuposDisponibles: m.cuposDisponibles + 1 } : m));
    // Remover de inscritas
    setMateriasInscritas(prev => prev.filter(m => m.id !== materiaId));
  };

  const registrarNota = (nuevaNota: Nota) => {
    setNotas(prev => {
      const index = prev.findIndex(n => n.materiaId === nuevaNota.materiaId && n.estudianteId === nuevaNota.estudianteId);
      if (index >= 0) {
        const newNotas = [...prev];
        newNotas[index] = nuevaNota;
        return newNotas;
      }
      return [...prev, nuevaNota];
    });
  };

  const agregarEstudiante = (estudiante: User) => {
    setEstudiantesAdmin(prev => [...prev, estudiante]);
    // Idealmente también en USERS, pero al ser mock estático, lo manejaremos en el estado admin.
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      materiasDisponibles,
      materiasInscritas,
      notas,
      estudiantesAdmin,
      login,
      logout,
      inscribirMateria,
      cancelarMateria,
      registrarNota,
      agregarEstudiante
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
