import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const input = 'public/assets/logo/veterinaria-caobos-logo.jpg';
const output = 'public/assets/logo/veterinaria-caobos-logo.png';

const image = sharp(input).ensureAlpha();
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const pixels = new Uint8Array(data);

const isNearBlack = (i) => {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  return r < 28 && g < 28 && b < 28;
};

const idx = (x, y) => (y * width + x) * channels;
const seen = new Uint8Array(width * height);
const queue = [];

const push = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const p = y * width + x;
  if (seen[p]) return;
  const i = idx(x, y);
  if (!isNearBlack(i)) return;
  seen[p] = 1;
  queue.push(p);
};

push(0, 0);
push(width - 1, 0);
push(0, height - 1);
push(width - 1, height - 1);
push(Math.floor(width / 2), 0);
push(Math.floor(width / 2), height - 1);
push(0, Math.floor(height / 2));
push(width - 1, Math.floor(height / 2));

for (let n = 0; n < queue.length; n += 1) {
  const p = queue[n];
  const x = p % width;
  const y = Math.floor(p / width);
  const i = idx(x, y);
  pixels[i + 3] = 0;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

await sharp(Buffer.from(pixels), {
  raw: { width, height, channels },
})
  .png()
  .toFile(output);

await writeFile(
  'public/favicon.png',
  await sharp(output).resize(64, 64).png().toBuffer()
);

console.log(`OK ${output} ${width}x${height}`);
