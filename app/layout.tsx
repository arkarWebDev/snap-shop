import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppNav from "@/components/navigation/app-nav";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | iStore",
    default: "iStore - Premium Digital Devices",
  },
  description: "Your ultimate destination for discovering and purchasing premium digital devices with a seamless, modern shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <div className="antialiased min-h-screen bg-slate-50 flex flex-col selection:bg-slate-200">
          <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AppNav />
            </div>
          </header>

          <main className="flex-grow w-full">
            {children}
            <Toaster position="top-center" richColors closeButton />
          </main>
        </div>
      </body>
    </html>
  );
}
