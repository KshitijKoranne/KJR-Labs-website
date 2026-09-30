import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { tokenCss } from "@/lib/tokens";
import { brand, contact, people, social } from "@/content/site";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Palette from "@/components/Palette";
import Extras from "@/components/Extras";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display", axes: ["wdth", "opsz"], display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--f-serif", display: "swap", preload: false });
const sans = Inter({ subsets: ["latin"], variable: "--f-sans", display: "swap", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap", preload: false });

const title = "KJR Labs | Web, Mobile & AI Software Studio, Vadodara";
const description = "KJR Labs is a software studio in Vadodara, India. We design and build web apps, iOS and Android apps and AI tools for founders and small businesses worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: title, template: "%s | KJR Labs" },
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: { title, description, url: "/", siteName: brand.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description, creator: "@kshitijkoranne" },
};

export const viewport: Viewport = { themeColor: "#F2EFE8", width: "device-width", initialScale: 1, viewportFit: "cover" };

const ld = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  description,
  url: brand.url,
  image: `${brand.url}/opengraph-image`,
  areaServed: "Worldwide",
  email: contact.email.value,
  telephone: contact.phone.tel,
  address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressRegion: "Gujarat", addressCountry: "IN" },
  openingHoursSpecification: contact.hours.filter((h) => h.open).map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.dow, opens: h.open, closes: h.close })),
  founder: { "@type": "Person", name: people[0].name, jobTitle: people[0].role },
  sameAs: social.filter((s) => !s.placeholder).map((s) => s.href),
};

// Skips the preloader before first paint when already booted this session or on reduced motion.
const bootScript = `try{if(sessionStorage.getItem('booted')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('booted')}catch(e){document.documentElement.classList.add('booted')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: tokenCss }} />
        <Script id="boot" strategy="beforeInteractive">{bootScript}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-bone">Skip to content</a>
        <Preloader />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCTA />
        <Palette />
        <Extras />
      </body>
    </html>
  );
}
