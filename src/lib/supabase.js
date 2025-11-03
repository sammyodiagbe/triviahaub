import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epzbmjhxzwnqsmajmrtx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwemJtamh4enducXNtYWptcnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzkxMTUsImV4cCI6MjA3Nzc1NTExNX0.56S7HiKtn_gHpanG0xMJ9lNXzFLNIGfdXSb9xLQKi54';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
