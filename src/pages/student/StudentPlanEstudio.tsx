import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { PENSUM_ING_SISTEMAS, AREA_LABELS } from '../../data/pensumData';
import type { PensumMateria, AreaAcademica } from '../../data/pensumData';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Award,
  Layers,
  Search,
  Filter,
  Check
} from 'lucide-react';

export const StudentPlanEstudio = () => {
  const { currentUser, materiasInscritas, notas, materiasDisponibles } = useAppContext();
  const [selectedArea, setSelectedArea] = useState<AreaAcademica | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'aprobada' | 'cursando' | 'pendiente' | 'reprobada'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCycle, setActiveCycle] = useState<'all' | 'basico' | 'profesional'>('all');
  const [hoveredMateria, setHoveredMateria] = useState<string | null>(null);
  const [selectedMateria, setSelectedMateria] = useState<PensumMateria | null>(null);

  // Determinar el estado de una materia del pensum para el estudiante actual
  const getMateriaState = (codigo: string) => {
    // 1. Cursando (inscrita en este semestre)
    const estaInscrita = materiasInscritas.some(m => m.codigo === codigo);
    if (estaInscrita) return 'cursando';

    // 2. Nota registrada
    // Unificar materias disponibles e inscritas para mapear códigos a IDs
    const materiasConCodigo = [...materiasDisponibles, ...materiasInscritas];
    const idMateria = materiasConCodigo.find(m => m.codigo === codigo)?.id;

    if (idMateria) {
      const notaEstudiante = notas.find(n => n.estudianteId === currentUser?.id && n.materiaId === idMateria);
      if (notaEstudiante) {
        return notaEstudiante.calificacion >= 3.0 ? 'aprobada' : 'reprobada';
      }
    }

    // Caso especial para Cálculo Diferencial (CAL101) si está en MOCK_NOTAS con ID 'm1'
    if (codigo === 'CAL101') {
      const notaCalculo = notas.find(n => n.estudianteId === currentUser?.id && n.materiaId === 'm1');
      if (notaCalculo) {
        return notaCalculo.calificacion >= 3.0 ? 'aprobada' : 'reprobada';
      }
    }

    return 'pendiente';
  };

  // Obtener la calificación de una materia si la tiene
  const getMateriaNota = (codigo: string) => {
    const materiasConCodigo = [...materiasDisponibles, ...materiasInscritas];
    let idMateria = materiasConCodigo.find(m => m.codigo === codigo)?.id;
    if (codigo === 'CAL101' && !idMateria) idMateria = 'm1';

    if (idMateria) {
      const notaEstudiante = notas.find(n => n.estudianteId === currentUser?.id && n.materiaId === idMateria);
      return notaEstudiante ? notaEstudiante.calificacion : null;
    }
    return null;
  };

  // Cálculos de KPIs
  const totalCreditosPlan = PENSUM_ING_SISTEMAS.reduce((sum, m) => sum + m.creditos, 0);
  
  // Créditos aprobados y matriculados (cursando)
  const creditosAprobados = PENSUM_ING_SISTEMAS.reduce((sum, m) => {
    return getMateriaState(m.codigo) === 'aprobada' ? sum + m.creditos : sum;
  }, 0);

  const creditosCursando = PENSUM_ING_SISTEMAS.reduce((sum, m) => {
    return getMateriaState(m.codigo) === 'cursando' ? sum + m.creditos : sum;
  }, 0);

  const porcentajeAvance = ((creditosAprobados / totalCreditosPlan) * 100).toFixed(1);

  // Promedio Ponderado Acumulado
  const materiasConNota = PENSUM_ING_SISTEMAS.map(m => {
    const nota = getMateriaNota(m.codigo);
    return nota !== null ? { nota, creditos: m.creditos } : null;
  }).filter((x): x is { nota: number; creditos: number } => x !== null);

  const totalCreditosConNota = materiasConNota.reduce((sum, m) => sum + m.creditos, 0);
  const promedioPonderado = totalCreditosConNota > 0
    ? (materiasConNota.reduce((sum, m) => sum + (m.nota * m.creditos), 0) / totalCreditosConNota).toFixed(2)
    : 'N/A';

  // Semestres (1 a 10)
  const semestres = Array.from({ length: 10 }, (_, i) => i + 1);

  // Filtrar semestres por ciclo (1-5 Básico, 6-10 Profesional)
  const semestresFiltrados = semestres.filter(sem => {
    if (activeCycle === 'basico') return sem <= 5;
    if (activeCycle === 'profesional') return sem > 5;
    return true;
  });

  return (
    <div className="space-y-6 font-sans animate-fade-in-up">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-ud-dark font-sans tracking-tight">
            Plan de Estudios
          </h1>
          <p className="text-[13px] text-ud-muted font-sans mt-0.5">
            Ingeniería de Sistemas · Proyecto Curricular UD
          </p>
        </div>
        <div className="flex gap-1.5 self-start md:self-center">
          <button
            onClick={() => setActiveCycle('all')}
            className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              activeCycle === 'all' 
                ? 'bg-ud-green text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-ud-muted hover:text-ud-dark'
            }`}
          >
            Ver Todo
          </button>
          <button
            onClick={() => setActiveCycle('basico')}
            className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              activeCycle === 'basico' 
                ? 'bg-ud-green text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-ud-muted hover:text-ud-dark'
            }`}
          >
            Ciclo Básico (1-5)
          </button>
          <button
            onClick={() => setActiveCycle('profesional')}
            className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              activeCycle === 'profesional' 
                ? 'bg-ud-green text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-ud-muted hover:text-ud-dark'
            }`}
          >
            Ciclo Profesional (6-10)
          </button>
        </div>
      </div>

      {/* Tarjetas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-xl bg-ud-green/10 flex items-center justify-center text-ud-green shrink-0">
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="text-[22px] font-black text-ud-dark font-sans leading-none">{porcentajeAvance}%</div>
            <div className="text-[11px] font-medium text-ud-muted font-sans mt-1">Avance Curricular</div>
            {/* Barra de progreso miniatura */}
            <div className="w-24 bg-gray-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div 
                className="bg-ud-green h-1.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${porcentajeAvance}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <BookOpen size={22} />
          </div>
          <div>
            <div className="text-[22px] font-black text-ud-dark font-sans leading-none">
              {creditosAprobados} <span className="text-[13px] font-semibold text-ud-muted">/ {totalCreditosPlan}</span>
            </div>
            <div className="text-[11px] font-medium text-ud-muted font-sans mt-1">Créditos Aprobados</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Award size={22} />
          </div>
          <div>
            <div className="text-[22px] font-black text-ud-dark font-sans leading-none">{promedioPonderado}</div>
            <div className="text-[11px] font-medium text-ud-muted font-sans mt-1">Promedio Ponderado</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Layers size={22} />
          </div>
          <div>
            <div className="text-[22px] font-black text-ud-dark font-sans leading-none">{creditosCursando}</div>
            <div className="text-[11px] font-medium text-ud-muted font-sans mt-1">Créditos en Curso</div>
          </div>
        </div>
      </div>

      {/* Filtros e Historial */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-4 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Buscar asignatura por nombre o código..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-[13px] bg-ud-bg focus:outline-none focus:border-ud-green focus:bg-white focus:ring-2 focus:ring-ud-green/10 transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filtro Area */}
            <div className="flex items-center gap-2 bg-ud-bg border border-gray-200 px-3 py-1.5 rounded-xl">
              <Filter size={14} className="text-ud-muted" />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value as AreaAcademica | 'all')}
                className="bg-transparent text-[12px] text-ud-dark focus:outline-none font-medium pr-2 border-none cursor-pointer"
              >
                <option value="all">Todas las Áreas</option>
                {Object.entries(AREA_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Filtro Estado */}
            <div className="flex items-center gap-2 bg-ud-bg border border-gray-200 px-3 py-1.5 rounded-xl">
              <Layers size={14} className="text-ud-muted" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="bg-transparent text-[12px] text-ud-dark focus:outline-none font-medium pr-2 border-none cursor-pointer"
              >
                <option value="all">Todos los Estados</option>
                <option value="aprobada">Aprobada</option>
                <option value="cursando">Cursando</option>
                <option value="pendiente">Pendiente</option>
                <option value="reprobada">Reprobada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leyenda de Estados */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold text-ud-muted border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-ud-green"></span>
            <span>Aprobada (Nota ≥ 3.0)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>Cursando (Inscrita)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>Reprobada (Nota &lt; 3.0)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
            <span>Pendiente</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4 text-ud-green">
            <span className="inline-block px-1 bg-amber-100 border border-amber-300 text-amber-800 rounded font-normal text-[10px]">Ring Naranja</span>
            <span>Relación de Prerrequisito (Pasa el cursor)</span>
          </div>
        </div>
      </div>

      {/* Grid del Plan de Estudios */}
      <div className="flex flex-col gap-6">
        {semestresFiltrados.map((semestre) => {
          // Materias de este semestre
          const materiasSemestre = PENSUM_ING_SISTEMAS.filter(m => m.semestre === semestre);
          
          // Aplicar filtros a nivel de tarjeta interna
          const materiasFiltradas = materiasSemestre.filter(m => {
            const state = getMateriaState(m.codigo);
            const matchesArea = selectedArea === 'all' || m.area === selectedArea;
            const matchesStatus = selectedStatus === 'all' || state === selectedStatus;
            const matchesSearch = searchQuery === '' || 
              m.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
              m.codigo.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesArea && matchesStatus && matchesSearch;
          });

          // Calcular aprobadas del semestre
          const aprobadasSem = materiasSemestre.filter(m => getMateriaState(m.codigo) === 'aprobada').length;

          if (materiasFiltradas.length === 0 && searchQuery !== '') return null;

          return (
            <div key={semestre} className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow duration-300 animate-fade-in">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[15px] font-extrabold text-ud-dark">Semestre {semestre}</h3>
                  <span className="text-[11px] text-ud-muted font-medium">({materiasSemestre.length} materias)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-ud-green bg-ud-green-light px-2.5 py-1 rounded-full">
                  <Check size={12} strokeWidth={3} />
                  <span>{aprobadasSem} / {materiasSemestre.length} Aprobadas</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {materiasFiltradas.map((materia) => {
                  const state = getMateriaState(materia.codigo);
                  const nota = getMateriaNota(materia.codigo);
                  
                  // Verificar si esta materia es prerrequisito de la que está hovereada
                  const esPrerrequisitoDeHovered = hoveredMateria 
                    ? PENSUM_ING_SISTEMAS.find(m => m.codigo === hoveredMateria)?.prerrequisitos.includes(materia.codigo)
                    : false;

                  // Verificar si la materia hovered es prerrequisito de esta materia
                  const requiereHovered = hoveredMateria
                    ? materia.prerrequisitos.includes(hoveredMateria)
                    : false;

                  const isHovered = hoveredMateria === materia.codigo;

                  let stateStyles = '';
                  let icon = <Clock size={13} className="text-gray-400" />;

                  switch (state) {
                    case 'aprobada':
                      stateStyles = 'border-l-4 border-l-ud-green bg-ud-green-light/10 text-ud-green';
                      icon = <CheckCircle2 size={13} className="text-ud-green" />;
                      break;
                    case 'cursando':
                      stateStyles = 'border-l-4 border-l-blue-500 bg-blue-50/20 text-blue-700';
                      icon = <BookOpen size={13} className="text-blue-500" />;
                      break;
                    case 'reprobada':
                      stateStyles = 'border-l-4 border-l-ud-danger bg-red-50/20 text-ud-danger';
                      icon = <AlertTriangle size={13} className="text-ud-danger" />;
                      break;
                    default:
                      stateStyles = 'border-l-4 border-l-gray-300 bg-gray-50/50 text-ud-muted';
                      icon = <HelpCircle size={13} className="text-gray-400" />;
                  }

                  // Añadir bordes especiales de relación de prerrequisito
                  let relationClass = '';
                  if (esPrerrequisitoDeHovered) {
                    relationClass = 'ring-2 ring-amber-500 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] scale-[1.02]';
                  } else if (requiereHovered) {
                    relationClass = 'ring-2 ring-purple-500 border-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]';
                  } else if (isHovered) {
                    relationClass = 'ring-2 ring-ud-green border-ud-green/40 shadow-sm';
                  }

                  return (
                    <div
                      key={materia.codigo}
                      onMouseEnter={() => setHoveredMateria(materia.codigo)}
                      onMouseLeave={() => setHoveredMateria(null)}
                      onClick={() => setSelectedMateria(materia)}
                      className={`relative flex flex-col justify-between p-3.5 border border-gray-150 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200 min-h-[110px] ${stateStyles} ${relationClass}`}
                    >
                      <div>
                        {/* Fila superior: Código y área */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="font-bold text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-white border border-gray-200">
                            {materia.codigo}
                          </span>
                          <span className="text-[8px] font-bold uppercase text-ud-muted opacity-80 truncate max-w-[80px]">
                            {AREA_LABELS[materia.area].split(' ')[0]}
                          </span>
                        </div>

                        {/* Nombre de la Asignatura */}
                        <h4 className="font-bold text-[12px] text-ud-dark leading-[1.3] line-clamp-2">
                          {materia.nombre}
                        </h4>
                      </div>

                      {/* Fila inferior: Créditos, Nota y Estado */}
                      <div className="flex items-center justify-between border-t border-gray-100/50 pt-2 mt-2">
                        <span className="text-[10px] text-ud-muted font-medium">
                          {materia.creditos} {materia.creditos === 1 ? 'crédito' : 'créditos'}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          {nota !== null && (
                            <span className="text-[11px] font-black mr-1 bg-white px-1.5 py-0.5 rounded border border-gray-200 text-ud-dark shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                              {nota.toFixed(1)}
                            </span>
                          )}
                          {icon}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de detalles de asignatura */}
      {selectedMateria && (
        <div className="fixed inset-0 bg-ud-dark/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-gray-200 max-w-md w-full p-6 shadow-xl animate-scale-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="inline-block font-bold text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-ud-bg border border-gray-200 mb-1">
                  {selectedMateria.codigo}
                </span>
                <h3 className="text-[16px] font-black text-ud-dark leading-tight">{selectedMateria.nombre}</h3>
                <p className="text-[11px] font-semibold text-ud-green uppercase tracking-wider mt-0.5">
                  {AREA_LABELS[selectedMateria.area]}
                </p>
              </div>
              <button
                onClick={() => setSelectedMateria(null)}
                className="text-gray-400 hover:text-ud-dark font-sans text-[18px] font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-[13px] border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-ud-muted font-semibold uppercase tracking-wider">Créditos Académicos</div>
                  <div className="font-bold text-ud-dark mt-0.5">{selectedMateria.creditos}</div>
                </div>
                <div>
                  <div className="text-[10px] text-ud-muted font-semibold uppercase tracking-wider">Ubicación Curricular</div>
                  <div className="font-bold text-ud-dark mt-0.5">Semestre {selectedMateria.semestre}</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-ud-muted font-semibold uppercase tracking-wider">Estado del Estudiante</div>
                <div className="flex items-center gap-2 mt-1.5">
                  {(() => {
                    const state = getMateriaState(selectedMateria.codigo);
                    const nota = getMateriaNota(selectedMateria.codigo);
                    switch (state) {
                      case 'aprobada':
                        return (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-ud-green-light text-ud-green flex items-center gap-1">
                            <CheckCircle2 size={12} /> Aprobado {nota !== null && `(${nota.toFixed(1)})`}
                          </span>
                        );
                      case 'cursando':
                        return (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 flex items-center gap-1">
                            <BookOpen size={12} /> Cursando (Inscrita)
                          </span>
                        );
                      case 'reprobada':
                        return (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-ud-danger flex items-center gap-1">
                            <AlertTriangle size={12} /> Reprobado {nota !== null && `(${nota.toFixed(1)})`}
                          </span>
                        );
                      default:
                        return (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-ud-muted flex items-center gap-1">
                            <Clock size={12} /> Pendiente
                          </span>
                        );
                    }
                  })()}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-ud-muted font-semibold uppercase tracking-wider mb-1.5">Requisitos previos (Prerrequisitos)</div>
                {selectedMateria.prerrequisitos.length === 0 ? (
                  <p className="text-ud-muted text-[12px] italic">Esta asignatura no tiene prerrequisitos.</p>
                ) : (
                  <div className="space-y-1.5">
                    {selectedMateria.prerrequisitos.map(prereqCode => {
                      const prereqMateria = PENSUM_ING_SISTEMAS.find(m => m.codigo === prereqCode);
                      const prereqState = getMateriaState(prereqCode);
                      
                      let badgeColor = 'bg-gray-100 text-ud-muted border-gray-200';
                      if (prereqState === 'aprobada') badgeColor = 'bg-ud-green-light text-ud-green border-ud-green/20';
                      if (prereqState === 'reprobada') badgeColor = 'bg-red-50 text-ud-danger border-red-200';
                      if (prereqState === 'cursando') badgeColor = 'bg-blue-50 text-blue-600 border-blue-200';

                      return (
                        <div key={prereqCode} className={`flex items-center justify-between border px-2.5 py-1.5 rounded-lg text-[11px] font-semibold ${badgeColor}`}>
                          <span>{prereqMateria ? prereqMateria.nombre : prereqCode}</span>
                          <span className="text-[9px] uppercase font-bold tracking-wide">{prereqCode}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedMateria(null)}
                className="px-4 py-2 bg-ud-dark text-white rounded-xl text-[12px] font-bold hover:bg-ud-muted transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
