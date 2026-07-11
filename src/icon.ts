import { readFileSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import sharp from 'sharp';
import type { IconInfo } from './types.js';

/** iOS icon filenames and their nominal sizes */
export const IOS_ICONS: IconInfo[] = [
  { filename: 'Icon-20.png', size: 20 },
  { filename: 'Icon-20@2x.png', size: 40 },
  { filename: 'Icon-20@3x.png', size: 60 },
  { filename: 'Icon-29.png', size: 29 },
  { filename: 'Icon-29@2x.png', size: 58 },
  { filename: 'Icon-29@3x.png', size: 87 },
  { filename: 'Icon-40.png', size: 40 },
  { filename: 'Icon-40@2x.png', size: 80 },
  { filename: 'Icon-40@3x.png', size: 120 },
  { filename: 'Icon-50.png', size: 50 },
  { filename: 'Icon-50@2x.png', size: 100 },
  { filename: 'Icon-57.png', size: 57 },
  { filename: 'Icon-57@2x.png', size: 114 },
  { filename: 'Icon-60@2x.png', size: 120 },
  { filename: 'Icon-60@3x.png', size: 180 },
  { filename: 'Icon-72.png', size: 72 },
  { filename: 'Icon-72@2x.png', size: 144 },
  { filename: 'Icon-76.png', size: 76 },
  { filename: 'Icon-76@2x.png', size: 152 },
  { filename: 'Icon-83.5@2x.png', size: 167 },
];

export const IOS_OUTPUT = 'proj.ios_mac/ios/Images.xcassets/AppIcon.appiconset';
export const MAC_OUTPUT = 'proj.ios_mac/mac/Icon.icns';
export const WIN_OUTPUT = 'proj.win32/res/game.ico';

export async function genIosIcons(sourcePath: string, outDir: string = IOS_OUTPUT): Promise<void> {
  const png = readFileSync(sourcePath);
  mkdirSync(outDir, { recursive: true });
  for (const icon of IOS_ICONS) {
    const outPath = `${outDir}/${icon.filename}`;
    mkdirSync(dirname(outPath), { recursive: true });
    await sharp(png)
      .resize(icon.size, icon.size, { fit: 'fill' })
      .png()
      .toFile(outPath);
    // eslint-disable-next-line no-console
    console.log(`Generated: ${icon.filename} (${icon.size}x${icon.size})`);
  }
}

export async function genMacIcon(sourcePath: string, outFile: string = MAC_OUTPUT): Promise<void> {
  const png = readFileSync(sourcePath);
  mkdirSync(dirname(outFile), { recursive: true });
  const size = 512;
  // sharp does not support .icns output natively, output as .png
  const pngOutFile = outFile.replace(/\.\w+$/, '.png');
  await sharp(png).resize(size, size, { fit: 'fill' }).png().toFile(pngOutFile);
  // eslint-disable-next-line no-console
  console.log(`Generated: ${pngOutFile} (${size}x${size})`);
}

export async function genWinIcon(sourcePath: string, outFile: string = WIN_OUTPUT): Promise<void> {
  const png = readFileSync(sourcePath);
  mkdirSync(dirname(outFile), { recursive: true });
  const size = 128;
  // sharp does not support .ico output natively, output as .png
  const pngOutFile = outFile.replace(/\.\w+$/, '.png');
  await sharp(png).resize(size, size, { fit: 'fill' }).png().toFile(pngOutFile);
  // eslint-disable-next-line no-console
  console.log(`Generated: ${pngOutFile} (${size}x${size})`);
}


