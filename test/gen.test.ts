import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { genIosIcons, genMacIcon, genWinIcon } from '../src/icon.js';

const TMP = resolve('test/.temp-gen');
const SOURCE_SRC = resolve('test/fixtures/source.png');

beforeAll(async () => {
  mkdirSync(resolve('test/fixtures'), { recursive: true });
  if (!existsSync(SOURCE_SRC)) {
    await sharp({
      create: {
        width: 256,
        height: 256,
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

  it('generates all iOS png icon files', async () => {
    await genIosIcons(SOURCE_SRC, outDir);
    const files = [
      'Icon-20.png', 'Icon-20@2x.png', 'Icon-20@3x.png',
      'Icon-29.png', 'Icon-29@2x.png', 'Icon-29@3x.png',
      'Icon-40.png', 'Icon-40@2x.png', 'Icon-40@3x.png',
      'Icon-50.png', 'Icon-50@2x.png',
      'Icon-57.png', 'Icon-57@2x.png',
      'Icon-60@2x.png', 'Icon-60@3x.png',
      'Icon-72.png', 'Icon-72@2x.png',
      'Icon-76.png', 'Icon-76@2x.png',
      'Icon-83.5@2x.png',
    ];
    for (const f of files) {
      const fp = resolve(outDir, f);
      expect(existsSync(fp), `missing ${f}`).toBe(true);
      const meta = await sharp(fp).metadata();
      expect(meta.width).toBeGreaterThan(0);
      expect(meta.height).toBeGreaterThan(0);
    }
  });
});

describe('genMacIcon', () => {
  const outFile = resolve(TMP, 'mac/Icon.icns');

  it('generates macOS ICNS file', async () => {
    await genMacIcon(SOURCE_SRC, outFile);
    expect(existsSync(outFile)).toBe(true);
    const meta = await sharp(outFile).metadata();
    expect(meta.width).toBe(512);
    expect(meta.height).toBe(512);
  });
});

describe('genWinIcon', () => {
  const outFile = resolve(TMP, 'win/game.ico');

  it('generates Windows ICO file', async () => {
    await genWinIcon(SOURCE_SRC, outFile);
    expect(existsSync(outFile)).toBe(true);
    const meta = await sharp(outFile).metadata();
    expect(meta.width).toBe(128);
    expect(meta.height).toBe(128);
  });
});
