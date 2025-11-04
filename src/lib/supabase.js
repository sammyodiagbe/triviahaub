import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase credentials
// You can find these in your Supabase project settings under API
const supabaseUrl = 'https://epzbmjhxzwnqsmajmrtx.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace this with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
