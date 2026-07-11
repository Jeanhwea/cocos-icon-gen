import { existsSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { resizeImage } from '../utils/image.js';

export const WIN_OUTPUT = 'proj.win32/res/game.ico';

export async function genWinIcon(sourcePath: string, outFile: string = WIN_OUTPUT): Promise<void> {
  if (!existsSync(sourcePath)) {
    throw new Error(`Source image not found: ${sourcePath}`);
  }
  mkdirSync(dirname(outFile), { recursive: true });
  const size = 128;
  const pngOutFile = outFile.replace(/\.\w+$/, '.png');
  await resizeImage(sourcePath, pngOutFile, size);
  // eslint-disable-next-line no-console
  console.log(`Generated: ${outFile} (${size}x${size})`);
}
