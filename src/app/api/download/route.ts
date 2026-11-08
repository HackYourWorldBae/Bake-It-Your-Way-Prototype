import { NextResponse } from 'next/server';

export const GITHUB_RELEASE_URL =
  'https://github.com/HackYourWorldBae/Bake-It-Your-Way-Prototype/releases/latest/download/Bake.It.Your.Way.apk';

export async function GET() {
  // Support Cloudflare R2 URL via environment variable or default to GitHub Release CDN
  const targetUrl = process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || GITHUB_RELEASE_URL;
  return NextResponse.redirect(targetUrl, 302);
}
