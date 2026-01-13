import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const folsom = localFont({
  variable: "--font-folsom",
  src: "./fonts/folsom-black-web.woff2",
});

const clack = localFont({
  variable: "--font-clack",
  src: [
    {
      path: "./fonts/Clack-Regular_otf.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Clack-Bold_otf.woff2",
      weight: "800",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "gallery of fruits",
  description: "gallery of fruits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${folsom.variable} ${clack.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
