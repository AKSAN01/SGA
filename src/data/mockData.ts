export type Role = 'estudiante' | 'profesor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Materia {
  id: string;
  codigo: string;
  nombre: string;
  creditos: number;
  profesor: string;
  cuposDisponibles: number;
  cuposTotales: number;
  horario: string; // ej: 'Lunes 8:00 - 10:00'
  prerrequisitos?: string[]; // IDs de otras materias
}

export interface Nota {
  materiaId: string;
  estudianteId: string;
  calificacion: number; // 0.0 a 5.0
  periodo: string; // ej: '2023-1'
}

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Ana García',
    email: 'ana.estudiante@udistrital.edu.co',
    role: 'estudiante',
  },
  {
    id: 'u2',
    name: 'Carlos Profesor',
    email: 'carlos.profesor@udistrital.edu.co',
    role: 'profesor',
  },
  {
    id: 'u3',
    name: 'Admin Secretaría',
    email: 'admin@udistrital.edu.co',
    role: 'admin',
  }
];

export const MOCK_MATERIAS: Materia[] = [
  {
    id: 'm1',
    codigo: 'CAL101',
    nombre: 'Cálculo Diferencial',
    creditos: 4,
    profesor: 'Carlos Profesor',
    cuposDisponibles: 5,
    cuposTotales: 30,
    horario: 'Lunes 08:00-10:00, Miércoles 08:00-10:00'
  },
  {
    id: 'm2',
    codigo: 'PROG101',
    nombre: 'Programación Básica',
    creditos: 3,
    profesor: 'Carlos Profesor',
    cuposDisponibles: 0,
    cuposTotales: 25,
    horario: 'Martes 10:00-12:00, Jueves 10:00-12:00'
  },
  {
    id: 'm3',
    codigo: 'FIS101',
    nombre: 'Física Mecánica',
    creditos: 4,
    profesor: 'Laura Física',
    cuposDisponibles: 12,
    cuposTotales: 40,
    horario: 'Lunes 10:00-12:00, Miércoles 10:00-12:00'
  }
];

export const MOCK_NOTAS: Nota[] = [
  {
    materiaId: 'm1',
    estudianteId: 'u1',
    calificacion: 4.5,
    periodo: '2023-1'
  }
];
