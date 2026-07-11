import { describe, expect, it } from 'vitest';
import { IOS_ICONS, IOS_ICON_NAMES, parseIconSize } from '../src/icon.js';

describe('parseIconSize', () => {
  it('parses simple icon names (no @scale)', () => {
    expect(parseIconSize('Icon-29.png')).toBe(29);
    expect(parseIconSize('Icon-20.png')).toBe(20);
    expect(parseIconSize('Icon-57.png')).toBe(57);
    expect(parseIconSize('Icon-76.png')).toBe(76);
  });

  it('parses @2x icon names', () => {
    expect(parseIconSize('Icon-29@2x.png')).toBe(58);
    expect(parseIconSize('Icon-20@2x.png')).toBe(40);
    expect(parseIconSize('Icon-40@2x.png')).toBe(80);
    expect(parseIconSize('Icon-60@2x.png')).toBe(120);
  });

  it('parses @3x icon names', () => {
    expect(parseIconSize('Icon-29@3x.png')).toBe(87);
    expect(parseIconSize('Icon-40@3x.png')).toBe(120);
    expect(parseIconSize('Icon-60@3x.png')).toBe(180);
  });

  it('handles decimal sizes like Icon-83.5@2x', () => {
    expect(parseIconSize('Icon-83.5@2x.png')).toBe(167);
  });

  it('throws on unrecognized filenames', () => {
    expect(() => parseIconSize('foo.png')).toThrow();
    expect(() => parseIconSize('Icon-.png')).toThrow();
    expect(() => parseIconSize('Icon-abc.png')).toThrow();
  });
});

describe('IOS_ICON_NAMES', () => {
  it('has 20 entries matching the Python original', () => {
    expect(IOS_ICON_NAMES).toHaveLength(20);
    expect(IOS_ICON_NAMES).toEqual([
      'Icon-29.png',
      'Icon-76@2x.png',
      'Icon-40@2x.png',
      'Icon-40@3x.png',
      'Icon-50@2x.png',
      'Icon-83.5@2x.png',
      'Icon-60@3x.png',
      'Icon-29@2x.png',
      'Icon-76.png',
      'Icon-72.png',
      'Icon-72@2x.png',
      'Icon-29@3x.png',
      'Icon-60@2x.png',
      'Icon-20@3x.png',
      'Icon-57.png',
      'Icon-40.png',
      'Icon-50.png',
      'Icon-20@2x.png',
      'Icon-20.png',
      'Icon-57@2x.png',
    ]);
  });
});

describe('IOS_ICONS', () => {
  it('has 20 entries derived from IOS_ICON_NAMES', () => {
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

  it('names match IOS_ICON_NAMES', () => {
    const names = IOS_ICONS.map((i) => i.filename);
    expect(names).toEqual(IOS_ICON_NAMES);
  });

  it('sizes match parseIconSize output', () => {
    for (const icon of IOS_ICONS) {
      expect(icon.size).toBe(parseIconSize(icon.filename));
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
