import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, currentUser } = useAppContext();
  const navigate = useNavigate();

  // Si ya está logueado, redirigir
  useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.role}`);
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Por favor ingrese su correo institucional');
      return;
    }

    if (!password) {
      setError('Por favor ingrese su contraseña');
      return;
    }

    if (password !== '1234') {
      setError('Contraseña incorrecta. Use "1234" para todos los roles.');
      return;
    }

    const success = login(email.trim());
    if (success) {
      // El re-render disparará el redirect al dashboard respectivo
      navigate('/');
    } else {
      setError('Credenciales inválidas. Intente con: ana.estudiante@udistrital.edu.co, carlos.profesor@udistrital.edu.co o admin@udistrital.edu.co');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ud-green-light/40 via-white to-ud-green-light/20 p-4 font-sans">
      <div className="bg-white rounded-2xl border border-gray-150 py-10 px-8 w-full max-w-[360px] shadow-[0_8px_30px_rgb(15,110,86,0.08)] animate-scale-in hover:shadow-[0_8px_40px_rgb(15,110,86,0.12)] transition-shadow duration-300">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-ud-green rounded-2xl flex items-center justify-center mx-auto mb-3 text-white text-[24px] font-bold tracking-tight shadow-[0_4px_12px_rgba(15,110,86,0.3)] transition-transform duration-500 hover:rotate-12 cursor-default">
            UD
          </div>
          <h2 className="text-[17px] font-bold text-ud-green font-sans tracking-tight">
            Universidad Distrital
          </h2>
          <p className="text-[12px] text-ud-muted font-sans mt-0.5">
            Sistema de Gestión Académica
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-[11px] font-semibold text-ud-muted uppercase tracking-wider font-sans mb-1.5">
              Usuario institucional
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13.5px] bg-ud-bg text-ud-dark focus:outline-none focus:border-ud-green focus:bg-white focus:ring-2 focus:ring-ud-green/10 transition-all duration-200"
              placeholder="ej: estudiante@udistrital.edu.co"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[11px] font-semibold text-ud-muted uppercase tracking-wider font-sans mb-1.5">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13.5px] bg-ud-bg text-ud-dark focus:outline-none focus:border-ud-green focus:bg-white focus:ring-2 focus:ring-ud-green/10 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50/50 border border-red-100 rounded-lg p-2.5 text-center animate-fade-in">
              <p className="text-[11px] text-ud-danger font-medium leading-relaxed font-sans">{error}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-ud-green text-white rounded-xl text-[13.5px] font-bold hover:bg-ud-green-mid active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        
        <div className="mt-6 border-t border-gray-100 pt-4 text-center">
          <p className="text-[11px] text-ud-muted font-sans leading-relaxed">
            <b>Usuarios Demo:</b><br />
            ana.estudiante@udistrital.edu.co<br />
            carlos.profesor@udistrital.edu.co<br />
            admin@udistrital.edu.co<br />
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#F1EFE8] text-ud-dark font-semibold rounded-md">Contraseña para todos: 1234</span>
          </p>
        </div>
      </div>
    </div>
  );
};
