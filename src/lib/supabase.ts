import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Oda = {
  id: string;
  odaAdi: string;
  kapasite: number;
  kategori: string;
  sifre?: string;
  kurucuId?: string;
  olusturulmaTarihi?: string;
};
