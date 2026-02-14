import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(import.meta.dirname, '..');
const uploadsDir = path.join(projectRoot, 'public', 'uploads');

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function generateWebpVariants({ inputFile, variants }) {
  if (!(await fileExists(inputFile))) {
    throw new Error(`Missing input image: ${inputFile}`);
  }

  for (const variant of variants) {
    const { width, outputFile, quality } = variant;

    await sharp(inputFile)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputFile);
  }
}

async function main() {
  await ensureDir(uploadsDir);

  const logoInput = path.join(uploadsDir, 'logo.webp');
  const heroInput = path.join(uploadsDir, 'hero.webp');

  await generateWebpVariants({
    inputFile: logoInput,
    variants: [
      { width: 36, outputFile: path.join(uploadsDir, 'logo-36.webp'), quality: 85 },
      { width: 48, outputFile: path.join(uploadsDir, 'logo-48.webp'), quality: 85 },
      { width: 64, outputFile: path.join(uploadsDir, 'logo-64.webp'), quality: 85 },
      { width: 96, outputFile: path.join(uploadsDir, 'logo-96.webp'), quality: 85 },
      { width: 128, outputFile: path.join(uploadsDir, 'logo-128.webp'), quality: 85 },
    ],
  });

  await generateWebpVariants({
    inputFile: heroInput,
    variants: [
      { width: 480, outputFile: path.join(uploadsDir, 'hero-480.webp'), quality: 80 },
      { width: 672, outputFile: path.join(uploadsDir, 'hero-672.webp'), quality: 80 },
    ],
  });

  // eslint-disable-next-line no-console
  console.log('Generated responsive images in public/uploads');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
