import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyScript",
  description: "make it ez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#f7f9fc]">
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-[1920px] mx-auto px-4">
              <div className="flex items-center justify-between h-[50px]">
                <div className="flex items-center space-x-8">
                  <h1 className="text-xl font-bold text-[#1a1a1a]">EasyScript</h1>
                </div>
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
