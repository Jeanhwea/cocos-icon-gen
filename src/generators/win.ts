import { existsSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { createIcoFromPngs } from '@/utils/ico';

export const WIN_OUTPUT = 'proj.win32/res/game.ico';

export async function genWinIcon(sourcePath: string, outFile: string = WIN_OUTPUT): Promise<void> {
  if (!existsSync(sourcePath)) {
    throw new Error(`Source image not found: ${sourcePath}`);
  }
  mkdirSync(dirname(outFile), { recursive: true });
  await createIcoFromPngs(sourcePath, outFile);
  // eslint-disable-next-line no-console
  console.log(`Generated: ${outFile} (multi-resolution ICO)`);
}
