// api/affiliates/login.js — Backend affiliate login with RLS bypass
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
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // Fetch affiliate by email
    const { data: affiliate, error } = await supabase
      .from('affiliates')
      .select('*')
      .eq('affiliate_email', email.toLowerCase())
      .eq('is_email_verified', true)
      .maybeSingle();

    if (error) throw error;
    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found or email not verified' });
    }

    res.status(200).json({ success: true, data: affiliate });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
}
