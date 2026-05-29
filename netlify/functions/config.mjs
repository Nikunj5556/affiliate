export default async () => {
  const supabaseUrl = Netlify.env.get('SUPABASE_URL') || '';
  const supabaseAnonKey = Netlify.env.get('SUPABASE_ANON_KEY') || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response(
      JSON.stringify({ error: 'Supabase environment variables are not configured.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return Response.json({ supabaseUrl, supabaseAnonKey });
};
