// api/affiliates/get.js — Fetch affiliate by ID (with RLS bypass)
// Called after OTP verification to pull fresh sales/revenue data.
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing id query parameter' });
    }

    const { data: affiliate, error } = await supabase
      .from('affiliates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    res.status(200).json({ success: true, data: affiliate });
  } catch (error) {
    console.error('Get affiliate error:', error);
    res.status(500).json({ error: error.message });
  }
}
