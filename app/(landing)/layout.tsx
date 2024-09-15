import { Navbar } from "./_components/navbar";
import { GeistMono } from "geist/font/mono";
import { StripedPattern } from "@/registry/magicui/striped-pattern";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative h-full font-mono"
      style={
        {
          "--font-geist-mono": GeistMono.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <StripedPattern className="stroke-[0.3] [stroke-dasharray:8,4] z-0" />
      <div className="relative z-10 h-full">
        <Navbar />
        <main className="h-full pt-40">{children}</main>
      </div>
    </div>
  );
};
export default LandingPageLayout;
