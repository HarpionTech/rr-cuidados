import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { BASE } from "@/lib/asset";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RR Cuidado Domiciliar — Cuidado que começa em casa",
  description:
    "Cuidado humanizado de idosos no conforto do seu lar. Equipe técnica, acolhimento e tranquilidade para sua família na Grande Florianópolis.",
  icons: {
    icon: [
      { url: `${BASE}/favicon.ico`, sizes: "any" },
      { url: `${BASE}/assets/favicon-32.png`, type: "image/png", sizes: "32x32" },
    ],
    apple: `${BASE}/assets/apple-touch-icon.png`,
  },
  openGraph: {
    title: "RR Cuidado Domiciliar — Cuidado que começa em casa",
    description:
      "Cuidado humanizado de idosos no conforto do seu lar. Grande Florianópolis.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#004a92",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${hanken.variable} antialiased`}
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
