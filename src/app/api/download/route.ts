import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GitHub Release direct download URL (Fast, worldwide CDN, permanent)
export const GITHUB_RELEASE_URL =
  'https://github.com/HackYourWorldBae/Bake-It-Your-Way-Prototype/releases/latest/download/bake-it-your-way.apk';

export async function GET() {
  const localFilePath = path.join(process.cwd(), 'public', 'downloads', 'bake-it-your-way.apk');

  // 1. If local file exists (e.g. running on localhost or VPS with public folder), stream directly
  if (fs.existsSync(localFilePath)) {
    try {
      const stat = fs.statSync(localFilePath);
      if (stat.size > 0) {
        const fileStream = fs.createReadStream(localFilePath);

        const stream = new ReadableStream({
          start(controller) {
            fileStream.on('data', (chunk) => controller.enqueue(chunk));
            fileStream.on('end', () => controller.close());
            fileStream.on('error', (err) => controller.error(err));
          },
        });

        return new NextResponse(stream, {
          status: 200,
          headers: {
            'Content-Type': 'application/vnd.android.package-archive',
            'Content-Disposition': 'attachment; filename="bake-it-your-way.apk"',
            'Content-Length': stat.size.toString(),
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }
    } catch {
      // Fall through to GitHub redirect if read error occurs
    }
  }

  // 2. On Vercel, Netlify, or serverless deployments (where 50MB binaries are ignored by git),
  // automatically redirect to the official GitHub Release CDN
  return NextResponse.redirect(GITHUB_RELEASE_URL, 302);
}
