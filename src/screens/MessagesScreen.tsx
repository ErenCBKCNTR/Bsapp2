import React, { useState } from 'react';
import { MessageSquare, Filter } from 'lucide-react';

const mockMessages = [
  { id: 1, name: "Ahmet Yılmaz", lastMessage: "Merhaba, nasılsın?", time: "10:42", unread: 2 },
  { id: 2, name: "Ayşe Kaya", lastMessage: "Odadaki tartışma çok iyiydi.", time: "Dün", unread: 0 },
  { id: 3, name: "Mehmet Demir", lastMessage: "Yarın görüşürüz.", time: "Salı", unread: 0 },
];

type FilterType = 'all' | 'unread' | 'read';

export default function MessagesScreen() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredMessages = mockMessages.filter(msg => {
    if (filter === 'unread') return msg.unread > 0;
    if (filter === 'read') return msg.unread === 0;
    return true;
  });

  return (
    <div className="p-6 flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Mesajlar</h2>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="appearance-none bg-zinc-800 text-zinc-50 py-2 pl-4 pr-10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-zinc-700 cursor-pointer"
            aria-label="Mesajları filtrele"
          >
            <option value="all">Tümü</option>
            <option value="unread">Okunmamış</option>
            <option value="read">Okunmuş</option>
          </select>
          <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pb-20">
        {filteredMessages.map((msg) => (
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

        {filteredMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-4">
            <MessageSquare size={48} className="opacity-50" />
            <p className="text-lg font-medium">Bu filtreye uygun mesaj yok</p>
          </div>
        )}
      </div>
    </div>
  );
}
