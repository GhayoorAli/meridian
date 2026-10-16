import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/footer";
import { Preloader } from "@/components/preloader";
import { site } from "@/data/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bone text-ink" suppressHydrationWarning>
        <Preloader />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
