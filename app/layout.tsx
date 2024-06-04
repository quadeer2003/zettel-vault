import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zettel Vault",
  description: "A productivity app.",
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme: light)",
        url:"/light.svg",
        href:"/light.svg"
      },
      {
        media:"(prefers-color-scheme: dark)",
        url:"/dark.svg",
        href:"/dark.svg"
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
