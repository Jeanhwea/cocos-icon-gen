import { existsSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import type { IconInfo } from '@/types';
import { resizeImage } from '@/utils/image';

/** iOS icon filenames — order matches the Python original */
export const IOS_ICON_NAMES: string[] = [
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
];

/**
 * Parse icon pixel size from filename.
 * Matches the Python original's regex logic:
 *   Icon-83.5@2x.png → base=83.5 scale=2 → 167
 */
export function parseIconSize(filename: string): number {
  const match = filename.match(/Icon-([\d.]+)(?:@(\d)x)?\.png$/);
  if (!match) {
    throw new Error(`Cannot parse icon size from ${filename}`);
  }
  const baseSize = Number.parseFloat(match[1]);
  const scale = match[2] ? Number.parseInt(match[2], 10) : 1;
  return Math.round(baseSize * scale);
}

/** Pre-computed IconInfo list (for backward compat / introspection) */
export const IOS_ICONS: IconInfo[] = IOS_ICON_NAMES.map((name) => ({
  filename: name,
  size: parseIconSize(name),
}));

export const IOS_OUTPUT = 'proj.ios_mac/ios/Images.xcassets/AppIcon.appiconset';

export async function genIosIcons(sourcePath: string, outDir: string = IOS_OUTPUT): Promise<void> {
  if (!existsSync(sourcePath)) {
    throw new Error(`Source image not found: ${sourcePath}`);
  }
  mkdirSync(outDir, { recursive: true });
  for (const iconName of IOS_ICON_NAMES) {
    const size = parseIconSize(iconName);
    const outPath = `${outDir}/${iconName}`;
    mkdirSync(dirname(outPath), { recursive: true });
    await resizeImage(sourcePath, outPath, size);
    // eslint-disable-next-line no-console
    console.log(`Generated: ${iconName} (${size}x${size})`);
  }
}
