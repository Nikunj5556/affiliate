// api/otp/create.js — Backend OTP creation with RLS bypass
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { affiliate_email, affiliate_name } = req.body;

    if (!affiliate_email) {
      return res.status(400).json({ error: 'Missing affiliate_email' });
    }

    const { data, error } = await supabase
      .from('affiliate_email_otp')
      .insert([{
        affiliate_email,
        affiliate_name: affiliate_name || '',
        is_used: false,
        email_sent: true
        // otp_code and expires_at are auto-generated in the DB
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('OTP creation error:', error);
    res.status(500).json({ error: error.message });
  }
}
