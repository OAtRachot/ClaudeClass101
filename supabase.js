// ไคลเอนต์ Supabase (โปรเจกต์ ThaiFood) ต้องโหลดหลัง supabase-js จาก CDN
// publishable key ออกแบบมาให้อยู่ในโค้ดฝั่งเบราว์เซอร์ได้ ความปลอดภัยของข้อมูลอยู่ที่ RLS
const SUPABASE_URL = "https://xdwqqlnicygwzzlqovhs.supabase.co";
const SUPABASE_KEY = "sb_publishable_l62ieeolghpWb2UcJiqb2w_ddvbEzZo";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
