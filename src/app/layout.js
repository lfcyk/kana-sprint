import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });
const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata = {
  title: "Kana Sprint",
  description: "Compete for the best time and while learning about Hiragana & Katakana!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SpeedInsights/>
      <body className={notoSansJp.className}>{children}</body>
    </html>
  );
}
