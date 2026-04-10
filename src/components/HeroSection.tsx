"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function HeroSection() {
  const { language } = useLanguage();

  const labels =
    language === "en"
      ? {
          welcome: "Welcome to",
          title: "LAC HONG UNIVERSITY NETWORK ACADEMY",
          subtitle:
            "Conquer Cisco international certifications, master enterprise networking infrastructure, and apply AI in system administration.",
          cta1: "Explore Academy",
          cta2: "Explore Courses",
        }
      : {
          welcome: "Chào mừng bạn đến với",
          title: "HỌC VIỆN MẠNG ĐẠI HỌC LẠC HỒNG",
          subtitle:
            "Chinh phục các chứng chỉ quốc tế Cisco, làm chủ hạ tầng mạng doanh nghiệp và ứng dụng AI vào quản trị hệ thống.",
          cta1: "KHÁM PHÁ HỌC VIỆN",
          cta2: "KHÁM PHÁ KHÓA HỌC",
        };

  return (
    <section className="hero-section-lhu">
      <div className="hero-layout-lhu">
        <div className="hero-image-wrap-lhu">
          <Image src="/hero.jpg" alt="Phòng lab mạng" className="hero-image-lhu" width={860} height={560} priority />
          <div className="hero-logo-on-image">
            <Image src="/logo.jpg" alt="Logo Đại học Lạc Hồng" width={108} height={108} className="hero-logo-badge" priority />
          </div>
        </div>
        <div className="hero-content-lhu">
          <p className="hero-kicker-lhu">{labels.welcome}</p>
          <h1 className="hero-title-lhu">{labels.title}</h1>
          <p className="hero-subtitle-lhu">{labels.subtitle}</p>

          <div className="hero-buttons-lhu">
            <Link href="/about">
              <button className="hero-cta-lhu">{labels.cta1}</button>
            </Link>
          <Link href="/events">
              <button className="hero-cta-lhu">{labels.cta2}</button>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}