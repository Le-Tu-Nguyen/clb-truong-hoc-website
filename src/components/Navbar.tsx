"use client";
import Link from "next/link";
import { useState } from "react";
import { Select, Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "./ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, variant, setVariant } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-gray-100 dark:border-zinc-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-extrabold text-blue-700 dark:text-cyan-300 tracking-tight">
            CLUB<span className="text-orange-500">LOGO</span>
          </Link>

          <div className="hidden md:flex space-x-8 font-medium">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">Trang chủ</Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">Giới thiệu</Link>
            <Link href="/events" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">Sự kiện</Link>
            <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">Dashboard</Link>
            <Link href="/contact" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">Liên hệ</Link>
          </div>

          <div className="flex items-center gap-3">
            <Select
              className="w-32"
              value={variant}
              options={[
                { value: "default", label: "Theme mặc định" },
                { value: "sunset", label: "Theme Sunset" },
                { value: "forest", label: "Theme Forest" },
              ]}
              onChange={(value) => setVariant(value)}
            />
            <Switch
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <Link href="/register" className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
              Tham gia ngay
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 dark:text-gray-200">
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-700 p-4 space-y-3 flex flex-col animate-fadeIn">
          <Link href="/" onClick={() => setIsOpen(false)}>Trang chủ</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>Giới thiệu</Link>
          <Link href="/events" onClick={() => setIsOpen(false)}>Sự kiện</Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link href="/register" className="text-blue-600 dark:text-cyan-400 font-bold">Đăng ký</Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;