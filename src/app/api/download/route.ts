import { NextResponse } from 'next/server';

// Exact GitHub Release direct download CDN URL matching the published asset name
export const GITHUB_RELEASE_URL =
  'https://github.com/HackYourWorldBae/Bake-It-Your-Way-Prototype/releases/latest/download/Bake.It.Your.Way.apk';

export async function GET() {
  // Directly redirect to the GitHub Release CDN asset
  return NextResponse.redirect(GITHUB_RELEASE_URL, 302);
}
