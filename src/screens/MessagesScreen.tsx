import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Archive, ArrowLeft, Video, Phone, MoreVertical, Plus, Camera, Mic, Send } from 'lucide-react';

const mockMessagesList = [
  { id: 1, name: "Ahmet Yılmaz", lastMessage: "Merhaba, nasılsın?", time: "10:42", unread: 2, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Ayşe Kaya", lastMessage: "Odadaki tartışma çok iyiydi.", time: "Dün", unread: 0, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Mehmet Demir", lastMessage: "Yarın görüşürüz.", time: "Salı", unread: 0, avatar: "https://i.pravatar.cc/150?u=3" },
];

const initialChatHistory: Record<number, any[]> = {
  1: [
    { id: 1, text: "Selam Ahmet!", isMe: true, time: "10:40" },
    { id: 2, text: "Merhaba, nasılsın?", isMe: false, time: "10:42" }
  ],
  2: [
    { id: 1, text: "Odadaki tartışma çok iyiydi.", isMe: false, time: "Dün" }
  ],
  3: [
    { id: 1, text: "Yarın görüşürüz.", isMe: false, time: "Salı" }
  ]
};

export default function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChat) {
      setChatMessages(initialChatHistory[selectedChat.id] || []);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newMessage]);
    setInputText('');
  };

  if (selectedChat) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-[#efeae2]">
        {/* Header */}
        <div className="bg-[#008069] text-white flex items-center px-2 py-2 shadow-sm">
          <button onClick={() => setSelectedChat(null)} className="flex items-center p-1 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-9 h-9 rounded-full ml-1 mr-2 object-cover" />
          </button>
          <div className="flex-1 min-w-0 cursor-pointer">
            <h3 className="font-medium text-base truncate">{selectedChat.name}</h3>
            <p className="text-xs text-white/80 truncate">çevrimiçi</p>
          </div>
          <div className="flex items-center gap-4 px-2">
            <Video size={22} className="cursor-pointer" />
            <Phone size={20} className="cursor-pointer" />
            <MoreVertical size={22} className="cursor-pointer" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-50">
          <div className="text-center my-2">
            <span className="bg-[#FFEECD] text-gray-600 text-xs px-3 py-1 rounded-lg shadow-sm">
              Mesajlar ve aramalar uçtan uca şifrelidir.
            </span>
          </div>
          {chatMessages.map(msg => (
            <div key={msg.id} className={`max-w-[80%] rounded-lg p-2 text-sm relative shadow-sm ${msg.isMe ? 'bg-[#d9fdd3] self-end rounded-tr-none' : 'bg-white self-start rounded-tl-none'}`}>
              <span className="break-words pr-12">{msg.text}</span>
              <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-[#f0f2f5] p-2 flex items-end gap-2 pb-safe">
          <div className="flex-1 bg-white rounded-3xl flex items-end px-2 py-1 min-h-[44px] shadow-sm">
            <button className="p-2 text-gray-500 hover:text-gray-700"><Plus size={24} /></button>
            <textarea
              placeholder="Mesaj"
              className="flex-1 bg-transparent outline-none px-2 py-2.5 resize-none max-h-24 min-h-[40px]"
              rows={1}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            {!inputText && <button className="p-2 text-gray-500 hover:text-gray-700"><Camera size={24} /></button>}
          </div>
          <button 
            onClick={inputText ? handleSend : undefined} 
            className="w-12 h-12 rounded-full bg-[#008069] flex items-center justify-center text-white shrink-0 shadow-sm hover:bg-[#016856] transition-colors mb-0.5"
          >
            {inputText ? <Send size={20} className="ml-1" /> : <Mic size={24} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
        <Archive size={20} className="text-gray-500 ml-2" />
        <span className="text-base font-medium text-gray-900">Arşivlenmiş</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {mockMessagesList.map((msg) => (
          <div key={msg.id} onClick={() => setSelectedChat(msg)} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
            <img src={msg.avatar} alt={msg.name} className="w-12 h-12 rounded-full object-cover mr-4" />
            
            <div className="flex-1 border-b border-gray-100 pb-3 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-base font-medium text-gray-900 truncate">{msg.name}</h3>
                <span className={`text-xs flex-shrink-0 ${msg.unread > 0 ? 'text-[#25D366] font-medium' : 'text-gray-500'}`}>
                  {msg.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 truncate pr-2">{msg.lastMessage}</p>
                {msg.unread > 0 && (
                  <span className="bg-[#25D366] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center flex-shrink-0">
                    {msg.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="fixed bottom-20 right-4 w-14 h-14 bg-[#008069] rounded-2xl flex items-center justify-center text-white shadow-lg hover:bg-[#016856] transition-colors z-20">
        <MessageSquare size={24} className="fill-current" />
      </button>
    </div>
  );
}
