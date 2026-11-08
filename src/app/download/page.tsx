'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import {
  Download,
  Smartphone,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  QrCode,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

const DEFAULT_GITHUB_URL =
  'https://github.com/HackYourWorldBae/Bake-It-Your-Way-Prototype/releases/latest/download/Bake.It.Your.Way.apk';

const GITHUB_RELEASE_URL =
  process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || DEFAULT_GITHUB_URL;

const GITHUB_RELEASES_PAGE =
  'https://github.com/HackYourWorldBae/Bake-It-Your-Way-Prototype/releases';

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [qrMode, setQrMode] = useState<'apk' | 'page'>('apk');

  // Exact SHA-256 digest of the uploaded Bake.It.Your.Way.apk release
  const sha256Hash = 'EE7E1893B64611848EB22AF4A562FF16579DF4688AB6B4EE629DD47469A6CF70';

  // Generate valid camera-scannable QR code
  useEffect(() => {
    const targetUrl =
      qrMode === 'apk'
        ? GITHUB_RELEASE_URL
        : typeof window !== 'undefined'
          ? window.location.href
          : GITHUB_RELEASE_URL;

    QRCode.toDataURL(targetUrl, {
      width: 360,
      margin: 2,
      color: {
        dark: '#2C221E',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Failed to generate camera-scannable QR code', err));
  }, [qrMode]);

  const copyHash = () => {
    navigator.clipboard.writeText(sha256Hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: '01',
      title: 'Download APK',
      desc: 'Tap the direct download button to save Bake.It.Your.Way.apk (48.2 MB) to your Android device.',
    },
    {
      num: '02',
      title: 'Allow Installation',
      desc: 'When prompted by Android or Chrome, select "Settings" and toggle "Allow from this source".',
    },
    {
      num: '03',
      title: 'Launch Studio',
      desc: 'Open the Bake It Your Way app, pick your foundation flour, and start designing your bespoke cake.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-roast flex flex-col bg-warm-pattern">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        {/* Breadcrumb & Main Header */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-card border border-cream-border text-xs font-semibold text-terracotta">
            <Sparkles className="w-3.5 h-3.5 text-honey" />
            <span>Official Android Release v1.0.0</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-roast tracking-tight leading-tight">
            Carry the Cake Studio <br />
            <span className="text-terracotta italic font-normal">in Your Pocket.</span>
          </h1>

          <p className="text-sm sm:text-base text-roast/70 leading-relaxed">
            Personalize foundation flours, dietary sweetness, and artisanal frosting finishes on the go with real-time live preview and oven tracking.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={GITHUB_RELEASE_URL}
              download="Bake.It.Your.Way.apk"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm shadow-md shadow-terracotta/20 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Direct APK (48.2 MB)</span>
            </a>

            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-cream-card hover:bg-white border border-cream-border text-roast font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-terracotta" />
              <span>{showQr ? 'Hide QR Code' : 'Scan to Phone'}</span>
            </button>
          </div>

          {/* Fallback & Mirror Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-roast/60 pt-1">
            <span>Direct CDN:</span>
            <a
              href={GITHUB_RELEASE_URL}
              className="text-terracotta hover:underline font-medium"
            >
              Bake.It.Your.Way.apk
            </a>
            <span>•</span>
            <a
              href={GITHUB_RELEASES_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-roast/70 hover:text-roast underline inline-flex items-center gap-1"
            >
              <span>GitHub Release Assets</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-xs text-roast/50 flex items-center justify-center gap-2 pt-1">
            <span>Direct APK</span>
            <span>•</span>
            <span>Android 8.0+</span>
            <span>•</span>
            <span className="text-matcha font-medium">Verified Release</span>
          </div>

          {/* Stuck at 100% Helper Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowTroubleshoot(!showTroubleshoot)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-honey/15 hover:bg-honey/25 border border-honey/30 text-xs font-medium text-roast transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-honey" />
              <span>Download stuck at 100% on phone? Tap for 3 quick fixes</span>
            </button>
          </div>

          {showTroubleshoot && (
            <div className="bg-cream-card rounded-2xl p-5 border border-honey/50 shadow-sm text-left space-y-3 animate-in fade-in zoom-in-95 duration-150 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 text-roast font-semibold text-sm">
                <AlertCircle className="w-4 h-4 text-honey shrink-0" />
                <h4>Why Android Chrome pauses at 100%</h4>
              </div>
              <p className="text-xs text-roast/70 leading-relaxed">
                When downloading third-party APKs, Android Chrome holds the file at 100% in a temporary cache until you confirm the standard security prompt. Here is how to finalize it immediately:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-cream border border-cream-border space-y-1">
                  <span className="font-semibold text-terracotta block">
                    1. Chrome Downloads
                  </span>
                  <p className="text-roast/75 leading-relaxed text-[11px]">
                    Tap Chrome&apos;s <strong>3 dots (⋮) &gt; Downloads</strong>. Find <code>Bake.It.Your.Way.apk</code> and tap <strong>&ldquo;Keep&rdquo;</strong> or <strong>&ldquo;Download anyway&rdquo;</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-cream border border-cream-border space-y-1">
                  <span className="font-semibold text-terracotta block">
                    2. Rename Cached File
                  </span>
                  <p className="text-roast/75 leading-relaxed text-[11px]">
                    Open your phone&apos;s <strong>Files</strong> app &gt; <strong>Downloads</strong>. Find <code>Bake.It.Your.Way.apk.crdownload</code>, tap <strong>Rename</strong>, and remove <code>.crdownload</code>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-cream border border-cream-border space-y-1">
                  <span className="font-semibold text-terracotta block">
                    3. In-App Browser
                  </span>
                  <p className="text-roast/75 leading-relaxed text-[11px]">
                    If opened from Messenger or Instagram, tap <strong>⋮ &gt; &ldquo;Open in Chrome / Browser&rdquo;</strong> (in-app browsers block APK storage writes).
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* QR Code Popdown / Card */}
        {showQr && (
          <div className="max-w-sm mx-auto bg-cream-card rounded-2xl p-6 border border-cream-border shadow-md text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-roast">
                Scan with Phone Camera
              </h3>
              <p className="text-xs text-roast/65">
                Point your phone camera to detect and open the download instantly.
              </p>
            </div>

            {/* Target mode switcher */}
            <div className="inline-flex rounded-xl p-1 bg-cream border border-cream-border text-xs">
              <button
                type="button"
                onClick={() => setQrMode('apk')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  qrMode === 'apk'
                    ? 'bg-cream-card text-terracotta shadow-xs'
                    : 'text-roast/60 hover:text-roast'
                }`}
              >
                Direct APK
              </button>
              <button
                type="button"
                onClick={() => setQrMode('page')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  qrMode === 'page'
                    ? 'bg-cream-card text-terracotta shadow-xs'
                    : 'text-roast/60 hover:text-roast'
                }`}
              >
                Download Page
              </button>
            </div>

            {/* Valid Camera-Scannable QR Code */}
            <div className="p-3 bg-white rounded-xl border border-cream-border inline-block shadow-inner">
              {qrCodeDataUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={qrCodeDataUrl}
                  alt="Camera-Scannable QR Code for Bake It Your Way APK"
                  className="w-48 h-48 rounded-lg block mx-auto"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-roast/40">
                  Generating QR code...
                </div>
              )}
            </div>

            <div className="text-[11px] text-roast/50 font-mono break-all px-2">
              {qrMode === 'apk' ? 'Direct APK Package' : 'Mobile Download Studio'}
            </div>
          </div>
        )}

        {/* 3 Step Installation Guide */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Sideloading Guide
            </span>
            <h2 className="font-serif text-2xl font-bold text-roast">
              How to Install on Android
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-cream-card rounded-2xl p-6 border border-cream-border space-y-3"
              >
                <span className="font-serif font-bold text-2xl text-terracotta">
                  {step.num}
                </span>
                <h3 className="font-serif font-bold text-base text-roast">
                  {step.title}
                </h3>
                <p className="text-xs text-roast/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Security & Cryptographic Integrity Box */}
        <section className="bg-cream-card rounded-2xl p-6 border border-cream-border space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-matcha" />
              <h3 className="font-serif font-bold text-base text-roast">
                Verified Cryptographic Signature
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-matcha-light text-matcha">
              Official Release
            </span>
          </div>

          <p className="text-xs text-roast/70 leading-relaxed">
            You can verify the authentic integrity of the APK package before installation using its SHA-256 hash:
          </p>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-cream border border-cream-border">
            <code className="text-[11px] font-mono text-roast/80 truncate flex-1 select-all">
              {sha256Hash}
            </code>
            <button
              type="button"
              onClick={copyHash}
              className="p-1.5 rounded-lg hover:bg-cream-card text-roast/60 hover:text-roast transition-colors shrink-0 cursor-pointer"
              title="Copy SHA-256 hash"
            >
              {copied ? (
                <Check className="w-4 h-4 text-matcha" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </section>

        {/* iOS Notice Bar */}
        <section className="rounded-2xl p-5 border border-cream-border/80 bg-cream-card flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-roast/80">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-terracotta shrink-0" />
            <div>
              <strong className="text-roast block">Using an Apple iOS device?</strong>
              <span>Our iOS version is currently in private TestFlight testing.</span>
            </div>
          </div>
          <Link
            href="/builder"
            className="text-terracotta font-semibold hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Use Web Studio on Safari</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-cream-card border-t border-cream-border py-8 text-xs text-roast/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-serif font-bold text-sm text-roast hover:text-terracotta">
            ← Return to Bake It Your Way
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/builder" className="hover:text-terracotta">Custom Studio</Link>
            <a href={GITHUB_RELEASE_URL} className="hover:text-terracotta font-medium text-terracotta">Direct APK</a>
            <a href={GITHUB_RELEASES_PAGE} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">GitHub Releases</a>
          </div>
          <p>© 2026 Bake It Your Way Inc.</p>
        </div>
      </footer>
    </div>
  );
}
