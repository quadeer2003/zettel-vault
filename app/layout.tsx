import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Yatra_One } from "next/font/google";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ModalProvider } from "@/components/providers/model-provider";

const font = Yatra_One({
    weight: '400',
    subsets: ['latin']
});
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
      <body className={font.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="zettel-1"
          >
            <Toaster position="bottom-center"/>
            <ModalProvider/>
            {children}
          </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>

      </body>
    </html>
  );
}
