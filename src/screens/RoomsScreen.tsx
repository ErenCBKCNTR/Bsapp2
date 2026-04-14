import React, { useState, useEffect } from 'react';
import { Phone, Link2, ArrowUpRight } from 'lucide-react';
import { supabase, Oda } from '../lib/supabase';
import { generateLiveKitToken } from '../lib/livekit';
import { LiveKitRoom, VideoConference, RoomAudioRenderer } from '@livekit/components-react';
import '@livekit/components-styles';

export default function RoomsScreen() {
  const [rooms, setRooms] = useState<Oda[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState<Oda | null>(null);
  const [liveKitToken, setLiveKitToken] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms();
    const subscription = supabase
      .channel('odalar_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'odalar' }, () => {
        fetchRooms();
      })
      .subscribe();
    return () => { subscription.unsubscribe(); };
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase.from('odalar').select('*');
    if (!error && data) setRooms(data);
    setLoading(false);
  };

  const handleJoinRoom = async (room: Oda) => {
    if (room.sifre) {
      const password = prompt(`${room.odaAdi} odası için şifre girin:`);
      if (password !== room.sifre) {
        alert("Yanlış şifre!");
        return;
      }
    }
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const participantName = user?.email || `Misafir_${Math.floor(Math.random() * 1000)}`;
      const token = await generateLiveKitToken(room.id, participantName);
      setLiveKitToken(token);
      setActiveRoom(room);
    } catch (error) {
      alert("Odaya bağlanırken bir hata oluştu.");
    }
  };

  if (activeRoom && liveKitToken) {
    return (
      <div className="h-full flex flex-col bg-black">
        <div className="p-4 bg-[#008069] flex justify-between items-center text-white z-10">
          <h2 className="text-lg font-medium">{activeRoom.odaAdi}</h2>
          <button onClick={() => { setActiveRoom(null); setLiveKitToken(null); }} className="px-3 py-1 bg-red-500 rounded-full text-sm font-medium">
            Aramayı Bitir
          </button>
        </div>
        <div className="flex-1 relative">
          <LiveKitRoom video={false} audio={true} token={liveKitToken} serverUrl={import.meta.env.VITE_LIVEKIT_URL} connect={true} data-lk-theme="default" style={{ height: '100%', backgroundColor: '#000' }}>
            <VideoConference />
            <RoomAudioRenderer />
          </LiveKitRoom>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-[#008069] flex items-center justify-center text-white">
          <Link2 size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-900">Arama bağlantısı oluştur</h3>
          <p className="text-sm text-gray-500">WhatsApp aramanız için bir bağlantı paylaşın</p>
        </div>
      </div>
      
      <div className="px-4 py-2 font-medium text-gray-900 text-sm">En son</div>
      
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center py-4 text-gray-500">Yükleniyor...</div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Arama geçmişi yok</div>
        ) : (
          rooms.map((room) => (
            <div key={room.id} onClick={() => handleJoinRoom(room)} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4 font-medium text-lg">
                {room.odaAdi.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 border-b border-gray-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className={`text-base font-medium truncate ${room.sifre ? 'text-red-500' : 'text-gray-900'}`}>{room.odaAdi}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <ArrowUpRight size={14} className="text-[#25D366]" />
                    {room.kategori} • {room.kapasite} Kişi
                  </p>
                </div>
                <Phone size={22} className="text-[#008069]" />
              </div>
            </div>
          ))
        )}
      </div>

      <button className="fixed bottom-20 right-4 w-14 h-14 bg-[#008069] rounded-2xl flex items-center justify-center text-white shadow-lg hover:bg-[#016856] transition-colors z-20">
        <Phone size={24} className="fill-current" />
      </button>
    </div>
  );
}
