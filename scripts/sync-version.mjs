#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
const version = pkg.version;

const src = resolve(ROOT, 'src', 'version.ts');
const existing = readFileSync(src, 'utf8');
const head = `export const APP_NAME = '${pkg.name}';`;
const line = `export const APP_VERSION = '${version}';`;
const desc = `export const APP_DESCRIPTION = 'Generate app icons for Cocos projects';`;
const content = `${head}\n${line}\n${desc}\n`;

if (existing !== content) {
  writeFileSync(src, content);
  console.log(`synced version.ts → ${version}`);
}
