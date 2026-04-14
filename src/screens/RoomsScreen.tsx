import React, { useState, useEffect } from 'react';
import { Mic, Users, Lock, Unlock, Search, Filter, Plus, ArrowRight } from 'lucide-react';
import { supabase, Oda } from '../lib/supabase';
import { generateLiveKitToken } from '../lib/livekit';
import { LiveKitRoom, VideoConference, RoomAudioRenderer } from '@livekit/components-react';
import '@livekit/components-styles';

export default function RoomsScreen() {
  const [rooms, setRooms] = useState<Oda[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showFilters, setShowFilters] = useState(false);
  
  // LiveKit state
  const [activeRoom, setActiveRoom] = useState<Oda | null>(null);
  const [liveKitToken, setLiveKitToken] = useState<string | null>(null);

  const categories = ['Tümü', 'Genel', 'Siyaset', 'Teknoloji', 'Oyun', 'Müzik', 'Eğitim', 'Edebiyat'];

  useEffect(() => {
    fetchRooms();
    
    // Realtime subscription
    const subscription = supabase
      .channel('odalar_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'odalar' }, () => {
        fetchRooms();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase.from('odalar').select('*');
    if (!error && data) {
      setRooms(data);
    }
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
      // Get current user or use a random guest name
      const { data: { user } } = await supabase.auth.getUser();
      const participantName = user?.email || `Misafir_${Math.floor(Math.random() * 1000)}`;
      
      const token = await generateLiveKitToken(room.id, participantName);
      setLiveKitToken(token);
      setActiveRoom(room);
    } catch (error) {
      console.error("LiveKit token hatası:", error);
      alert("Odaya bağlanırken bir hata oluştu.");
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.odaAdi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || room.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (activeRoom && liveKitToken) {
    return (
      <div className="h-full flex flex-col bg-zinc-950">
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-yellow-400">{activeRoom.odaAdi}</h2>
          <button 
            onClick={() => { setActiveRoom(null); setLiveKitToken(null); }}
            className="px-4 py-2 bg-red-500/20 text-red-500 rounded-xl font-bold"
          >
            Odadan Ayrıl
          </button>
        </div>
        <div className="flex-1 relative">
          <LiveKitRoom
            video={false}
            audio={true}
            token={liveKitToken}
            serverUrl={import.meta.env.VITE_LIVEKIT_URL}
            connect={true}
            data-lk-theme="default"
            style={{ height: '100%', backgroundColor: '#09090b' }}
          >
            <VideoConference />
            <RoomAudioRenderer />
          </LiveKitRoom>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto pb-24">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Aktif Odalar</h2>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="p-3 bg-zinc-800 rounded-xl text-yellow-400 hover:bg-zinc-700 transition-colors"
        >
          <Filter size={24} />
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-col gap-4 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input 
              type="text" 
              placeholder="Oda ara..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-yellow-400 text-zinc-50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-yellow-400 text-zinc-950' 
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-yellow-400 font-bold">Yükleniyor...</div>
      ) : filteredRooms.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-zinc-500 font-medium text-lg">
          Oda bulunamadı.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onClick={() => handleJoinRoom(room)} />
          ))}
        </div>
      )}

      <button className="fixed bottom-24 right-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-zinc-950 shadow-lg shadow-yellow-400/20 hover:scale-105 transition-transform">
        <Plus size={32} />
      </button>
    </div>
  );
}

function RoomCard({ room, onClick }: { room: Oda, onClick: () => void }) {
  const isProtected = !!room.sifre;

  return (
    <button 
      onClick={onClick}
      className="w-full bg-zinc-900 hover:bg-zinc-800 p-4 rounded-2xl border border-zinc-800 transition-colors text-left flex items-center gap-4"
    >
      <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center text-yellow-400 shrink-0">
        {isProtected ? <Lock size={32} /> : <Mic size={32} />}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-zinc-50 truncate">{room.odaAdi}</h3>
        <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400 font-medium">
          <span className="bg-zinc-800 px-2 py-1 rounded-md">{room.kategori}</span>
          <span>{room.kapasite} Kişi</span>
        </div>
      </div>

      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-zinc-950 shrink-0">
        <ArrowRight size={20} />
      </div>
    </button>
  );
}
