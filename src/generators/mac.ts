import { existsSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { resizeImage } from '../utils/image.js';

export const MAC_OUTPUT = 'proj.ios_mac/mac/Icon.icns';

export async function genMacIcon(sourcePath: string, outFile: string = MAC_OUTPUT): Promise<void> {
  if (!existsSync(sourcePath)) {
    throw new Error(`Source image not found: ${sourcePath}`);
  }
  mkdirSync(dirname(outFile), { recursive: true });
  const size = 512;
  const pngOutFile = outFile.replace(/\.\w+$/, '.png');
  await resizeImage(sourcePath, pngOutFile, size);
  // eslint-disable-next-line no-console
  console.log(`Generated: ${outFile} (${size}x${size})`);
}
