import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkLines from "../components/NetworkLines";
import { ThemeProvider } from "../components/ThemeContext";

export const metadata: Metadata = {
  title: "Website CLB Sinh Viên - LHU",
  description: "Nơi kết nối đam mê và phát triển kỹ năng sinh viên",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased text-gray-900 bg-white transition-colors duration-300">
        <ThemeProvider>
          <div className="page-wrapper-with-network">
            <NetworkLines />
            <Navbar />
            <main className="main-content-with-network">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}