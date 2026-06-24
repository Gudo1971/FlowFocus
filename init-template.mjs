#!/usr/bin/env node

/**
 * Template Initialization Script
 * Run after cloning this template for a new project
 */

import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function toTitleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function updateJson(filePath, updater) {
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  updater(json);
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
}

async function init() {
  console.log("\nMonorepo template initialization\n");

  const projectNameRaw = await question(
    "Project name (lowercase, no spaces): ",
  );
  const projectDesc = await question("Project description: ");
  const author = await question("Author name: ");

  const projectName = projectNameRaw.trim();
  if (!/^[a-z0-9-]+$/.test(projectName)) {
    console.error(
      "\nInvalid project name. Use lowercase letters, numbers, and dashes only.\n",
    );
    rl.close();
    process.exit(1);
  }

  const projectTitle = toTitleCase(projectName);

  console.log("\nUpdating files...\n");

  const rootPkgPath = path.join(process.cwd(), "package.json");
  updateJson(rootPkgPath, (pkg) => {
    pkg.name = projectName;
  });
  console.log(`Updated root package.json: name="${projectName}"`);

  const frontendPkgPath = path.join(process.cwd(), "frontend", "package.json");
  updateJson(frontendPkgPath, (pkg) => {
    pkg.description = projectDesc;
    pkg.author = author;
  });
  console.log("Updated frontend/package.json metadata");

  const htmlPath = path.join(process.cwd(), "frontend", "index.html");
  let html = fs.readFileSync(htmlPath, "utf-8");
  html = html.replace(/<title>.*?<\/title>/, `<title>${projectTitle}</title>`);
  fs.writeFileSync(htmlPath, html);
  console.log(`Updated frontend/index.html: <title>${projectTitle}</title>`);

  const headerPath = path.join(
    process.cwd(),
    "frontend",
    "src",
    "components",
    "Header.tsx",
  );
  let header = fs.readFileSync(headerPath, "utf-8");
  header = header.replace(/FocusFlow/g, projectTitle);
  fs.writeFileSync(headerPath, header);
  console.log("Updated frontend branding in Header.tsx");

  const readmePath = path.join(process.cwd(), "README.md");
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, "utf-8");
    readme = readme.replace(/^#\s+.*$/m, `# ${projectTitle}`);
    readme = readme.replace(/FocusFlow/g, projectTitle);
    fs.writeFileSync(readmePath, readme);
    console.log("Updated README.md branding");
  }

  console.log("\nTemplate initialized.\n");
  console.log("Next steps:");
  console.log("  1. npm install");
  console.log("  2. Update frontend/src/theme/index.ts with your brand colors");
  console.log("  3. npm run dev");
  console.log("\nSee TEMPLATE.md for detailed customization guidance.\n");

  rl.close();
}

init().catch(console.error);
