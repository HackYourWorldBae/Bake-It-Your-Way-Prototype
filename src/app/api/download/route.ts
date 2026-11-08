import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'downloads', 'bake-it-your-way.apk');

  if (!fs.existsSync(filePath)) {
    return new NextResponse('APK file not found', { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileStream = fs.createReadStream(filePath);

  // Convert Node ReadStream to Web ReadableStream
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

