import { Play, Users, Plus } from 'lucide-react';

export default function HomeScreen() {
  return (
    <div className="p-6 flex flex-col gap-8 h-full">
      <section>
        <h2 className="text-3xl font-bold mb-2">Hoş Geldiniz!</h2>
        <p className="text-zinc-400 text-lg">
          Blind Social'a hoş geldiniz. Bu uygulama erişilebilir ve güvenli bir şekilde iletişim kurmanız için tasarlanmıştır.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-zinc-300">Hızlı İşlemler</h3>
        
        <button 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-950 p-6 rounded-2xl flex items-center gap-4 transition-transform active:scale-95"
          aria-label="Yeni bir sesli oda oluştur"
        >
          <div className="bg-zinc-950/10 p-3 rounded-full">
            <Plus size={32} />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold">Oda Oluştur</div>
            <div className="text-zinc-800 font-medium">Yeni bir sohbet başlat</div>
          </div>
        </button>

        <button 
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-50 p-6 rounded-2xl flex items-center gap-4 transition-transform active:scale-95"
          aria-label="Aktif odalara katıl"
        >
          <div className="bg-zinc-700 p-3 rounded-full text-yellow-400">
            <Play size={32} />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold">Odalara Katıl</div>
            <div className="text-zinc-400 font-medium">Aktif sohbetleri keşfet</div>
          </div>
        </button>

        <button 
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-50 p-6 rounded-2xl flex items-center gap-4 transition-transform active:scale-95"
          aria-label="Arkadaşlarını bul"
        >
          <div className="bg-zinc-700 p-3 rounded-full text-yellow-400">
            <Users size={32} />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold">Arkadaş Bul</div>
            <div className="text-zinc-400 font-medium">Yeni insanlarla tanış</div>
          </div>
        </button>
      </section>
    </div>
  );
}
