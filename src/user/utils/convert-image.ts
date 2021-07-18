import * as sharp from 'sharp';

export async function convertImage(file: Buffer) {
  return sharp(file).resize(200).jpeg({ mozjpeg: true }).toBuffer();
}
