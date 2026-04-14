import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Lütfen e-posta ve şifrenizi girin.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else onLoginSuccess();
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Kayıt olmak için e-posta ve şifre girin.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else setError("Kayıt başarılı! Lütfen giriş yapın.");
  };

  return (
    <div className="flex flex-col items-center justify-between h-full bg-white text-black">
      <div className="flex flex-col items-center mt-16 w-full px-6">
        <h1 className="text-3xl font-medium text-[#008069] mb-12 text-center">WhatsApp'a Hoş Geldiniz</h1>
        
        <div className="w-64 h-64 rounded-full bg-gray-50 flex items-center justify-center mb-12">
          <svg viewBox="0 0 32 32" className="w-32 h-32 fill-[#008069] opacity-20">
            <path d="M16.018 0c-8.836 0-16.018 7.18-16.018 16.018 0 2.906 0.76 5.64 2.084 8.058l-2.084 7.924 8.11-2.128c2.378 1.258 5.064 1.974 7.908 1.974 8.836 0 16.018-7.18 16.018-16.018s-7.182-16.018-16.018-16.018zM16.018 29.356c-2.434 0-4.736-0.632-6.79-1.748l-0.486-0.288-5.048 1.324 1.344-4.92-0.316-0.504c-1.226-1.954-1.926-4.248-1.926-6.692 0-7.464 6.074-13.538 13.538-13.538s13.538 6.074 13.538 13.538-6.074 13.538-13.538 13.538zM23.46 19.162c-0.408-0.204-2.414-1.192-2.788-1.328-0.374-0.136-0.646-0.204-0.918 0.204s-1.054 1.328-1.292 1.6c-0.238 0.272-0.476 0.306-0.884 0.102-0.408-0.204-1.722-0.636-3.28-2.028-1.212-1.084-2.030-2.422-2.268-2.83-0.238-0.408-0.026-0.63 0.178-0.834 0.184-0.184 0.408-0.476 0.612-0.714 0.204-0.238 0.272-0.408 0.408-0.68 0.136-0.272 0.068-0.51-0.034-0.714s-0.918-2.21-1.258-3.026c-0.33-0.796-0.666-0.688-0.918-0.7-0.238-0.012-0.51-0.014-0.782-0.014s-0.714 0.102-1.088 0.51c-0.374 0.408-1.428 1.394-1.428 3.398s1.462 3.942 1.666 4.214c0.204 0.272 2.874 4.384 6.96 6.148 0.972 0.42 1.73 0.67 2.324 0.858 0.976 0.31 1.866 0.266 2.566 0.162 0.784-0.118 2.414-0.986 2.754-1.938 0.34-0.952 0.34-1.768 0.238-1.938-0.102-0.17-0.374-0.272-0.782-0.476z"></path>
          </svg>
        </div>
        
        <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-6">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          
          <input 
            type="email" 
            placeholder="E-posta" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b-2 border-[#008069] py-2 focus:outline-none text-lg text-center" 
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-[#008069] py-2 focus:outline-none text-lg text-center" 
          />

          <div className="flex flex-col gap-3 mt-8">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#008069] text-white font-medium py-3 rounded-full hover:bg-[#016856] transition-colors"
            >
              {loading ? "Bağlanıyor..." : "Kabul Et ve Devam Et"}
            </button>
            <button 
              type="button" 
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-white text-[#008069] border border-[#008069] font-medium py-3 rounded-full hover:bg-gray-50 transition-colors"
            >
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
      
      <div className="mb-8 mt-4">
        <button onClick={onLoginSuccess} className="text-[#008069] font-medium text-sm">
          Misafir olarak devam et
        </button>
      </div>
    </div>
  );
}
