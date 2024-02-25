import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Theme } from "@/components/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beta Shop - Produtos Digitais para o seu Aprendizado",
  description:
    "Explore uma ampla variedade de produtos digitais na Beta Shop. Descubra cursos, eBooks e recursos educacionais para impulsionar o seu aprendizado.",
  keywords: "produtos digitais, cursos online, eBooks, aprendizado online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-theme="app">
      <body className={`${inter.className}`}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
