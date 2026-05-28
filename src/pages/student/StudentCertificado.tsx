import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { PENSUM_ING_SISTEMAS } from '../../data/pensumData';
import { 
  Printer, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const StudentCertificado = () => {
  const { currentUser, materiasInscritas, notas, materiasDisponibles } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);

  // Determinar el estado de una materia y obtener su calificación
  const getMateriaStateAndNota = (codigo: string) => {
    const materiasConCodigo = [...materiasDisponibles, ...materiasInscritas];
    let idMateria = materiasConCodigo.find(m => m.codigo === codigo)?.id;
    
    // Caso especial demo: Cálculo Diferencial 'm1'
    if (codigo === 'CAL101' && !idMateria) idMateria = 'm1';

    if (idMateria) {
      const notaEstudiante = notas.find(n => n.estudianteId === currentUser?.id && n.materiaId === idMateria);
      if (notaEstudiante) {
        return {
          aprobada: notaEstudiante.calificacion >= 3.0,
          nota: notaEstudiante.calificacion
        };
      }
    }
    return null;
  };

  // Obtener lista de materias aprobadas para incluirlas en el certificado
  const materiasAprobadas = PENSUM_ING_SISTEMAS.map(pm => {
    const statusInfo = getMateriaStateAndNota(pm.codigo);
    if (statusInfo && statusInfo.aprobada) {
      return {
        ...pm,
        nota: statusInfo.nota
      };
    }
    return null;
  }).filter((m): m is (typeof PENSUM_ING_SISTEMAS[0] & { nota: number }) => m !== null);

  // Estadísticas para el certificado
  const creditosAprobados = materiasAprobadas.reduce((sum, m) => sum + m.creditos, 0);
  
  const totalCreditosConNota = materiasAprobadas.reduce((sum, m) => sum + m.creditos, 0);
  const promedioPonderado = totalCreditosConNota > 0
    ? (materiasAprobadas.reduce((sum, m) => sum + (m.nota * m.creditos), 0) / totalCreditosConNota).toFixed(2)
    : '0.00';

  // Fecha actual formateada en español
  const diaText = new Date().getDate();
  const mesText = new Date().toLocaleDateString('es-ES', { month: 'long' });
  const anioText = new Date().getFullYear();

  // Generar hash de verificación simulado
  const verificationCode = `UD-SGA-${currentUser?.id || 'U'}-${anioText}-${Math.floor(1000 + Math.random() * 9000)}`;
  const hashVerificacion = `SHA-256: ${Array.from({length:64}, () => Math.floor(Math.random()*16).toString(16)).join('')}`;

  // Función para abrir diálogo de impresión
  const handlePrint = () => {
    setIsGenerating(true);
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 800);
  };

  // Convertir número a texto de calificación
  const getNotaEscrita = (notaVal: number) => {
    const enteros = ['Cero', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco'];
    const decimales = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    
    const entero = Math.floor(notaVal);
    const decimal = Math.round((notaVal - entero) * 10);
    
    return `${enteros[entero]} punto ${decimales[decimal]}`;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Cabecera no imprimible */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print animate-fade-in-up">
        <div>
          <h1 className="text-[22px] font-extrabold text-ud-dark tracking-tight">
            Certificados Académicos
          </h1>
          <p className="text-[13px] text-ud-muted mt-0.5">
            Genera documentos oficiales con firma digital y verificación académica
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            disabled={isGenerating || materiasAprobadas.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-ud-green text-white text-[13px] font-bold rounded-xl hover:bg-ud-green-mid cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Printer size={16} />
            <span>{isGenerating ? 'Generando...' : 'Descargar PDF / Imprimir'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 no-print animate-fade-in">
        {/* Panel lateral con instrucciones */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-4">
            <h3 className="text-[14px] font-extrabold text-ud-dark flex items-center gap-2">
              <FileCheck size={18} className="text-ud-green" />
              <span>Estado de Trámite</span>
            </h3>
            
            <div className="text-[12.5px] text-ud-muted space-y-3 leading-relaxed">
              <p>
                Este sistema te permite generar un <b>Certificado de Calificaciones</b> que contiene la lista de materias aprobadas del pensum de <b>Ingeniería de Sistemas</b>.
              </p>
              
              <div className="border-t border-gray-100 pt-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-ud-muted mb-1">Requisitos</span>
                <div className="flex items-center gap-2 font-bold text-ud-green bg-ud-green-light/40 px-2.5 py-1.5 rounded-lg text-[11px]">
                  <CheckCircle size={14} />
                  <span>Estudiante Activo UD</span>
                </div>
              </div>
              
              <div className="space-y-1 text-[11.5px] border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span>Materias Aprobadas:</span>
                  <b className="text-ud-dark">{materiasAprobadas.length}</b>
                </div>
                <div className="flex justify-between">
                  <span>Créditos validados:</span>
                  <b className="text-ud-dark">{creditosAprobados}</b>
                </div>
                <div className="flex justify-between">
                  <span>Promedio Registrado:</span>
                  <b className="text-ud-green font-black">{promedioPonderado}</b>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 flex items-start gap-2.5">
              <ShieldCheck size={16} className="text-ud-amber mt-0.5 shrink-0" />
              <div className="text-[10.5px] text-amber-800 leading-relaxed font-sans">
                <b>Validez Digital:</b> El documento incluye un código de verificación único y firma digital encriptada para validación institucional.
              </div>
            </div>
          </div>
        </div>

        {/* Vista previa del Certificado en pantalla */}
        <div className="lg:col-span-3 overflow-x-auto flex justify-center bg-gray-100/50 border border-gray-200 rounded-2xl p-4 md:p-8 min-h-[500px]">
          {materiasAprobadas.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl border border-gray-200 max-w-md my-auto shadow-sm">
              <HelpCircle size={48} className="text-gray-300 mb-3" />
              <h4 className="font-bold text-[15px] text-ud-dark">Sin materias aprobadas</h4>
              <p className="text-[12px] text-ud-muted mt-2 leading-relaxed">
                Actualmente no tienes calificaciones registradas en el sistema que cumplan con una nota aprobatoria (≥ 3.0). Registra calificaciones en el dashboard del docente para verlas reflejadas aquí.
              </p>
            </div>
          ) : (
            <div className="certificate-print-area w-full max-w-[800px] bg-white border border-gray-250 p-12 md:p-16 shadow-xl relative font-serif text-black aspect-[1/1.4] box-sizing-border flex flex-col justify-between shrink-0">
              
              <div className="text-center space-y-2 border-b-2 border-ud-green pb-6 relative">
                <h2 className="text-[16px] md:text-[18px] font-extrabold text-ud-green uppercase">
                  Universidad Distrital Francisco José de Caldas
                </h2>
                <h3 className="text-[11px] md:text-[12px] font-bold text-gray-700 uppercase">
                  Facultad de Ingeniería - Proyecto Curricular de Ingeniería de Sistemas
                </h3>
                <p className="text-[10px] text-gray-500 mt-1">
                  Acreditación de Alta Calidad - Bogotá D.C., Colombia
                </p>
              </div>

              {/* Título del Documento */}
              <div className="text-center my-6 space-y-1">
                <h1 className="text-[17px] md:text-[19px] font-bold tracking-normal uppercase text-gray-800">
                  Certificado de Calificaciones y Estado Académico
                </h1>
                <p className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-semibold">
                  Registro de Calificaciones Oficial · SGA-UD
                </p>
              </div>

              {/* Declaración */}
              <div className="text-[12.5px] leading-relaxed text-justify space-y-4 text-gray-800 mb-6 font-serif">
                <p>
                  <b>EL COORDINADOR DEL PROYECTO CURRICULAR DE INGENIERÍA DE SISTEMAS</b> de la Universidad Distrital Francisco José de Caldas, hace constar que el (la) estudiante:
                </p>
                
                <div className="bg-gray-50/50 border border-gray-150 p-4 rounded-xl grid grid-cols-2 gap-x-4 gap-y-2 font-sans text-[12px] text-gray-700 shadow-xs">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Nombre Completo:</span>
                    <div className="font-extrabold text-gray-900 text-[13px]">{currentUser?.name}</div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Documento / Correo:</span>
                    <div className="font-bold text-gray-900">{currentUser?.email}</div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Programa Académico:</span>
                    <div className="font-extrabold text-ud-green">Ingeniería de Sistemas</div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Estado de Matrícula:</span>
                    <div className="font-bold text-emerald-700">ACTIVO</div>
                  </div>
                </div>

                <p>
                  Revisados los archivos de registro de calificaciones del Sistema de Gestión Académica (SGA), se constata que aprobó las asignaturas que se detallan a continuación:
                </p>
              </div>

              {/* Tabla de Calificaciones */}
              <div className="flex-1 min-h-[180px] mb-6">
                <table className="w-full border-collapse text-[11.5px] font-sans">
                  <thead>
                    <tr className="border-t border-b-2 border-gray-300 bg-gray-50/40 text-gray-700 font-bold">
                      <th className="py-2.5 px-2 text-left w-[80px]">Código</th>
                      <th className="py-2.5 px-2 text-left">Asignatura</th>
                      <th className="py-2.5 px-2 text-center w-[60px]">Créditos</th>
                      <th className="py-2.5 px-2 text-center w-[180px]">Calificación</th>
                      <th className="py-2.5 px-2 text-right w-[80px]">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materiasAprobadas.map((materia) => (
                      <tr key={materia.codigo} className="border-b border-gray-150 text-gray-800 hover:bg-gray-50/30">
                        <td className="py-2 px-2 font-bold font-mono text-[10.5px] text-gray-500">{materia.codigo}</td>
                        <td className="py-2 px-2 font-semibold text-gray-950">{materia.nombre}</td>
                        <td className="py-2 px-2 text-center text-gray-600">{materia.creditos}</td>
                        <td className="py-2 px-2 text-center font-bold text-gray-900">
                          {materia.nota.toFixed(1)} <span className="font-normal text-[9.5px] text-gray-400 lowercase">({getNotaEscrita(materia.nota)})</span>
                        </td>
                        <td className="py-2 px-2 text-right text-emerald-700 font-bold uppercase text-[9.5px]">Aprobado</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Estadísticas del Certificado */}
              <div className="border-t border-b border-gray-250 py-3.5 grid grid-cols-3 gap-4 text-[12px] font-sans text-gray-700 mb-6 bg-gray-50/30">
                <div className="text-center">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Total Asignaturas</span>
                  <div className="font-bold text-gray-900 mt-0.5">{materiasAprobadas.length}</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Créditos Aprobados</span>
                  <div className="font-bold text-gray-900 mt-0.5">{creditosAprobados}</div>
                </div>
                <div className="text-center">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Promedio Ponderado</span>
                  <div className="font-black text-ud-green text-[13px] mt-0.5">{promedioPonderado}</div>
                </div>
              </div>

              {/* Clausura de Fecha */}
              <p className="text-[12.5px] text-justify font-serif text-gray-800 leading-relaxed mb-8">
                Para constancia y a solicitud del interesado, se expide el presente documento oficial firmado y sellado digitalmente en Bogotá D.C., a los {diaText} días del mes de {mesText} del año {anioText}.
              </p>

              {/* Firmas y Sellado */}
              <div className="grid grid-cols-2 gap-8 items-end border-t border-gray-100 pt-6">
                {/* Firma Académica */}
                <div className="text-center space-y-1">
                  {/* SVG de Firma Digital Ficticia */}
                  <div className="h-12 flex items-center justify-center overflow-hidden">
                    <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 25 C30 10, 45 35, 55 15 C65 5, 80 30, 95 10 C110 -5, 125 35, 140 20" stroke="#0035A0" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M40 20 H110" stroke="#0035A0" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                  </div>
                  <div className="w-[180px] border-b border-gray-400 mx-auto"></div>
                  <h4 className="font-bold font-sans text-[11px] uppercase tracking-normal text-gray-800">
                    Ing. Coordinador Curricular
                  </h4>
                  <p className="text-[9.5px] font-sans text-gray-400 font-semibold uppercase leading-none">
                    Decanatura de Ingeniería · UD
                  </p>
                </div>

                {/* Sello de Verificación y Código QR */}
                <div className="flex items-center justify-center gap-4">
                  {/* Sello Seco SVG */}
                  <div className="relative w-16 h-16 shrink-0 opacity-70">
                    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="46" stroke="#0F6E56" strokeWidth="2" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="42" stroke="#0F6E56" strokeWidth="1" />
                      <path d="M50 15 L85 75 H15 Z" stroke="#0F6E56" strokeWidth="2" fill="none" />
                      <text x="50" y="90" fill="#0F6E56" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">REGISTRO UD</text>
                    </svg>
                  </div>
                  
                  {/* Código QR de Validación (SVG) */}
                  <div className="w-16 h-16 border border-gray-250 p-1.5 bg-white rounded shrink-0 shadow-xs flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 29 29" fill="black" shapeRendering="crispEdges">
                      {/* Grid de QR Code ficticio */}
                      <path d="M0 0h7v7H0zM22 0h7v7h-7zM0 22h7v7H0z" />
                      <path d="M2 2h3v3H2zM24 2h3v3h-3zM2 24h3v3H2z" />
                      <path d="M9 0h1v4H9zM12 1h2v2h-2zM16 0h4v1h-4zM20 2h1v3h-1zM9 6h4v1H9zM15 5h2v2h-2zM0 9h1v3H0zM3 10h3v1H3zM8 9h4v2H8zM14 9h3v1h-3zM19 9h2v1h-2zM23 9h5v1h-5zM2 13h1v3H2zM5 14h2v2H5zM9 13h2v1H9zM13 13h4v1h-4zM20 13h3v3h-3zM25 14h3v1h-3zM9 17h1v3H9zM12 18h4v1h-4zM18 17h3v1h-3zM23 18h2v2h-2zM27 17h2v2h-2zM9 22h2v2H9zM13 23h3v2h-3zM18 22h4v1h-4zM24 23h2v3h-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Firma Electrónica e Historial al pie */}
              <div className="border-t border-gray-200 mt-6 pt-4 text-[9px] font-sans text-gray-400 space-y-1 text-center font-semibold">
                <div>Código de verificación única: <span className="font-mono text-gray-600 font-bold">{verificationCode}</span></div>
                <div className="font-mono text-[8px] text-gray-300 tracking-tighter truncate max-w-full">{hashVerificacion}</div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
