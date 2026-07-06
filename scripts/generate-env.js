const fs = require('fs');
const path = require('path');

const env = {
  SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL || '',
  SUPABASE_ANON_API_KEY: process.env.SUPABASE_ANON_API_KEY || ''
};

const outputPath = path.join(__dirname, '..', 'public', 'env.js');
const contents = `window.PQS_ENV = ${JSON.stringify(env, null, 2)};\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, contents, 'utf8');
console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
