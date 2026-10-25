import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
const interTight = localFont({
  src: "../public/fonts/inter-tight-latin-variable.woff2",
  variable: "--font-inter-tight",
  weight: "300 500",
  display: "swap",
});
export const metadata: Metadata = { title: "pratik grv", description: "yo!" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} antialiased`}>
        <a href="#main-content" className="skip-link pill">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
