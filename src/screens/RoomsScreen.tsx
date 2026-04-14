import { Mic, Users, Lock, Unlock } from 'lucide-react';

const mockRooms = [
  { id: 1, name: "Teknoloji Sohbetleri", participants: 12, isPrivate: false, host: "Ahmet Y." },
  { id: 2, name: "Kitap Kulübü", participants: 8, isPrivate: false, host: "Ayşe K." },
  { id: 3, name: "Özel Görüşme", participants: 2, isPrivate: true, host: "Mehmet D." },
  { id: 4, name: "Gündem Değerlendirmesi", participants: 45, isPrivate: false, host: "Zeynep A." },
];

export default function RoomsScreen() {
  return (
    <div className="p-6 flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Sesli Odalar</h2>
        <span className="bg-yellow-400 text-zinc-950 px-3 py-1 rounded-full font-bold text-sm">
          {mockRooms.length} Aktif
        </span>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pb-20">
        {mockRooms.map((room) => (
          <button 
            key={room.id}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-50 p-5 rounded-2xl flex flex-col gap-3 transition-transform active:scale-95 text-left border border-zinc-700/50"
            aria-label={`${room.name} odası, ${room.participants} katılımcı, ${room.isPrivate ? 'Özel oda' : 'Açık oda'}`}
          >
            <div className="flex justify-between items-start w-full">
              <h3 className="text-xl font-bold text-yellow-400">{room.name}</h3>
              {room.isPrivate ? (
                <Lock size={20} className="text-zinc-500" aria-label="Özel Oda" />
              ) : (
                <Unlock size={20} className="text-zinc-500" aria-label="Açık Oda" />
              )}
            </div>
            
            <div className="flex justify-between items-center w-full mt-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 font-bold">
                  {room.host.charAt(0)}
                </div>
                <span className="font-medium">{room.host}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full">
                <Users size={16} className="text-yellow-400" />
                <span className="font-bold">{room.participants}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
