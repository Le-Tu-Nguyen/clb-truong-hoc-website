import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.css";
import Navbar from "../src/components/Navbar";
import Banner from "../src/components/Banner";
import Footer from "../src/components/Footer";
import NetworkLines from "../src/components/NetworkLines";
import { ThemeProvider } from "../src/components/ThemeContext";
import { LanguageProvider } from "../src/components/LanguageContext";

export const metadata: Metadata = {
  title: "FITWAN - Cisco Networking Club Đại học Lạc Hồng",
  description: "FITWAN kết nối sinh viên yêu thích Mạng Cisco và An ninh mạng tại Đại học Lạc Hồng.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased bg-transparent transition-colors duration-300">
        <LanguageProvider>
          <ThemeProvider>
            <div className="page-wrapper-with-network">
              <NetworkLines />
              <Banner />
              <Navbar />
              <main className="main-content-with-network">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
