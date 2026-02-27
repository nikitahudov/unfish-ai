import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FloatingHelpButton } from "@/components/support/FloatingHelpButton";
import { ToastContainer } from "@/components/ui/ToastContainer";

const fontSans = GeistSans;
const fontMono = GeistMono;

export const metadata: Metadata = {
  title: "UnFish.ai — Transform from Fish to Shark",
  description: "AI-powered poker coaching platform. Master 96 poker skills with structured curriculum and AI coaching.",
  metadataBase: new URL('https://unfish.ai'),
  openGraph: {
    url: 'https://unfish.ai',
    siteName: 'UnFish.ai',
    title: 'UnFish.ai — Transform from Fish to Shark',
    description: 'AI-powered poker coaching platform. Master 96 poker skills with structured curriculum and AI coaching.',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased bg-slate-950 text-white min-h-screen`}
      >
        <AuthProvider>
          <div className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <FloatingHelpButton />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
