import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const images = [
  // Project images
  { src: 'images/projects/nathaliesbakeshop.png', dest: 'images/projects/nathaliesbakeshop.webp', quality: 82, width: 1200 },
  { src: 'images/projects/youroffshoreaccountant.png', dest: 'images/projects/youroffshoreaccountant.webp', quality: 82, width: 1200 },
  { src: 'images/projects/vertexshop.png', dest: 'images/projects/vertexshop.webp', quality: 82, width: 1200 },
  { src: 'images/projects/ergovision.png', dest: 'images/projects/ergovision.webp', quality: 82, width: 1200 },
  { src: 'images/projects/jobhunterai.png', dest: 'images/projects/jobhunterai.webp', quality: 82, width: 1200 },
  // Logo
  { src: 'logo.png', dest: 'logo.webp', quality: 85, width: 256 },
  // Profile photo
  { src: 'portfolio-image-darivs.jpg', dest: 'portfolio-image-darivs.webp', quality: 85, width: 600 },
];

for (const img of images) {
  const srcPath = join(publicDir, img.src);
  const destPath = join(publicDir, img.dest);

  if (!existsSync(srcPath)) {
    console.warn(`⚠️  Skipped (not found): ${img.src}`);
    continue;
  }

  const destDir = dirname(destPath);
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

  try {
    const info = await sharp(srcPath)
      .resize({ width: img.width, withoutEnlargement: true })
      .webp({ quality: img.quality, effort: 6 })
      .toFile(destPath);

    const srcSize = (existsSync(srcPath) ? (await import('fs')).statSync(srcPath).size : 0);
    const reduction = srcSize ? Math.round((1 - info.size / srcSize) * 100) : 0;
    console.log(`✅  ${img.src} → ${img.dest}  (${(info.size / 1024).toFixed(0)} KB, ${reduction}% smaller)`);
  } catch (err) {
    console.error(`❌  Failed: ${img.src}`, err.message);
  }
}

console.log('\nDone!');
