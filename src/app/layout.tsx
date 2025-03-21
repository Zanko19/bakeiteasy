import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RecipesProvider } from "@/context/RecipesContext";
import { PantryProvider } from "@/context/PantryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BakeItEasy - Votre assistant de pâtisserie",
  description: "Découvrez des recettes de pâtisserie faciles à réaliser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecipesProvider>
          <PantryProvider>
            {children}
          </PantryProvider>
        </RecipesProvider>
      </body>
    </html>
  );
}
