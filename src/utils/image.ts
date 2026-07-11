import { readFileSync } from 'node:fs';
import sharp from 'sharp';

/**
 * Resize and write an image to a PNG file at the given size.
 */
export async function resizeImage(
  sourcePath: string,
  outPath: string,
  size: number,
): Promise<void> {
  const png = readFileSync(sourcePath);
  await sharp(png)
    .ensureAlpha()
    .resize(size, size, { fit: 'fill', kernel: 'lanczos3' })
    .png()
    .toFile(outPath);
}
