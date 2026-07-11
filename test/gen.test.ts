import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { genIosIcons, genMacIcon, genWinIcon } from '../src/icon.js';

const TMP = resolve('test/.temp-gen');
const SOURCE_SRC = resolve('test/fixtures/source.png');
const MISSING_SRC = resolve('test/fixtures/nonexistent.png');

beforeAll(async () => {
  mkdirSync(resolve('test/fixtures'), { recursive: true });
  if (!existsSync(SOURCE_SRC)) {
    await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 1 },
      },
    })
      .png()
      .toFile(SOURCE_SRC);
  }
});

afterAll(() => {
  rmSync(TMP, { recursive: true, force: true });
});

describe('genIosIcons', () => {
  const outDir = resolve(TMP, 'ios');

  it('generates all iOS png icon files (matching Python original order)', async () => {
    await genIosIcons(SOURCE_SRC, outDir);
    const files = [
      'Icon-20.png',
      'Icon-20@2x.png',
      'Icon-20@3x.png',
      'Icon-29.png',
      'Icon-29@2x.png',
      'Icon-29@3x.png',
      'Icon-40.png',
      'Icon-40@2x.png',
      'Icon-40@3x.png',
      'Icon-50.png',
      'Icon-50@2x.png',
      'Icon-57.png',
      'Icon-57@2x.png',
      'Icon-60@2x.png',
      'Icon-60@3x.png',
      'Icon-72.png',
      'Icon-72@2x.png',
      'Icon-76.png',
      'Icon-76@2x.png',
      'Icon-83.5@2x.png',
    ];
    for (const f of files) {
      const fp = resolve(outDir, f);
      expect(existsSync(fp), `missing ${f}`).toBe(true);
      expect(fp, `path mismatch: ${fp}`).toMatch(/Icon-[\d.]+@?\d*x?\.png$/);
      const meta = await sharp(fp).metadata();
      expect(meta.width).toBeGreaterThan(0);
      expect(meta.height).toBeGreaterThan(0);
    }
  });

  it('throws when source image does not exist', async () => {
    await expect(genIosIcons(MISSING_SRC, outDir)).rejects.toThrow(/Source image not found/);
  });
});

describe('genMacIcon', () => {
  const outFile = resolve(TMP, 'mac/Icon.icns');

  it('generates macOS icon as ICNS output', async () => {
    await genMacIcon(SOURCE_SRC, outFile);
    expect(outFile, `mac icns path mismatch: ${outFile}`).toMatch(/Icon\.icns$/);
    expect(existsSync(outFile)).toBe(true);
    const buffer = readFileSync(outFile);
    // Validate ICNS magic bytes
    expect(buffer.slice(0, 4).toString()).toBe('icns');
    const totalSize = buffer.readUInt32BE(4);
    expect(totalSize).toBeGreaterThan(512);
  });

  it('throws when source image does not exist', async () => {
    await expect(genMacIcon(MISSING_SRC, outFile)).rejects.toThrow(/Source image not found/);
  });
});

describe('genWinIcon', () => {
  const outFile = resolve(TMP, 'win/game.ico');

  it('generates Windows icon as ICO output', async () => {
    await genWinIcon(SOURCE_SRC, outFile);
    expect(existsSync(outFile)).toBe(true);
    const meta = await sharp(readFileSync(outFile).subarray(102)).metadata();
    // First PNG in the ICO should be 16x16
    expect(meta.width).toBe(16);
    expect(meta.height).toBe(16);
  });
  it('throws when source image does not exist', async () => {
    await expect(genWinIcon(MISSING_SRC, outFile)).rejects.toThrow(/Source image not found/);
  });
});
