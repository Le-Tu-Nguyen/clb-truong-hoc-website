"use client";

import HeroSection from "../../components/HeroSection";
import { useLanguage } from "../../components/LanguageContext";

export default function HomePage() {
  const { language } = useLanguage();

  const text =
    language === "en"
      ? {
          stats: [
            { value: "2,500+", label: "Network engineers trained" },
            { value: "100%", label: "Hands-on real devices" },
            { value: "95%", label: "International certificates achieved" },
            { value: "HIGH", label: "Career opportunities in enterprise" },
          ],
          coursesTitle: "Featured Courses",
          courses: [
            {
              title: "CCNA International Certificate (200-301)",
              tags: "Flexible • Students and working professionals",
            },
            {
              title: "Information Security & Ethical Hacking",
              tags: "Flexible • 100% practical delivery",
            },
            {
              title: "Network Services",
              tags: "Flexible • System engineer pathway",
            },
          ],
          detail: "View details",
          contactTitle: "Contact Information",
          contactAddress:
            "Building B - Campus 1, Lac Hong University. 10 Huynh Van Nghe Street, Buu Long Ward, Bien Hoa City, Dong Nai Province.",
          contactEmail: "cntt@lhu.edu.vn",
          contactPhone: "(+84) 251 3 952 251",
        }
      : {
          stats: [
            { value: "2.500+", label: "Kỹ sư mạng đã đào tạo" },
            { value: "100%", label: "Thiết bị thật" },
            { value: "95%", label: "Đạt chứng chỉ Quốc tế (CCNA...)" },
            { value: "TĂNG CAO", label: "Cơ hội việc làm tại Doanh nghiệp" },
          ],
          coursesTitle: "Khóa học nổi bật",
          courses: [
            {
              title: "Chứng chỉ quốc tế CCNA (200-301)",
              tags: "Linh hoạt • Sinh viên và người đi làm",
            },
            {
              title: "An toàn thông tin & Ethical Hacking",
              tags: "Linh hoạt • Thực chiến 100%",
            },
            {
              title: "Dịch vụ mạng",
              tags: "Linh hoạt • Kỹ sư hệ thống",
            },
          ],
          detail: "Xem chi tiết",
          contactTitle: "LIÊN HỆ HỌC VIỆN",
          contactAddress:
            "Dãy nhà B - Cơ sở 1 Đại học Lạc Hồng. Số 10 Huỳnh Văn Nghệ, phường Bửu Long, TP. Biên Hòa, tỉnh Đồng Nai.",
          contactEmail: "cntt@lhu.edu.vn",
          contactPhone: "(+84) 251 3 952 251",
        };

  return (
    <>
      <HeroSection />

      <section className="stats-band-lhu section-shell">
        <div className="stats-grid-lhu">
          {text.stats.map((item) => (
            <article key={item.label} className="stat-card-lhu">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="courses-lhu section-shell">
        <h2 className="courses-title-lhu">{text.coursesTitle}</h2>
        <div className="courses-grid-lhu">
          {text.courses.map((course) => (
            <article key={course.title} className="course-card-lhu">
              <h3>{course.title}</h3>
              <p>{course.tags}</p>
              <button>{text.detail}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-lhu">
        <div className="section-shell contact-inner-lhu">
          <h2>{text.contactTitle}</h2>
          <p>{text.contactAddress}</p>
          <p>{text.contactEmail}</p>
          <p>{text.contactPhone}</p>
        </div>
      </section>
    </>
  );
}
