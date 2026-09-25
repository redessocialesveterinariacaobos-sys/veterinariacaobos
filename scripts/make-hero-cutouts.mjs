import sharp from 'sharp';

const jobs = [
  {
    input: 'public/assets/images/hero-cutout.jpg',
    output: 'public/assets/images/hero-dog-cutout.png',
    isBackground: (r, g, b) => {
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return max > 210 && max - min < 28;
    },
  },
  {
    input: 'public/assets/images/hero-cat.jpg',
    output: 'public/assets/images/hero-cat-cutout.png',
    isBackground: (r, g, b) => {
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max - min;
      const bright = (r + g + b) / 3;
      return bright > 168 && sat < 38;
    },
  },
];

async function cutout({ input, output, isBackground }) {
  const image = sharp(input).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);
  const seen = new Uint8Array(width * height);
  const queue = [];
  const idx = (x, y) => (y * width + x) * channels;

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (seen[p]) return;
    const i = idx(x, y);
    if (!isBackground(pixels[i], pixels[i + 1], pixels[i + 2])) return;
    seen[p] = 1;
    queue.push(p);
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  for (let n = 0; n < queue.length; n += 1) {
    const p = queue[n];
    const x = p % width;
    const y = Math.floor(p / width);
    pixels[idx(x, y) + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
    .png()
    .toFile(output);

  console.log(`OK ${output} ${width}x${height}`);
}

for (const job of jobs) {
  await cutout(job);
}
