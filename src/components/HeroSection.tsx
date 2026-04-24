"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function HeroSection() {
  const { language } = useLanguage();

  const labels =
    language === "en"
      ? {
          tag: "FITWAN Network Academy",
          titleLead: "Your network journey",
          titleAccent: "drives the future",
          subtitle:
            "Hands-on Cisco labs, cybersecurity practice, and real deployment mindset for students who want to build strong infrastructure careers.",
          cta1: "Discover Programs",
          cta2: "Join the Community",
          miniStats: ["2,500+ Learners", "Cisco Lab Ready", "Career Mentorship"],
        }
      : {
          tag: "Học viện mạng FITWAN",
          titleLead: "Hành trình mạng của bạn",
          titleAccent: "dẫn lối tương lai",
          subtitle:
            "Thực hành Cisco trên lab thật, rèn kỹ năng an ninh mạng, và tư duy triển khai hệ thống để sẵn sàng cho môi trường doanh nghiệp.",
          cta1: "Khám phá chương trình",
          cta2: "Tham gia cộng đồng",
          miniStats: ["2.500+ Học viên", "Lab Cisco thực chiến", "Mentor đồng hành"],
        };

  return (
    <section className="hero-section-lhu">
      <div className="section-shell hero-layout-lhu">
        <div className="hero-content-lhu">
          <p className="hero-kicker-lhu">{labels.tag}</p>
          <h1 className="hero-title-lhu">
            <span>{labels.titleLead}</span>
            <strong>{labels.titleAccent}</strong>
          </h1>
          <p className="hero-subtitle-lhu">{labels.subtitle}</p>

          <div className="hero-buttons-lhu">
            <Link href="/events" className="hero-cta-lhu primary">
              {labels.cta1}
            </Link>
            <Link href="/register" className="hero-cta-lhu ghost">
              {labels.cta2}
            </Link>
          </div>

          <div className="hero-mini-stats">
            {labels.miniStats.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="hero-image-wrap-lhu">
          <Image src="/hero.jpg" alt="Phòng lab mạng" className="hero-image-lhu" width={900} height={640} priority />
          <div className="hero-logo-on-image">
            <Image src="/logo.jpg" alt="Logo Đại học Lạc Hồng" width={104} height={104} className="hero-logo-badge" priority />
          </div>
          <div className="hero-floating-note">Cisco | Security | AI Ops</div>
          <div className="hero-floating-note second">Real Projects Every Semester</div>
          <div className="hero-image-overlay" />
        </div>
      </div>
    </section>
  );
}