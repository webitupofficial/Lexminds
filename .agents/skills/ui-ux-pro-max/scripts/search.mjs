#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

const CSV_CONFIG = {
  style: {
    file: "styles.csv",
    search_cols: ["Style ID", "Style Category", "Aliases", "Keywords", "Best For", "Type", "AI Prompt Keywords"],
    output_cols: ["Style ID", "Style Category", "Aliases", "Status", "Parent Style ID", "Preferred Mode", "Type", "Keywords", "Primary Colors", "Effects & Animation", "Best For", "Light Mode ✓", "Dark Mode ✓", "Performance", "Accessibility", "Framework Compatibility", "Complexity", "AI Prompt Keywords", "CSS/Technical Keywords", "Implementation Checklist", "Design System Variables"]
  },
  color: {
    file: "colors.csv",
    search_cols: ["Product Type", "Notes"],
    output_cols: ["Product Type", "Primary", "On Primary", "Secondary", "On Secondary", "Accent", "On Accent", "Background", "Foreground", "Card", "Card Foreground", "Muted", "Muted Foreground", "Border", "Destructive", "On Destructive", "Ring", "Notes"]
  },
  chart: {
    file: "charts.csv",
    search_cols: ["Data Type", "Keywords", "Best Chart Type", "When to Use", "When NOT to Use", "Accessibility Notes"],
    output_cols: ["Data Type", "Keywords", "Best Chart Type", "Secondary Options", "When to Use", "When NOT to Use", "Data Volume Threshold", "Color Guidance", "Accessibility Grade", "Accessibility Risk", "Accessibility Notes", "A11y Fallback", "Library Recommendation", "Interactive Level"]
  },
  landing: {
    file: "landing.csv",
    search_cols: ["Pattern ID", "Pattern Name", "Aliases", "Keywords", "Conversion Optimization", "Section Order"],
    output_cols: ["Pattern ID", "Pattern Name", "Aliases", "Keywords", "Section Order", "Primary CTA Placement", "Color Strategy", "Conversion Optimization"]
  },
  product: {
    file: "products.csv",
    search_cols: ["Product Type", "Keywords", "Primary Style Recommendation", "Key Considerations"],
    output_cols: ["Product Type", "Keywords", "Primary Style Recommendation", "Secondary Styles", "Landing Page Pattern", "Dashboard Style (if applicable)", "Color Palette Focus"]
  },
  ux: {
    file: "ux-guidelines.csv",
    search_cols: ["Category", "Issue", "Description", "Platform"],
    output_cols: ["Category", "Issue", "Platform", "Description", "Do", "Don't", "Code Example Good", "Code Example Bad", "Severity"]
  },
  typography: {
    file: "typography.csv",
    search_cols: ["Font Pairing Name", "Category", "Mood/Style Keywords", "Best For", "Heading Font", "Body Font"],
    output_cols: ["Font Pairing Name", "Category", "Heading Font", "Body Font", "Mood/Style Keywords", "Best For", "Google Fonts URL", "CSS Import", "Tailwind Config", "Notes"]
  },
  icons: {
    file: "icons.csv",
    search_cols: ["Category", "Icon Name", "Keywords", "Best For", "Library"],
    output_cols: ["Category", "Icon Name", "Keywords", "Library", "Import Code", "Usage", "Best For", "Style", "Semantic Role", "Allowed Contexts"]
  },
  gsap: {
    file: "motion.csv",
    search_cols: ["Category", "Intensity Tier", "Keywords", "Trigger"],
    output_cols: ["Category", "Intensity Tier", "Trigger", "Duration", "Easing", "GSAP Snippet", "Framework Notes", "Do", "Don't", "Performance Notes"]
  },
  react: {
    file: "react-performance.csv",
    search_cols: ["Category", "Issue", "Keywords", "Description"],
    output_cols: ["Category", "Issue", "Platform", "Description", "Do", "Don't", "Code Example Good", "Code Example Bad", "Severity"]
  },
  web: {
    file: "app-interface.csv",
    search_cols: ["Category", "Issue", "Keywords", "Description"],
    output_cols: ["Category", "Issue", "Platform", "Description", "Do", "Don't", "Code Example Good", "Code Example Bad", "Severity"]
  },
  "google-fonts": {
    file: "google-fonts.csv",
    search_cols: ["Family", "Category", "Stroke", "Classifications", "Keywords", "Subsets", "Designers"],
    output_cols: ["Family", "Category", "Stroke", "Classifications", "Styles", "Variable Axes", "Subsets", "Designers", "Popularity Rank", "Google Fonts URL"]
  }
};

