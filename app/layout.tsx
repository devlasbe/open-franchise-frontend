import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SeoUtil } from "@/utils/seo";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "600", "900"],
  variable: "--noto",
});

export const metadata = SeoUtil.metadata();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.className} antialiased`}>
        <Analytics />
        <div className="flex justify-center w-full min-h-dvh">
          <main className="flex max-w-screen-xl w-full min-h-dvh pt-20 pb-8 px-2 xl:px-0 bg-white">{children}</main>
        </div>
        <Header />
        <Footer />
      </body>
    </html>
  );
}
