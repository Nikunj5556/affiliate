const fs = require('fs');

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  SUPABASE_URL or SUPABASE_ANON_KEY not set — placeholders will remain.');
}

['affiliate.html', 'dashboard.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replaceAll('##SUPABASE_URL##', SUPABASE_URL);
  content = content.replaceAll('##SUPABASE_ANON_KEY##', SUPABASE_ANON_KEY);
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Injected env into ${file}`);
});
