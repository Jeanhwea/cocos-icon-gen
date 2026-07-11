/**
 * Generate a real .ico file from a source PNG using sharp.
 *
 * Creates a multi-resolution ICO with sizes 16, 32, 48, 64, 128, 256.
 */
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

/** ICO header + directory + PNG data builder */
async function createIco(pngBuffers: Buffer[]): Promise<Buffer> {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const header = Buffer.alloc(headerSize + numImages * dirEntrySize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type (1 = .ico)
  header.writeUInt16LE(numImages, 4); // count

  let offset = headerSize + numImages * dirEntrySize;
  for (let i = 0; i < numImages; i++) {
    const png = pngBuffers[i];
    const meta = await sharp(png).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    const byteSize = png.length;

    const entryOffset = headerSize + i * dirEntrySize;
    header.writeUInt8(w >= 256 ? 0 : w, entryOffset); // width (0 = 256)
    header.writeUInt8(h >= 256 ? 0 : h, entryOffset + 1); // height (0 = 256)
    header.writeUInt8(0, entryOffset + 2); // color palette
    header.writeUInt8(0, entryOffset + 3); // reserved
    header.writeUInt16LE(1, entryOffset + 4); // color planes
    header.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    header.writeUInt32LE(byteSize, entryOffset + 8); // size
    header.writeUInt32LE(offset, entryOffset + 12); // offset in file
    offset += byteSize;
  }

  return Buffer.concat([header, ...pngBuffers]);
}

export async function createIcoFromPngs(sourcePath: string, outFile: string): Promise<void> {
  if (!existsSync(sourcePath)) {
    throw new Error(`Source image not found: ${sourcePath}`);
  }

  const sizes = [16, 32, 48, 64, 128, 256];
  const pngBuffers: Buffer[] = [];

  for (const size of sizes) {
    const buf = await sharp(sourcePath)
      .resize(size, size, { fit: 'cover', withoutEnlargement: false })
      .png()
      .toBuffer();
    pngBuffers.push(buf);
  }

  const icoData = await createIco(pngBuffers);
  await writeFile(outFile, icoData);
}
