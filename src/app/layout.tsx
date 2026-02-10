import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.61-1.72A12.74 12.74 0 0 0 16 28.8c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.799-12.8zm0 23.04c-2.01 0-3.98-.53-5.7-1.54l-.41-.24-3.93 1.02 1.05-3.83-.27-.39A10.57 10.57 0 0 1 5.44 16c0-5.83 4.73-10.56 10.56-10.56 5.83 0 10.56 4.73 10.56 10.56 0 5.83-4.73 10.56-10.56 10.56zm5.81-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.61-1.89-1.8-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.53-.54-.71-.55-.18-.01-.39-.01-.6-.01-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.65 0 1.56 1.15 3.07 1.31 3.29.16.21 2.27 3.47 5.51 4.73.77.3 1.37.48 1.84.61.77.2 1.47.17 2.02.1.62-.09 1.89-.77 2.16-1.51.27-.74.27-1.37.19-1.51-.08-.14-.29-.21-.61-.37z" />
    </svg>
  );
}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Focus Trading Contractor — Design & Build, Finishing, Acoustic",
  description: "CV. Focus Trading Contractor — Design & Build, Finishing Contractor & Acoustic Installation sejak 2013. Fast and reliable service for your project or a quick fix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17944652748"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17944652748');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
        <Navigation />
        {children}
        <div className="fixed bottom-6 right-6 z-50 group">
          <a
            href="https://wa.me/6281229750999"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat WhatsApp"
            className="relative block"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 blur-sm animate-ping"></span>
            <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-soft transition-transform duration-200 hover:scale-105">
              <WhatsAppIcon className="w-8 h-8" />
            </div>
            <span className="pointer-events-none absolute -top-2 right-full mr-3 rounded-xl bg-white text-slate-900 text-xs font-medium px-3 py-1 shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Chat via WhatsApp
            </span>
          </a>
        </div>
      </body>
    </html>
  );
}
