import { MessageSquare } from 'lucide-react';

const mockMessages = [
  { id: 1, name: "Ahmet Yılmaz", lastMessage: "Merhaba, nasılsın?", time: "10:42", unread: 2 },
  { id: 2, name: "Ayşe Kaya", lastMessage: "Odadaki tartışma çok iyiydi.", time: "Dün", unread: 0 },
  { id: 3, name: "Mehmet Demir", lastMessage: "Yarın görüşürüz.", time: "Salı", unread: 0 },
];

export default function MessagesScreen() {
  return (
    <div className="p-6 flex flex-col gap-6 h-full">
      <h2 className="text-3xl font-bold">Mesajlar</h2>

      <div className="flex flex-col gap-3 overflow-y-auto pb-20">
        {mockMessages.map((msg) => (
          <button 
            key={msg.id}
            className="w-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-50 p-4 rounded-2xl flex items-center gap-4 transition-colors text-left"
            aria-label={`${msg.name} ile sohbet. Son mesaj: ${msg.lastMessage}. ${msg.unread > 0 ? `${msg.unread} okunmamış mesaj` : ''}`}
          >
            <div className="w-14 h-14 rounded-full bg-zinc-700 flex-shrink-0 flex items-center justify-center text-xl font-bold text-yellow-400">
              {msg.name.charAt(0)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold truncate">{msg.name}</h3>
                <span className="text-sm text-zinc-500 flex-shrink-0">{msg.time}</span>
              </div>
              <p className={`truncate ${msg.unread > 0 ? 'text-zinc-200 font-medium' : 'text-zinc-400'}`}>
                {msg.lastMessage}
              </p>
            </div>

            {msg.unread > 0 && (
              <div className="w-6 h-6 rounded-full bg-yellow-400 text-zinc-950 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {msg.unread}
              </div>
            )}
          </button>
        ))}

        {mockMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-4">
            <MessageSquare size={48} className="opacity-50" />
            <p className="text-lg font-medium">Henüz mesajınız yok</p>
          </div>
        )}
      </div>
    </div>
  );
}
