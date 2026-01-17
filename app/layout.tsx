import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "24P Academy | Poker Mastery Platform",
  description: "Master poker through structured curriculum, assessments, and AI coaching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-white min-h-screen`}
      >
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 ml-0 md:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
