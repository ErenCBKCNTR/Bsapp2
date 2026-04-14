/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, CircleDashed, Settings, Camera, Search, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';

// Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RoomsScreen from './screens/RoomsScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-screen bg-white flex items-center justify-center text-[#008069] font-medium text-xl">WhatsApp...</div>;
  }

  if (!session && !isGuest) {
    return <LoginScreen onLoginSuccess={() => setIsGuest(true)} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'messages': return <MessagesScreen />;
      case 'rooms': return <RoomsScreen />;
      case 'home': return <HomeScreen />;
      case 'profile': return <ProfileScreen onLogout={() => { supabase.auth.signOut(); setIsGuest(false); }} />;
      default: return <MessagesScreen />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-black font-sans overflow-hidden">
      {/* Top App Bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#008069] text-white shadow-sm z-10">
        <h1 className="text-xl font-medium">WhatsApp</h1>
        <div className="flex gap-5 items-center">
          <Camera size={22} />
          <Search size={22} />
          <MoreVertical size={22} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 pb-safe z-10">
        <div className="flex justify-around items-center h-16 px-2">
          <NavButton 
            id="messages" 
            icon={<MessageSquare size={24} className={activeTab === 'messages' ? "fill-current" : ""} />} 
            label="Sohbetler" 
            isActive={activeTab === 'messages'} 
            onClick={() => setActiveTab('messages')} 
          />
          <NavButton 
            id="home" 
            icon={<CircleDashed size={24} />} 
            label="Güncellemeler" 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavButton 
            id="rooms" 
            icon={<Phone size={24} className={activeTab === 'rooms' ? "fill-current" : ""} />} 
            label="Aramalar" 
            isActive={activeTab === 'rooms'} 
            onClick={() => setActiveTab('rooms')} 
          />
          <NavButton 
            id="profile" 
            icon={<Settings size={24} className={activeTab === 'profile' ? "fill-current" : ""} />} 
            label="Ayarlar" 
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
        isActive ? 'text-[#008069]' : 'text-gray-500 hover:text-gray-800'
      }`}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={`relative ${isActive ? 'bg-green-100/50 px-4 py-1 rounded-full' : 'px-4 py-1'}`}>
        {icon}
      </div>
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}