const STACK_CONFIG = {
  react: { file: "stacks/react.csv" },
  nextjs: { file: "stacks/nextjs.csv" },
  vue: { file: "stacks/vue.csv" },
  svelte: { file: "stacks/svelte.csv" },
  astro: { file: "stacks/astro.csv" },
  swiftui: { file: "stacks/swiftui.csv" },
  "react-native": { file: "stacks/react-native.csv" },
  flutter: { file: "stacks/flutter.csv" },
  nuxtjs: { file: "stacks/nuxtjs.csv" },
  "nuxt-ui": { file: "stacks/nuxt-ui.csv" },
  "html-tailwind": { file: "stacks/html-tailwind.csv" },
  shadcn: { file: "stacks/shadcn.csv" },
  "jetpack-compose": { file: "stacks/jetpack-compose.csv" },
  threejs: { file: "stacks/threejs.csv" },
  angular: { file: "stacks/angular.csv" },
  laravel: { file: "stacks/laravel.csv" }
};

const UNTRUNCATED_COLS = new Set([
  "Code Example Good", "Code Example Bad", "Code Good", "Code Bad",
  "Implementation Checklist", "Design System Variables", "CSS Import",
  "Tailwind Config", "GSAP Snippet"
]);

function parseCSV(content) {
  const rows = [];
  let row = [];
  let inQuotes = false;
  let currentField = '';
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(currentField);
        currentField = '';
      } else if (char === '\r') {
        // ignore CR
      } else if (char === '\n') {
        row.push(currentField);
        rows.push(row);
        row = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }
  if (currentField || row.length > 0) {
    row.push(currentField);
    rows.push(row);
  }
  if (rows.length === 0) return [];
  const headers = rows[0].map(h => h.trim());
  const parsed = [];
  for (let r = 1; r < rows.length; r++) {
    if (rows[r].length === 0 || (rows[r].length === 1 && !rows[r][0].trim())) continue;
    const item = {};
    for (let c = 0; c < headers.length; c++) {
      item[headers[c]] = rows[r][c] !== undefined ? rows[r][c].trim() : '';
    }
    parsed.push(item);
  }
  return parsed;
}

function tokenize(text) {
  return (text || '').toLowerCase().match(/[a-z0-9_\-]+/g) || [];
}

function bm25Score(queryTokens, docTokens, docCount, avgDocLength, docFreqs) {
  const k1 = 1.5;
  const b = 0.75;
  const docLen = docTokens.length;
  let score = 0;

  const tokenCounts = {};
  for (const t of docTokens) {
    tokenCounts[t] = (tokenCounts[t] || 0) + 1;
  }

  for (const q of queryTokens) {
    const tf = tokenCounts[q] || 0;
    if (tf === 0) continue;
    const df = docFreqs[q] || 0;
    const idf = Math.log((docCount - df + 0.5) / (df + 0.5) + 1);
    const num = tf * (k1 + 1);
    const denom = tf + k1 * (1 - b + b * (docLen / (avgDocLength || 1)));
    score += idf * (num / denom);
  }
  return score;
}

