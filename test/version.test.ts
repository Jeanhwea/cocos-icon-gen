import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { APP_NAME, APP_VERSION, APP_DESCRIPTION } from '../src/version.js';

const pkg = JSON.parse(
  readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'), 'utf8'),
);

describe('version', () => {
  it('has a name', () => {
    expect(APP_NAME).toBe('@jeansoft/cocos-icon-gen');
  });

  it('matches package.json name', () => {
    expect(APP_NAME).toBe(pkg.name);
  });

  it('has a version string', () => {
    expect(APP_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('matches package.json version', () => {
    expect(APP_VERSION).toBe(pkg.version);
  });

  it('has a description', () => {
    expect(APP_DESCRIPTION).toBeTruthy();
    expect(typeof APP_DESCRIPTION).toBe('string');
  });
});
