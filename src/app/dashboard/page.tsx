"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageContext";

type Stats = {
  totalMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  topCategory: string;
  activeTeams: number;
};

export default function DashboardPage() {
  const { strings, language } = useLanguage();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const statsStory =
    language === "en"
      ? [
          {
            kicker: "Network Foundation",
            title: "START STRONG",
            description:
              "Build a serious networking mindset from the first semester with guided Cisco labs and structured mentoring.",
            metrics: [
              { value: "2,500+", label: "Students trained" },
              { value: "36", label: "Lab sessions each term" },
            ],
          },
          {
            kicker: "Project Sprint",
            title: "BUILD REAL SYSTEMS",
            description:
              "Move from theory to deployment through team projects, troubleshooting drills, and enterprise-style workflows.",
            metrics: [
              { value: "100%", label: "Real-device practice" },
              { value: "18+", label: "Active practical topics" },
            ],
          },
          {
            kicker: "Career Outcome",
            title: "BECOME JOB READY",
            description:
              "Graduate with stronger portfolios, certification confidence, and clearer pathways to networking-security careers.",
            metrics: [
              { value: "95%", label: "Certification readiness" },
              { value: "87%", label: "Industry-aligned opportunities" },
            ],
          },
        ]
      : [
          {
            kicker: "Nền Tảng Mạng",
            title: "Bắt đầu\nchắc",
            description:
              "Sinh viên được xây nền tảng mạng bài bản ngay từ học kỳ đầu với lab Cisco và mentor theo sát lộ trình.",
            metrics: [
              { value: "2.500+", label: "Sinh viên đã đào tạo" },
              { value: "36", label: "Buổi lab mỗi học kỳ" },
            ],
          },
          {
            kicker: "Sprint Dự Án",
            title: "Làm dự án thật",
            description:
              "Từ lý thuyết đến triển khai qua dự án nhóm, xử lý sự cố và quy trình vận hành sát môi trường doanh nghiệp.",
            metrics: [
              { value: "100%", label: "Thực hành thiết bị thật" },
              { value: "18+", label: "Chủ đề thực chiến" },
            ],
          },
          {
            kicker: "Kết Quả Nghề Nghiệp",
            title: "Sẵn sàng đi làm",
            description:
              "Hoàn thiện portfolio, tự tin chứng chỉ và mở rộng cơ hội nghề nghiệp trong lĩnh vực mạng - an ninh mạng.",
            metrics: [
              { value: "95%", label: "Sẵn sàng chứng chỉ" },
              { value: "87%", label: "Cơ hội đúng định hướng" },
            ],
          },
        ];

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats))
      .finally(() => setLoading(false));
  }, []);

  const dataSource = stats
    ? [
        { key: strings.dashboard.stats.members, value: stats.totalMembers },
        { key: strings.dashboard.stats.totalEvents, value: stats.totalEvents },
        { key: strings.dashboard.stats.upcomingEvents, value: stats.upcomingEvents },
        { key: strings.dashboard.stats.topCategory, value: stats.topCategory },
        { key: strings.dashboard.stats.activeTeams, value: stats.activeTeams },
      ]
    : [];

  const barData = dataSource.filter((item) => typeof item.value === "number") as Array<{ key: string; value: number }>;
  const maxValue = Math.max(...barData.map((item) => item.value), 1);
  const topCategory = dataSource.find((item) => item.key === strings.dashboard.stats.topCategory)?.value;

  const topCategoryLabel =
    typeof topCategory === "string"
      ? topCategory
      : language === "en"
        ? "No data yet"
        : "Chưa có dữ liệu";

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <header className="mb-10 border-l-8 border-blue-600 pl-6">
        <h1 className="text-4xl font-black uppercase italic">{strings.dashboard.headerTitle}</h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">{strings.dashboard.headerSubtitle}</p>
      </header>

      <section className="stats-band-lhu">
        <div className="stats-story-lhu">
          {statsStory.map((slide, index) => (
            <article key={slide.title} className={`stats-slide-lhu stats-slide-${index + 1}`}>
              <div className="section-shell stats-slide-inner-lhu">
                <div className="stats-slide-copy-lhu">
                  <p>{slide.kicker}</p>
                  <h2>{slide.title}</h2>
                  <span>{slide.description}</span>
                </div>
                <div className="stats-slide-metrics-lhu">
                  {slide.metrics.map((item) => (
                    <div key={item.label} className="stats-metric-chip-lhu">
                      <strong>{item.value}</strong>
                      <small>{item.label}</small>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-bar-chart-lhu">
        <div className="dashboard-bar-chart-head-lhu">
          <h2>{language === "en" ? "Performance Bar Chart" : "Biểu đồ cột hiệu suất"}</h2>
          <p>
            {strings.dashboard.stats.topCategory}: <strong>{topCategoryLabel}</strong>
          </p>
        </div>

        <div className="dashboard-bars-lhu" role="img" aria-label={strings.dashboard.headerSubtitle}>
          {loading ? (
            <p className="dashboard-loading-lhu">{language === "en" ? "Loading chart..." : "Đang tải biểu đồ..."}</p>
          ) : (
            barData.map((item) => {
              const percent = (item.value / maxValue) * 100;

              return (
                <article key={item.key} className="dashboard-bar-item-lhu">
                  <div className="dashboard-bar-meta-lhu">
                    <span>{item.key}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <div className="dashboard-bar-track-lhu">
                    <div className="dashboard-bar-fill-lhu" style={{ width: `${percent}%` }} />
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
