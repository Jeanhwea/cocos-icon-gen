import { describe, expect, it } from 'vitest';
import { IOS_ICONS } from '../src/icon.js';

describe('IOS_ICONS', () => {
  it('has 20 entries', () => {
    expect(IOS_ICONS).toHaveLength(20);
  });

  it('every icon has a filename and size', () => {
    for (const icon of IOS_ICONS) {
      expect(icon.filename).toBeTruthy();
      expect(icon.size).toBeGreaterThan(0);
    }
  });

  it('filenames follow the Icon-* pattern', () => {
    for (const icon of IOS_ICONS) {
      expect(icon.filename).toMatch(/^Icon-/);
      expect(icon.filename).toMatch(/\.png$/);
    }
  });

  it('includes common icon sizes', () => {
    const sizes = IOS_ICONS.map((i) => i.size);
    expect(sizes).toContain(29);
    expect(sizes).toContain(40);
    expect(sizes).toContain(57);
    expect(sizes).toContain(60);
    expect(sizes).toContain(76);
    expect(sizes).toContain(167);
    expect(sizes).toContain(180);
  });

  it('no duplicate filenames', () => {
    const filenames = IOS_ICONS.map((i) => i.filename);
    expect(new Set(filenames).size).toBe(filenames.length);
  });

  it('generates correct resolved sizes from @2x/@3x', () => {
    const icon20 = IOS_ICONS.find((i) => i.filename === 'Icon-20.png');
    const icon20x2 = IOS_ICONS.find((i) => i.filename === 'Icon-20@2x.png');
    const icon20x3 = IOS_ICONS.find((i) => i.filename === 'Icon-20@3x.png');
    expect(icon20?.size).toBe(20);
    expect(icon20x2?.size).toBe(40);
    expect(icon20x3?.size).toBe(60);
  });

  it('handles decimal sizes like Icon-83.5@2x', () => {
    const icon = IOS_ICONS.find((i) => i.filename === 'Icon-83.5@2x.png');
    expect(icon?.size).toBe(167);
  });
});
