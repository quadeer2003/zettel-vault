import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zettel Vault",
  description: "A productivity app.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/light.svg",
        href: "/light.svg"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/dark.svg",
        href: "/dark.svg"
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            storageKey="zettel-1"
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>

      </body>
    </html>
  );
}
