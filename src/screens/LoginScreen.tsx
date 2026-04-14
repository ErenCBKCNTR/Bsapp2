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
      setError("E-posta ve şifre boş olamaz.");
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      onLoginSuccess();
    }
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
    if (error) {
      setError(error.message);
    } else {
      setError("Kayıt başarılı! Lütfen giriş yapın.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-zinc-950 text-zinc-50">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Blind Social</h1>
      
      <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col gap-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-medium text-zinc-300">E-posta</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
            placeholder="E-posta adresiniz"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-zinc-300">Şifre</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
            placeholder="Şifreniz"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold text-lg p-4 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Bekleyin..." : "Giriş Yap"}
        </button>

        <button 
          type="button"
          onClick={handleRegister}
          disabled={loading}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-50 font-bold text-lg p-4 rounded-xl transition-colors disabled:opacity-50"
        >
          Kayıt Ol
        </button>

        <button 
          type="button"
          onClick={onLoginSuccess}
          className="mt-4 text-zinc-400 hover:text-zinc-300 font-medium underline underline-offset-4"
        >
          Misafir Olarak Devam Et
        </button>
      </form>
    </div>
  );
}
