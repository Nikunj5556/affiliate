// api/coupons/create.js — Backend coupon creation with RLS bypass
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
    const payload = req.body;

    if (!payload.affiliate_id || !payload.coupon_code) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if coupon code already exists
    const { data: existing } = await supabase
      .from('coupons')
      .select('id')
      .eq('coupon_code', payload.coupon_code)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ error: 'Coupon code already exists' });
    }

    const { data, error } = await supabase
      .from('coupons')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Coupon creation error:', error);
    res.status(500).json({ error: error.message });
  }
}
