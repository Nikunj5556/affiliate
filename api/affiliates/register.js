// api/affiliates/register.js — Backend affiliate registration with RLS bypass
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

    if (!payload.affiliate_email || !payload.name) {
      return res.status(400).json({ error: 'Missing required fields: name and affiliate_email' });
    }

    // Check if email already registered
    const { data: existing } = await supabase
      .from('affiliates')
      .select('id, is_email_verified')
      .eq('affiliate_email', payload.affiliate_email.toLowerCase().trim())
      .maybeSingle();

    if (existing?.is_email_verified) {
      return res.status(409).json({ error: 'This email is already registered and verified.' });
    }

    // Sanitise payload — only include known columns
    const record = {
      name:                   payload.name,
      affiliate_email:        payload.affiliate_email.toLowerCase().trim(),
      is_email_verified:      true,
      affiliate_phone:        payload.affiliate_phone || null,
      affiliate_commission:   'standard_partner_20%',
      affiliate_sales:        0,
      affiliate_revenue_inr:  0,
      best_role:              payload.best_role || null,
      bankaccount_name:       payload.bankaccount_name || null,
      bankaccount_number:     payload.bankaccount_number || null,
      bankaccount_ifsc:       payload.bankaccount_ifsc || null,
    };

    const { data, error } = await supabase
      .from('affiliates')
      .insert([record])
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Register affiliate error:', error);
    res.status(500).json({ error: error.message });
  }
}
