export type AreaAcademica = 'basica' | 'tecnologica' | 'ingenieria' | 'humanidades' | 'investigacion' | 'electiva';

export interface PensumMateria {
  codigo: string;
  nombre: string;
  creditos: number;
  semestre: number;
  prerrequisitos: string[];
  area: AreaAcademica;
}

export const AREA_LABELS: Record<AreaAcademica, string> = {
  basica: 'Ciencias Básicas',
  tecnologica: 'Tecnológica',
  ingenieria: 'Ingeniería Aplicada',
  humanidades: 'Sociedad y Humanidades',
  investigacion: 'Investigación',
  electiva: 'Electivas / Énfasis'
};

export const PENSUM_ING_SISTEMAS: PensumMateria[] = [
  // Semestre 1
  { codigo: 'CAL101', nombre: 'Cálculo Diferencial', creditos: 4, semestre: 1, prerrequisitos: [], area: 'basica' },
  { codigo: 'PROG101', nombre: 'Programación Básica', creditos: 3, semestre: 1, prerrequisitos: [], area: 'tecnologica' },
  { codigo: 'INTRO101', nombre: 'Introducción a la Ing. de Sistemas', creditos: 2, semestre: 1, prerrequisitos: [], area: 'ingenieria' },
  { codigo: 'HUM101', nombre: 'Humanidades I', creditos: 2, semestre: 1, prerrequisitos: [], area: 'humanidades' },
  { codigo: 'CAT101', nombre: 'Cátedra Francisco José de Caldas', creditos: 2, semestre: 1, prerrequisitos: [], area: 'humanidades' },
  
  // Semestre 2
  { codigo: 'CAL102', nombre: 'Cálculo Integral', creditos: 4, semestre: 2, prerrequisitos: ['CAL101'], area: 'basica' },
  { codigo: 'ALG101', nombre: 'Álgebra Lineal', creditos: 3, semestre: 2, prerrequisitos: [], area: 'basica' },
  { codigo: 'PROG102', nombre: 'Programación Orientada a Objetos', creditos: 3, semestre: 2, prerrequisitos: ['PROG101'], area: 'tecnologica' },
  { codigo: 'FIS101', nombre: 'Física Mecánica', creditos: 4, semestre: 2, prerrequisitos: ['CAL101'], area: 'basica' },
  { codigo: 'HUM102', nombre: 'Humanidades II', creditos: 2, semestre: 2, prerrequisitos: ['HUM101'], area: 'humanidades' },

  // Semestre 3
  { codigo: 'CAL201', nombre: 'Cálculo Multivariado', creditos: 4, semestre: 3, prerrequisitos: ['CAL102'], area: 'basica' },
  { codigo: 'ESTR101', nombre: 'Estructuras de Datos', creditos: 3, semestre: 3, prerrequisitos: ['PROG102'], area: 'tecnologica' },
  { codigo: 'FIS102', nombre: 'Física Electromagnetismo', creditos: 4, semestre: 3, prerrequisitos: ['FIS101'], area: 'basica' },
  { codigo: 'LOG101', nombre: 'Lógica Computacional', creditos: 3, semestre: 3, prerrequisitos: ['PROG101'], area: 'tecnologica' },
  { codigo: 'HUM201', nombre: 'Humanidades III', creditos: 2, semestre: 3, prerrequisitos: ['HUM102'], area: 'humanidades' },

  // Semestre 4
  { codigo: 'ECU101', nombre: 'Ecuaciones Diferenciales', creditos: 4, semestre: 4, prerrequisitos: ['CAL201'], area: 'basica' },
  { codigo: 'MET101', nombre: 'Métodos Numéricos', creditos: 3, semestre: 4, prerrequisitos: ['ALG101', 'CAL102'], area: 'basica' },
  { codigo: 'FIS201', nombre: 'Física Ondas y Termodinámica', creditos: 4, semestre: 4, prerrequisitos: ['FIS102'], area: 'basica' },
  { codigo: 'TGS101', nombre: 'Teoría General de Sistemas', creditos: 3, semestre: 4, prerrequisitos: ['INTRO101'], area: 'ingenieria' },
  { codigo: 'ALG201', nombre: 'Análisis de Algoritmos', creditos: 3, semestre: 4, prerrequisitos: ['ESTR101'], area: 'tecnologica' },

  // Semestre 5
  { codigo: 'EST101', nombre: 'Probabilidad y Estadística', creditos: 3, semestre: 5, prerrequisitos: ['CAL102'], area: 'basica' },
  { codigo: 'BD101', nombre: 'Bases de Datos I', creditos: 4, semestre: 5, prerrequisitos: ['ESTR101'], area: 'tecnologica' },
  { codigo: 'ARQ101', nombre: 'Arquitectura de Computadores', creditos: 3, semestre: 5, prerrequisitos: ['LOG101'], area: 'tecnologica' },
  { codigo: 'ISW101', nombre: 'Ingeniería de Software I', creditos: 3, semestre: 5, prerrequisitos: ['PROG102'], area: 'ingenieria' },
  { codigo: 'IOP101', nombre: 'Investigación de Operaciones I', creditos: 3, semestre: 5, prerrequisitos: ['ALG101'], area: 'basica' },

  // Semestre 6
  { codigo: 'RED101', nombre: 'Redes de Datos I', creditos: 4, semestre: 6, prerrequisitos: ['ARQ101'], area: 'tecnologica' },
  { codigo: 'BD102', nombre: 'Bases de Datos II', creditos: 3, semestre: 6, prerrequisitos: ['BD101'], area: 'tecnologica' },
  { codigo: 'SO101', nombre: 'Sistemas Operativos', creditos: 3, semestre: 6, prerrequisitos: ['ARQ101'], area: 'tecnologica' },
  { codigo: 'ISW102', nombre: 'Ingeniería de Software II', creditos: 3, semestre: 6, prerrequisitos: ['ISW101'], area: 'ingenieria' },
  { codigo: 'IOP102', nombre: 'Investigación de Operaciones II', creditos: 3, semestre: 6, prerrequisitos: ['IOP101'], area: 'basica' },

  // Semestre 7
  { codigo: 'RED102', nombre: 'Redes de Datos II', creditos: 3, semestre: 7, prerrequisitos: ['RED101'], area: 'tecnologica' },
  { codigo: 'FPR101', nombre: 'Formulación de Proyectos', creditos: 3, semestre: 7, prerrequisitos: [], area: 'ingenieria' },
  { codigo: 'IA101', nombre: 'Inteligencia Artificial', creditos: 3, semestre: 7, prerrequisitos: ['ALG201', 'EST101'], area: 'tecnologica' },
  { codigo: 'GTE101', nombre: 'Gestión Tecnológica', creditos: 2, semestre: 7, prerrequisitos: [], area: 'ingenieria' },
  { codigo: 'SIN101', nombre: 'Seminario de Investigación', creditos: 2, semestre: 7, prerrequisitos: [], area: 'investigacion' },

  // Semestre 8
  { codigo: 'MSI101', nombre: 'Modelos y Simulación', creditos: 3, semestre: 8, prerrequisitos: ['EST101'], area: 'ingenieria' },
  { codigo: 'GPR101', nombre: 'Gestión de Proyectos de Software', creditos: 3, semestre: 8, prerrequisitos: ['FPR101'], area: 'ingenieria' },
  { codigo: 'ENF101', nombre: 'Énfasis Profesional I', creditos: 3, semestre: 8, prerrequisitos: [], area: 'electiva' },
  { codigo: 'TG101', nombre: 'Trabajo de Grado I', creditos: 3, semestre: 8, prerrequisitos: ['SIN101'], area: 'investigacion' },
  { codigo: 'CG101', nombre: 'Computación Gráfica', creditos: 3, semestre: 8, prerrequisitos: ['ALG201', 'CAL201'], area: 'tecnologica' },

  // Semestre 9
  { codigo: 'AUD101', nombre: 'Auditoría de Sistemas', creditos: 3, semestre: 9, prerrequisitos: [], area: 'ingenieria' },
  { codigo: 'ENF102', nombre: 'Énfasis Profesional II', creditos: 3, semestre: 9, prerrequisitos: ['ENF101'], area: 'electiva' },
  { codigo: 'TG102', nombre: 'Trabajo de Grado II', creditos: 4, semestre: 9, prerrequisitos: ['TG101'], area: 'investigacion' },
  { codigo: 'EEX101', nombre: 'Electiva Extrínseca I', creditos: 2, semestre: 9, prerrequisitos: [], area: 'humanidades' },

  // Semestre 10
  { codigo: 'ETI101', nombre: 'Ética Profesional', creditos: 2, semestre: 10, prerrequisitos: [], area: 'humanidades' },
  { codigo: 'ENF103', nombre: 'Énfasis Profesional III', creditos: 3, semestre: 10, prerrequisitos: ['ENF102'], area: 'electiva' },
  { codigo: 'EEX102', nombre: 'Electiva Extrínseca II', creditos: 2, semestre: 10, prerrequisitos: [], area: 'humanidades' },
  { codigo: 'GSI101', nombre: 'Gerencia de Sistemas', creditos: 3, semestre: 10, prerrequisitos: ['GPR101'], area: 'ingenieria' }
];
