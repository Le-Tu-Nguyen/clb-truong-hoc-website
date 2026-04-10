"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

const Navbar = () => {
  const { language, setLanguage, strings } = useLanguage();

  const labels =
    language === "en"
      ? {
          home: "Home",
          courses: "Courses",
          ai: "AI & Network",
          contact: "Contact",
        }
      : {
          home: "Trang chủ",
          courses: "Các khóa học",
          ai: "AI & Network",
          contact: "Liên hệ",
        };

  return (
    <nav className="top-navbar">
      <div className="top-navbar-inner">
        <Link href="/" className="brand-block" aria-label="Lac Hong University">
          <Image
            src="https://lhu.edu.vn/Data/News/446/images/LHU_ASU_ENG_1_.png"
            alt="Đại học Lạc Hồng"
            className="brand-logo"
            width={46}
            height={46}
            priority
          />
          <div className="brand-text">ĐẠI HỌC LẠC HỒNG</div>
        </Link>

        <div className="top-navbar-right">
          <div className="top-navbar-links">
            <Link href="/">{labels.home}</Link>
            <Link href="/events">{labels.courses}</Link>
            <Link href="/dashboard">{labels.ai}</Link>
            <Link href="/contact">{labels.contact}</Link>
          </div>

          <select
            aria-label={strings.nav.language}
            value={language}
            className="language-select"
            onChange={(event) => setLanguage(event.target.value as "vi" | "en")}
          >
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;