function searchData(items, searchCols, outputCols, query, maxResults = 3) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const docCount = items.length;
  const docTokensList = items.map(item => {
    const combined = searchCols.map(col => item[col] || '').join(' ');
    return tokenize(combined);
  });

  const totalLen = docTokensList.reduce((sum, d) => sum + d.length, 0);
  const avgDocLength = totalLen / (docCount || 1);

  const docFreqs = {};
  for (const tokens of docTokensList) {
    const unique = new Set(tokens);
    for (const u of unique) {
      docFreqs[u] = (docFreqs[u] || 0) + 1;
    }
  }

  const scored = items.map((item, idx) => {
    const score = bm25Score(queryTokens, docTokensList[idx], docCount, avgDocLength, docFreqs);
    return { item, score };
  }).filter(s => s.score > 0);

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, maxResults).map(s => {
    const res = {};
    for (const col of outputCols) {
      res[col] = s.item[col] !== undefined ? s.item[col] : '';
    }
    return res;
  });
}

function loadCSV(relPath) {
  const fullPath = path.join(DATA_DIR, relPath);
  if (!fs.existsSync(fullPath)) return [];
  const raw = fs.readFileSync(fullPath, 'utf8');
  return parseCSV(raw);
}

function autoDetectDomain(query) {
  const q = query.toLowerCase();
  if (q.includes('font') || q.includes('type') || q.includes('serif') || q.includes('heading')) return 'typography';
  if (q.includes('color') || q.includes('palette') || q.includes('theme') || q.includes('hex')) return 'color';
  if (q.includes('chart') || q.includes('graph') || q.includes('metric') || q.includes('plot')) return 'chart';
  if (q.includes('landing') || q.includes('hero') || q.includes('conversion') || q.includes('cta')) return 'landing';
  if (q.includes('icon') || q.includes('svg') || q.includes('symbol')) return 'icons';
  if (q.includes('motion') || q.includes('animate') || q.includes('gsap') || q.includes('spring')) return 'gsap';
  if (q.includes('react') || q.includes('memo') || q.includes('rerender') || q.includes('hook')) return 'react';
  if (q.includes('native') || q.includes('mobile') || q.includes('ios') || q.includes('android')) return 'web';
  if (q.includes('ux') || q.includes('accessib') || q.includes('aria') || q.includes('contrast') || q.includes('keyboard')) return 'ux';
  if (q.includes('product') || q.includes('saas') || q.includes('e-commerce') || q.includes('dashboard')) return 'product';
  return 'style';
}

function formatOutput(result, full = false) {
  if (result.error) return `Error: ${result.error}`;
  const out = [];
  if (result.stack) {
    out.push(`## UI Pro Max Stack Guidelines`);
    out.push(`**Stack:** ${result.stack} | **Query:** ${result.query}`);
  } else {
    out.push(`## UI Pro Max Search Results`);
    out.push(`**Domain:** ${result.domain}${result.auto_detected ? ' (auto-detected)' : ''} | **Query:** ${result.query}`);
  }
  out.push(`**Source:** ${result.file} | **Found:** ${result.count} results\n`);

  if (result.count === 0) {
    out.push("No matches. Retry with broader/different keywords before falling back to general defaults.");
    return out.join('\n');
  }

  result.results.forEach((row, idx) => {
    out.push(`### Result ${idx + 1}`);
    for (const [key, value] of Object.entries(row)) {
      let valStr = String(value);
      if (!full && !UNTRUNCATED_COLS.has(key) && valStr.length > 300) {
        valStr = valStr.substring(0, 300) + '...';
      }
      out.push(`- **${key}:** ${valStr}`);
    }
    out.push('');
  });

  return out.join('\n');
}

