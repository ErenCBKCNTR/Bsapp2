import React, { useState } from 'react';
import { Key, Lock, MessageSquare, Bell, CircleHelp, Users, QrCode, ArrowLeft } from 'lucide-react';

export default function ProfileScreen({ onLogout }: { onLogout?: () => void }) {
  const [activeSetting, setActiveSetting] = useState<string | null>(null);

  if (activeSetting) {
    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
        <div className="bg-[#008069] text-white flex items-center px-4 py-3 gap-4 shadow-sm">
          <button onClick={() => setActiveSetting(null)} className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-medium">{activeSetting}</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-500 gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
            <CircleHelp size={40} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{activeSetting}</h3>
            <p>Bu bölüm demo amaçlıdır. Ayarlar sayfası işlevselliği yakında eklenecektir.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="bg-white px-4 py-4 flex items-center gap-4 mb-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          <img src="https://i.pravatar.cc/150?u=me" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-normal text-black">Kullanıcı Adı</h2>
          <p className="text-sm text-gray-500">Müsait</p>
        </div>
        <QrCode size={24} className="text-[#008069]" />
      </div>
      
      <div className="bg-white border-y border-gray-200 mb-2">
        <SettingsItem onClick={() => setActiveSetting('Hesap')} icon={<Key size={24} className="text-gray-500" />} title="Hesap" subtitle="Güvenlik bildirimleri, numara değiştirme" />
        <SettingsItem onClick={() => setActiveSetting('Gizlilik')} icon={<Lock size={24} className="text-gray-500" />} title="Gizlilik" subtitle="Kişileri engelleme, süreli mesajlar" />
        <SettingsItem onClick={() => setActiveSetting('Sohbetler')} icon={<MessageSquare size={24} className="text-gray-500" />} title="Sohbetler" subtitle="Tema, duvar kağıtları, sohbet geçmişi" />
        <SettingsItem onClick={() => setActiveSetting('Bildirimler')} icon={<Bell size={24} className="text-gray-500" />} title="Bildirimler" subtitle="Mesaj, grup ve arama sesleri" />
        <SettingsItem onClick={() => setActiveSetting('Yardım')} icon={<CircleHelp size={24} className="text-gray-500" />} title="Yardım" subtitle="Yardım merkezi, bize ulaşın, gizlilik ilkesi" />
        <SettingsItem onClick={() => setActiveSetting('Arkadaş davet et')} icon={<Users size={24} className="text-gray-500" />} title="Arkadaş davet et" />
      </div>

      <div className="bg-white border-y border-gray-200 mb-8">
        <button onClick={onLogout} className="w-full flex items-center gap-6 px-4 py-4 hover:bg-gray-50 transition-colors text-left">
          <div className="w-6 flex justify-center">
            <LogOutIcon />
          </div>
          <div className="flex-1 border-b border-gray-100 pb-4 -mb-4">
            <h3 className="text-base font-normal text-red-500">Çıkış Yap</h3>
          </div>
        </button>
      </div>
    </div>
  );
}

function SettingsItem({ icon, title, subtitle, onClick }: { icon: React.ReactNode, title: string, subtitle?: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center gap-6 px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
      <div className="w-6 flex justify-center">
        {icon}
      </div>
      <div className="flex-1 border-b border-gray-100 pb-4 -mb-4">
        <h3 className="text-base font-normal text-black">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function LogOutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  );
}
