import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MainLayout } from '../components/layout/MainLayout';

import { Login } from '../pages/auth/Login';
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { StudentMatricula } from '../pages/student/StudentMatricula';
import { StudentHorario } from '../pages/student/StudentHorario';
import { StudentNotas } from '../pages/student/StudentNotas';
import { StudentPlanEstudio } from '../pages/student/StudentPlanEstudio';
import { StudentCertificado } from '../pages/student/StudentCertificado';

import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminEstudiantes } from '../pages/admin/AdminEstudiantes';
import { ProfessorDashboard } from '../pages/professor/ProfessorDashboard';
import { ProfessorCalificaciones } from '../pages/professor/ProfessorCalificaciones';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { currentUser } = useAppContext();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(currentUser.role)) {
    // Redirigir a su dashboard correspondiente si intenta entrar a una ruta no permitida
    return <Navigate to={`/${currentUser.role}`} replace />;
  }
  
  return <>{children}</>;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rutas Protegidas dentro del Layout */}
        <Route element={<MainLayout />}>
          
          {/* Estudiante */}
          <Route path="/estudiante" element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/estudiante/matricula" element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <StudentMatricula />
            </ProtectedRoute>
          } />
          <Route path="/estudiante/horario" element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <StudentHorario />
            </ProtectedRoute>
          } />
          <Route path="/estudiante/notas" element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <StudentNotas />
            </ProtectedRoute>
          } />
          <Route path="/estudiante/plan-estudio" element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <StudentPlanEstudio />
            </ProtectedRoute>
          } />
          <Route path="/estudiante/certificado" element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <StudentCertificado />
            </ProtectedRoute>
          } />
          
          {/* Profesor */}
          <Route path="/profesor" element={
            <ProtectedRoute allowedRoles={['profesor']}>
              <ProfessorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/profesor/calificaciones" element={
            <ProtectedRoute allowedRoles={['profesor']}>
              <ProfessorCalificaciones />
            </ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/estudiantes" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminEstudiantes />
            </ProtectedRoute>
          } />
          
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
