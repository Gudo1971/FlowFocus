#!/usr/bin/env node

/**
 * Template Initialization Script
 * Run after cloning this template for a new project
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function init() {
  console.log('\n🚀 Chakra UI v3 Template Initialization\n');

  const projectName = await question('Project name (lowercase, no spaces): ');
  const projectDesc = await question('Project description: ');
  const author = await question('Author name: ');

  console.log('\n📝 Updating files...\n');

  // Update package.json
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = projectName;
  pkg.description = projectDesc;
  pkg.author = author;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✅ package.json: name="${projectName}"`);

  // Update index.html
  const htmlPath = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');
  html = html.replace(/<title>.*?<\/title>/, `<title>${projectName}</title>`);
  fs.writeFileSync(htmlPath, html);
  console.log(`✅ index.html: <title>${projectName}</title>`);

  // Update Header.tsx
  const headerPath = path.join(process.cwd(), 'src', 'components', 'Header.tsx');
  let header = fs.readFileSync(headerPath, 'utf-8');
  header = header.replace(/FocusFlow/g, projectName);
  fs.writeFileSync(headerPath, header);
  console.log(`✅ Header.tsx: Updated branding`);

  console.log('\n✨ Template initialized!\n');
  console.log('📋 Next steps:');
  console.log('  1. npm install');
  console.log('  2. Update src/theme/index.ts with your brand colors');
  console.log('  3. npm run dev');
  console.log('\n📚 See TEMPLATE.md for detailed customization guide\n');

  rl.close();
}

init().catch(console.error);
