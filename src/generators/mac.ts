import { existsSync } from 'node:fs';
import { createIcnsFromPng } from '../utils/icns.js';
import { dirname } from 'node:path';
import fs from 'node:fs';

export const MAC_OUTPUT = 'proj.ios_mac/mac/Icon.icns';

export async function genMacIcon(sourcePath: string, outFile: string = MAC_OUTPUT): Promise<void> {
  if (!existsSync(sourcePath)) {
    throw new Error(`Source image not found: ${sourcePath}`);
  }
  fs.mkdirSync(dirname(outFile), { recursive: true });
  await createIcnsFromPng(sourcePath, outFile);
  // eslint-disable-next-line no-console
  console.log(`Generated: ${outFile} (512x512)`);
}
