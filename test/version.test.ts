import { describe, expect, it } from 'vitest';
import { APP_NAME, APP_VERSION, APP_DESCRIPTION } from '../src/version.js';

describe('version', () => {
  it('has a name', () => {
    expect(APP_NAME).toBe('cocos-icon-gen');
  });

  it('has a version string', () => {
    expect(APP_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('has a description', () => {
    expect(APP_DESCRIPTION).toBeTruthy();
    expect(typeof APP_DESCRIPTION).toBe('string');
  });
});
