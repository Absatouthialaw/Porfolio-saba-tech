import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C2185B]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#C2185B] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-[#C2185B]/20 mb-4">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Administration
          </h1>
          <p className="text-gray-400 text-sm">
            Connectez-vous pour gérer votre portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Identifiant / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#C2185B] transition-colors"
                  placeholder="nom@exemple.com"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#C2185B] transition-colors"
                  placeholder="Mot de passe"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                  title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-[#C2185B] hover:bg-[#E91E63] text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#C2185B]/25 cursor-pointer"
            >
              Se connecter
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            ← Retour au site public
          </button>
        </div>
      </div>
    </div>
  );
}
