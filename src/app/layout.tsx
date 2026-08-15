import type { Metadata } from "next";
import { Outfit, Pacifico } from "next/font/google";
import { APP } from "@/lib/config";
import "./globals.css";

/* Les deux polices du portfolio. Outfit porte tout le texte ; Pacifico est
   réservée au seul nom du produit — une académie qui enseigne la rigueur ne
   peut pas titrer ses chapitres en écriture cursive. */
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display-family",
});

export const metadata: Metadata = {
  title: APP.name,
  description: APP.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`h-full antialiased ${outfit.variable} ${pacifico.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4
                     focus:z-50 focus:rounded-md focus:border focus:border-line
                     focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Aller au contenu
        </a>
        <div aria-hidden className="fond-grille" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
