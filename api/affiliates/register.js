// api/affiliates/register.js — Backend affiliate registration with RLS bypass
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Create admin client with service role key (bypasses RLS)
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const payload = req.body;

    // Validation
    if (!payload.affiliate_email || !payload.name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if email already exists and is verified
    const { data: existing } = await supabase
      .from('affiliates')
      .select('id, is_email_verified')
      .eq('affiliate_email', payload.affiliate_email)
      .maybeSingle();

    if (existing?.is_email_verified) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Insert or update affiliate
    let result;
    if (existing) {
      const { data, error } = await supabase
        .from('affiliates')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from('affiliates')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      result = data;
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
}