function runDesignSystem(query, projectName = 'New Project', options = {}) {
  const styles = loadCSV(CSV_CONFIG.style.file);
  const colors = loadCSV(CSV_CONFIG.color.file);
  const typography = loadCSV(CSV_CONFIG.typography.file);
  const landings = loadCSV(CSV_CONFIG.landing.file);
  const motions = loadCSV(CSV_CONFIG.gsap.file);

  const matchedStyle = searchData(styles, CSV_CONFIG.style.search_cols, CSV_CONFIG.style.output_cols, query, 1)[0] || styles[0];
  const matchedColor = searchData(colors, CSV_CONFIG.color.search_cols, CSV_CONFIG.color.output_cols, query, 1)[0] || colors[0];
  const matchedTypo = searchData(typography, CSV_CONFIG.typography.search_cols, CSV_CONFIG.typography.output_cols, query, 1)[0] || typography[0];
  const matchedLanding = searchData(landings, CSV_CONFIG.landing.search_cols, CSV_CONFIG.landing.output_cols, query, 1)[0] || landings[0];
  const matchedMotion = searchData(motions, CSV_CONFIG.gsap.search_cols, CSV_CONFIG.gsap.output_cols, query, 1)[0] || motions[0];

  const md = `# Design System: ${projectName}
**Target Query:** ${query}
**Recommended Style:** ${matchedStyle?.['Style ID'] || 'Modern Minimal'} (${matchedStyle?.['Style Category'] || 'Clean'})

## 1. Visual Style & Philosophy
- **Style Concept:** ${matchedStyle?.['Style ID']}
- **Keywords:** ${matchedStyle?.Keywords || ''}
- **Best For:** ${matchedStyle?.['Best For'] || ''}
- **Effects & Animation:** ${matchedStyle?.['Effects & Animation'] || 'Subtle transitions, smooth hover states'}

## 2. Color Palette (Semantic Tokens)
- **Primary:** \`${matchedColor?.Primary || '#0F172A'}\` (Text: \`${matchedColor?.['On Primary'] || '#FFFFFF'}\`)
- **Secondary:** \`${matchedColor?.Secondary || '#64748B'}\`
- **Accent:** \`${matchedColor?.Accent || '#3B82F6'}\`
- **Background:** \`${matchedColor?.Background || '#FFFFFF'}\`
- **Foreground:** \`${matchedColor?.Foreground || '#020817'}\`
- **Card / Surface:** \`${matchedColor?.Card || '#F8FAFC'}\`
- **Border:** \`${matchedColor?.Border || '#E2E8F0'}\`
- **Destructive:** \`${matchedColor?.Destructive || '#EF4444'}\`

## 3. Typography
- **Heading Font:** ${matchedTypo?.['Heading Font'] || 'Inter'}
- **Body Font:** ${matchedTypo?.['Body Font'] || 'Inter'}
- **Font Mood:** ${matchedTypo?.['Mood/Style Keywords'] || 'Modern, clean, legible'}
- **Google Fonts:** [${matchedTypo?.['Font Pairing Name'] || 'Inter'}](${matchedTypo?.['Google Fonts URL'] || 'https://fonts.google.com'})

## 4. Layout & Landing Strategy
- **Hero / Page Pattern:** ${matchedLanding?.['Pattern Name'] || 'Hero Centered + Social Proof'}
- **Section Sequence:** ${matchedLanding?.['Section Order'] || 'Hero -> Value Prop -> Features -> Social Proof -> CTA -> Footer'}
- **CTA Placement:** ${matchedLanding?.['Primary CTA Placement'] || 'Navbar Right + Hero Center/Left'}

## 5. Motion & Interaction
- **Trigger & Easing:** ${matchedMotion?.Trigger || 'On scroll / On hover'} | ${matchedMotion?.Easing || 'power2.out'}
- **GSAP Snippet:**
\`\`\`javascript
${matchedMotion?.['GSAP Snippet'] || '// Standard micro-interaction\ngsap.from(".card", { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 });'}
\`\`\`

## 6. Implementation Checklist & Anti-Patterns
- [ ] Maintain 4.5:1 minimum contrast ratio for all text
- [ ] Minimum touch target 44x44px for interactive elements
- [ ] Avoid pure black #000000 on pure white without hierarchy
- [ ] Ensure smooth responsive breakpoints (Mobile: 375px+, Tablet: 768px+, Desktop: 1280px+)
`;

  if (options.persist && options.outputDir) {
    const slug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const outDir = path.resolve(options.outputDir, 'design-system', slug);
    fs.mkdirSync(outDir, { recursive: true });
    const masterPath = path.join(outDir, 'MASTER.md');
    if (!fs.existsSync(masterPath) || options.force) {
      fs.writeFileSync(masterPath, md, 'utf8');
      console.log(`[Persisted Design System to: ${masterPath}]`);
    } else {
      console.log(`[Notice: ${masterPath} already exists. Pass --force to overwrite.]`);
    }
  }

  return md;
}

