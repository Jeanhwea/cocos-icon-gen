import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ICON_SIZES = [
  { size: 16, scale: 1 },
  { size: 16, scale: 2 },
  { size: 32, scale: 1 },
  { size: 32, scale: 2 },
  { size: 64, scale: 1 },
  { size: 64, scale: 2 },
  { size: 128, scale: 1 },
  { size: 256, scale: 1 },
  { size: 256, scale: 2 },
  { size: 512, scale: 1 },
  { size: 512, scale: 2 },
  { size: 1024, scale: 1 },
];

const ICNS_MAGIC = Buffer.from('icns', 'ascii');
const ICNS_HEADER_SIZE = 8; // magic (4) + size (4)

interface IcnsIconEntry {
  type: string;
  size: number;
  data: Buffer;
}

function createIcnsBuffer(icons: IcnsIconEntry[]): Buffer {
  const iconDataSize = icons.reduce((sum, icon) => sum + 8 + icon.data.length, 0);
  const totalSize = ICNS_HEADER_SIZE + iconDataSize;

  const buf = Buffer.alloc(totalSize);
  let offset = 0;

  // Write header
  ICNS_MAGIC.copy(buf, offset);
  offset += 4;
  buf.writeUInt32BE(totalSize, offset);
  offset += 4;

  // Write icon entries
  for (const icon of icons) {
    const typeCode = icon.type.padEnd(4).substring(0, 4);
    buf.write(typeCode, offset, 'ascii');
    offset += 4;
    const entrySize = 8 + icon.data.length;
    buf.writeUInt32BE(entrySize, offset);
    offset += 4;
    icon.data.copy(buf, offset);
    offset += icon.data.length;
  }

  return buf;
}

function getIconType(size: number, scale: number): string {
  if (size === 16 && scale === 1) return 'ic07';
  if (size === 16 && scale === 2) return 'ic08';
  if (size === 32 && scale === 1) return 'ic05';
  if (size === 32 && scale === 2) return 'ic09';
  if (size === 64 && scale === 1) return 'ic11';
  if (size === 64 && scale === 2) return 'ic14';
  if (size === 128 && scale === 1) return 'ic04';
  if (size === 256 && scale === 1) return 'ic06';
  if (size === 256 && scale === 2) return 'ic13';
  if (size === 512 && scale === 1) return 'ic10';
  if (size === 512 && scale === 2) return 'ic12';
  if (size === 1024 && scale === 1) return 'ic16';
  return 'ic07'; // fallback
}

export async function createIcnsFromPng(imagePath: string, outputPath: string): Promise<void> {
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Failed to read source image dimensions');
  }

  if (metadata.width < 1024 || metadata.height < 1024) {
    throw new Error('Source image must be at least 1024x1024 pixels for macOS icons');
  }

  const icons: IcnsIconEntry[] = [];

  for (const icon of ICON_SIZES) {
    const resizedBuffer = await image.clone().resize(icon.size, icon.size).png().toBuffer();
    const type = getIconType(icon.size, icon.scale);

    icons.push({
      type,
      size: icon.size,
      data: resizedBuffer,
    });
  }

  const icnsBuffer = createIcnsBuffer(icons);

  // Extract directory from outputPath
  const dir = path.dirname(outputPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, icnsBuffer);
}

export async function genMacIcons(sourceImage: string, outputDir: string): Promise<void> {
  const resolvedDir = path.resolve(outputDir);
  const icnsPath = path.join(resolvedDir, 'Icon.icns');

  await createIcnsFromPng(sourceImage, icnsPath);

  console.log(`Generated: ${icnsPath} (${512}x${512})`);
}
