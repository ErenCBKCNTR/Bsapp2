/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home, Mic, MessageSquare, User, Settings, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Screens
import HomeScreen from './screens/HomeScreen';
import RoomsScreen from './screens/RoomsScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'rooms': return <RoomsScreen />;
      case 'messages': return <MessagesScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden selection:bg-yellow-400 selection:text-zinc-950">
      {/* Top App Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 z-10">
        <h1 className="text-2xl font-bold tracking-tight text-yellow-400">Blind Social</h1>
        <div className="flex gap-4">
          <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors" aria-label="Bildirimler">
            <Bell size={24} className="text-zinc-300" />
          </button>
          <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors" aria-label="Ayarlar">
            <Settings size={24} className="text-zinc-300" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-zinc-900 border-t border-zinc-800 pb-safe">
        <div className="flex justify-around items-center h-20 px-2">
          <NavButton 
            id="home" 
            icon={<Home size={28} />} 
            label="Ana Sayfa" 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavButton 
            id="rooms" 
            icon={<Mic size={28} />} 
            label="Odalar" 
            isActive={activeTab === 'rooms'} 
            onClick={() => setActiveTab('rooms')} 
          />
          <NavButton 
            id="messages" 
            icon={<MessageSquare size={28} />} 
            label="Mesajlar" 
            isActive={activeTab === 'messages'} 
            onClick={() => setActiveTab('messages')} 
          />
          <NavButton 
            id="profile" 
            icon={<User size={28} />} 
            label="Profil" 
            isActive={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ id, icon, label, isActive, onClick }: { id: string, icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
        isActive ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-300'
      }`}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="relative">
        {icon}
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full -translate-x-1/2"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
      <span className="text-[11px] font-medium mt-1">{label}</span>
    </button>
  );
}
