#!/usr/bin/env node
// Builds the static pages in src/pages/ into the repo root by inlining
// <!--#include file="name.html" KEY="value" ... --> directives against
// the partials in src/partials/. Run: node build.js

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const PARTIALS_DIR = path.join(ROOT, 'src', 'partials');
const MAX_INCLUDE_DEPTH = 10;

const INCLUDE_RE = /<!--#include\s+file="([^"]+)"((?:\s+[A-Z_]+="[^"]*")*)\s*-->/g;
const PARAM_RE = /([A-Z_]+)="([^"]*)"/g;

function parseParams(paramString) {
  const params = {};
  let match;
  while ((match = PARAM_RE.exec(paramString))) {
    params[match[1]] = match[2];
  }
  return params;
}

function applyParams(content, params) {
  return Object.keys(params).reduce(
    (acc, key) => acc.split(`{{${key}}}`).join(params[key]),
    content
  );
}

function resolveIncludes(content, depth = 0) {
  if (depth > MAX_INCLUDE_DEPTH) {
    throw new Error('Include depth exceeded — check for a circular include');
  }
  let sawInclude = false;
  const resolved = content.replace(INCLUDE_RE, (_match, file, paramString) => {
    sawInclude = true;
    const partialPath = path.join(PARTIALS_DIR, file);
    const raw = fs.readFileSync(partialPath, 'utf8');
    return applyParams(raw, parseParams(paramString));
  });
  return sawInclude ? resolveIncludes(resolved, depth + 1) : resolved;
}

function build() {
  const pageFiles = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.html'));
  pageFiles.forEach((file) => {
    const template = fs.readFileSync(path.join(PAGES_DIR, file), 'utf8');
    const banner = `<!-- GENERATED FILE — do not edit directly.\n     Source: src/pages/${file} (+ src/partials/). Run \`node build.js\` after editing. -->\n`;
    const output = banner + resolveIncludes(template);
    fs.writeFileSync(path.join(ROOT, file), output);
    console.log(`built ${file}`);
  });
}

build();
