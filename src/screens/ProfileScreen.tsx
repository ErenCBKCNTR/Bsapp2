import React from 'react';
import { User, Settings, LogOut, Shield, CircleHelp } from 'lucide-react';

export default function ProfileScreen({ onLogout }: { onLogout?: () => void }) {
  return (
    <div className="p-6 flex flex-col gap-8 h-full overflow-y-auto pb-24">
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-yellow-400 flex items-center justify-center">
          <User size={64} className="text-zinc-400" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Kullanıcı Adı</h2>
          <p className="text-zinc-400 text-lg">@kullanici_adi</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <div className="bg-zinc-800/50 px-6 py-3 rounded-2xl text-center">
          <div className="text-2xl font-bold text-yellow-400">12</div>
          <div className="text-sm text-zinc-400 font-medium">Takipçi</div>
        </div>
        <div className="bg-zinc-800/50 px-6 py-3 rounded-2xl text-center">
          <div className="text-2xl font-bold text-yellow-400">28</div>
          <div className="text-sm text-zinc-400 font-medium">Takip Edilen</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-zinc-300 mb-2 px-2">Hesap Ayarları</h3>
        
        <ProfileButton icon={<Settings size={24} />} label="Genel Ayarlar" />
        <ProfileButton icon={<Shield size={24} />} label="Gizlilik ve Güvenlik" />
        <ProfileButton icon={<CircleHelp size={24} />} label="Yardım ve Destek" />
        
        <button 
          onClick={onLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 p-4 rounded-2xl flex items-center gap-4 transition-colors text-left mt-4 border border-red-500/20"
        >
          <div className="p-2 rounded-full bg-red-500/20">
            <LogOut size={24} />
          </div>
          <span className="text-lg font-bold">Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
}

function ProfileButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-50 p-4 rounded-2xl flex items-center gap-4 transition-colors text-left">
      <div className="p-2 rounded-full bg-zinc-700 text-yellow-400">
        {icon}
      </div>
      <span className="text-lg font-bold">{label}</span>
    </button>
  );
}
