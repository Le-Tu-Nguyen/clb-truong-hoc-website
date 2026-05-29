"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

const Navbar = () => {
  const { language, setLanguage, strings } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <nav className="top-navbar">
      <div className="top-navbar-inner container">
        <Link href="/" className="brand-block" aria-label={strings.nav.universityName}>
          <Image
            src="https://lhu.edu.vn/Data/News/446/images/LHU_ASU_ENG_1_.png"
            alt={strings.nav.universityName}
            className="brand-logo"
            width={46}
            height={46}
            priority
          />
          <div className="brand-text">{strings.nav.universityName}</div>
        </Link>

        <div className="top-navbar-right">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="mobile-menu-toggle"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? "✕" : "☰"}
          </button>

          <div className="top-navbar-links" aria-hidden={open ? "false" : "true"}>
            <Link href="/">{strings.nav.home}</Link>
            <a
              href="https://cs.lhu.edu.vn/208/43373/CNTT-Cau-lac-bo-Mang-Cisco-Khoa-Cong-nghe-thong-tin.html"
              target="_blank"
              rel="noreferrer"
            >
              {strings.nav.about}
            </a>
            <Link href="/events">{strings.nav.events}</Link>
            <Link href="/dashboard">{strings.nav.dashboard}</Link>
            <Link href="/contact">{strings.nav.contact}</Link>
          </div>

          <div className="top-navbar-actions">
            <div className="language-switch" role="group" aria-label={strings.nav.language}>
              <button
                type="button"
                className={`language-switch-item ${language === "vi" ? "active" : ""}`}
                onClick={() => setLanguage("vi")}
              >
                VI
              </button>
              <button
                type="button"
                className={`language-switch-item ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
            <Link href="/register" className="navbar-cta-link">
              {strings.nav.register}
            </Link>
          </div>
        </div>

        <div className={`mobile-menu ${open ? "open" : ""}`} role="menu">
          <div style={{ display: "grid", gap: 10 }}>
            <Link href="/" onClick={() => setOpen(false)}>{strings.nav.home}</Link>
            <a
              href="https://cs.lhu.edu.vn/208/43373/CNTT-Cau-lac-bo-Mang-Cisco-Khoa-Cong-nghe-thong-tin.html"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              {strings.nav.about}
            </a>
            <Link href="/events" onClick={() => setOpen(false)}>{strings.nav.events}</Link>
            <Link href="/dashboard" onClick={() => setOpen(false)}>{strings.nav.dashboard}</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>{strings.nav.contact}</Link>
            <Link href="/register" onClick={() => setOpen(false)} className="navbar-cta-link">{strings.nav.register}</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;