// CLI Argument Parsing
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  console.log(`UI/UX Pro Max Search (Node.js runner)
Usage:
  node search.mjs "<query>" [--domain <domain>] [--stack <stack>] [--max-results 3]
  node search.mjs "<query>" --design-system [-p "Project Name"] [--persist] [--output-dir "<dir>"]

Domains: style, color, chart, landing, product, ux, typography, google-fonts, icons, gsap, react, web
Stacks: react, nextjs, vue, svelte, astro, swiftui, react-native, flutter, nuxtjs, nuxt-ui, html-tailwind, shadcn, jetpack-compose, threejs, angular, laravel
`);
  process.exit(0);
}

let query = '';
let domain = '';
let stack = '';
let maxResults = 3;
let isDesignSystem = false;
let projectName = 'UI Design System';
let persist = false;
let outputDir = '';
let force = false;
let jsonOutput = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--domain' || arg === '-d') {
    domain = args[++i];
  } else if (arg === '--stack' || arg === '-s') {
    stack = args[++i];
  } else if (arg === '--max-results' || arg === '-n') {
    maxResults = parseInt(args[++i], 10) || 3;
  } else if (arg === '--design-system') {
    isDesignSystem = true;
  } else if (arg === '-p' || arg === '--project') {
    projectName = args[++i];
  } else if (arg === '--persist') {
    persist = true;
  } else if (arg === '--output-dir') {
    outputDir = args[++i];
  } else if (arg === '--force') {
    force = true;
  } else if (arg === '--json') {
    jsonOutput = true;
  } else if (!arg.startsWith('-') && !query) {
    query = arg;
  }
}

if (isDesignSystem) {
  const ds = runDesignSystem(query, projectName, { persist, outputDir, force });
  if (jsonOutput) {
    console.log(JSON.stringify({ query, projectName, design_system: ds }, null, 2));
  } else {
    console.log(ds);
  }
  process.exit(0);
}

if (stack) {
  const stackCfg = STACK_CONFIG[stack];
  if (!stackCfg) {
    console.error(`Error: Unknown stack "${stack}". Available: ${Object.keys(STACK_CONFIG).join(', ')}`);
    process.exit(1);
  }
  const items = loadCSV(stackCfg.file);
  const searchCols = ["Category", "Topic", "Guideline", "Description", "Keywords", "Do", "Don't"];
  const outputCols = items.length > 0 ? Object.keys(items[0]) : searchCols;
  const results = searchData(items, searchCols, outputCols, query, maxResults);
  const resObj = {
    stack,
    query,
    file: stackCfg.file,
    count: results.length,
    results
  };
  console.log(jsonOutput ? JSON.stringify(resObj, null, 2) : formatOutput(resObj));
  process.exit(0);
}

let autoDetected = false;
if (!domain) {
  domain = autoDetectDomain(query);
  autoDetected = true;
}

const cfg = CSV_CONFIG[domain];
if (!cfg) {
  console.error(`Error: Unknown domain "${domain}". Available: ${Object.keys(CSV_CONFIG).join(', ')}`);
  process.exit(1);
}

const items = loadCSV(cfg.file);
const results = searchData(items, cfg.search_cols, cfg.output_cols, query, maxResults);
const resObj = {
  domain,
  auto_detected: autoDetected,
  query,
  file: cfg.file,
  count: results.length,
  results
};

if (jsonOutput) {
  console.log(JSON.stringify(resObj, null, 2));
} else {
  console.log(formatOutput(resObj));
}
