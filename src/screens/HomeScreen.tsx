import React, { useState, useEffect } from 'react';
import { MoreVertical, Plus, X, Eye } from 'lucide-react';

export default function HomeScreen() {
  const [viewingStatus, setViewingStatus] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (viewingStatus) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setViewingStatus(false);
            return 0;
          }
          return p + 1.5;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [viewingStatus]);

  if (viewingStatus) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="flex gap-1 px-2 pt-4">
          <div className="h-1 bg-gray-600 flex-1 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 text-white">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?u=me" alt="Me" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-medium">Durumum</h3>
              <p className="text-xs text-gray-300">Şimdi</p>
            </div>
          </div>
          <button onClick={() => setViewingStatus(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
          <div className="text-white text-3xl font-medium text-center px-6 drop-shadow-md">
            Bugün harika bir gün! 🌟
          </div>
        </div>
        <div className="p-6 flex justify-center pb-safe">
          <div className="text-white flex flex-col items-center gap-1 cursor-pointer hover:text-gray-300 transition-colors">
            <Eye size={24} />
            <span className="text-xs font-medium">0 görüntülenme</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-medium text-black">Durum</h2>
        <MoreVertical size={20} className="text-gray-600 cursor-pointer" />
      </div>
      
      <div onClick={() => setViewingStatus(true)} className="px-4 py-2 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden border-2 border-[#25D366] p-0.5">
            <img src="https://i.pravatar.cc/150?u=me" alt="My Status" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#25D366] rounded-full border-2 border-white flex items-center justify-center text-white">
            <Plus size={14} />
          </div>
        </div>
        <div className="flex-1 border-b border-gray-100 pb-3">
          <h3 className="text-base font-medium text-black">Durumum</h3>
          <p className="text-sm text-gray-500">Şimdi eklendi</p>
        </div>
      </div>
      
      <div className="px-4 py-2 mt-2">
        <h2 className="text-sm font-medium text-gray-500 mb-4">Son güncellemeler</h2>
        <div className="text-center text-gray-400 py-8 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Plus size={24} className="text-gray-400" />
          </div>
          <p>Şu an için yeni güncelleme yok</p>
        </div>
      </div>
    </div>
  );
}
