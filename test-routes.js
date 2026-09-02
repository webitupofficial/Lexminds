const http = require('http');

const routes = [
  '/',
  '/internships',
  '/internships/corporate-ma-research-fellowship-shardul-amarchand',
  '/articles',
  '/articles/digital-personal-data-protection-act-2023-compliance-framework',
  '/publish',
  '/about',
  '/contact',
  '/editorial-policy',
  '/admin',
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/non-existent-precedent' // Expected 404
];

async function checkRoute(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length,
          hasH1: data.includes('<h1'),
          hasLexMinds: data.includes('LexMinds') || data.includes('LEXMINDS'),
          hasJsonLd: data.includes('application/ld+json')
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('--- Testing LexMinds Routes ---');
  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(`[${res.statusCode}] ${res.path.padEnd(45)} | Size: ${(res.length || 0).toString().padStart(6)} bytes | H1: ${res.hasH1} | JSON-LD: ${res.hasJsonLd}`);
  }

  // Test API Endpoints
  console.log('\n--- Testing API Endpoints ---');
  const apiRes = await checkRoute('/api/articles');
  console.log(`[${apiRes.statusCode}] /api/articles (GET)`);
  const appRes = await checkRoute('/api/applications');
  console.log(`[${appRes.statusCode}] /api/applications (GET)`);
}

run();
