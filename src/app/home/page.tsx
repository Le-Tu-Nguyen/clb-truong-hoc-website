"use client";

import HeroSection from "../../components/HeroSection";
import { useLanguage } from "../../components/LanguageContext";

export default function HomePage() {
  const { language } = useLanguage();
  const text =
    language === "en"
      ? {
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
          serviceTitle: "What We Build For Students",
          services: [
            {
              title: "Cisco Networking Practice",
              desc: "Real switching-routing labs, troubleshooting drills, and certification-aligned pathways.",
            },
            {
              title: "Security & AI Operations",
              desc: "Hands-on SOC concepts, security mindset, and practical AI support for network monitoring.",
            },
            {
              title: "Career-ready Projects",
              desc: "Team-based deployment projects that strengthen portfolio quality and interview confidence.",
            },
          ],
          processTitle: "How We Learn",
          processSubtitle: "A practical, mentor-led journey in 5 steps.",
          process: ["Orientation", "Lab Foundations", "Project Sprint", "Demo & Feedback", "Career Mentoring"],
        }
      : {
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
          serviceTitle: "Chúng Tôi Xây Dựng Gì Cho Sinh Viên",
          services: [
            {
              title: "Thực hành mạng Cisco",
              desc: "Lab switching-routing thiết bị thật, bài tập xử lý sự cố và lộ trình sát chứng chỉ quốc tế.",
            },
            {
              title: "An ninh mạng & AI Operations",
              desc: "Rèn tư duy SOC, kỹ năng bảo mật nền tảng và ứng dụng AI trong giám sát hệ thống mạng.",
            },
            {
              title: "Dự án sẵn sàng nghề nghiệp",
              desc: "Làm dự án theo nhóm để tăng chất lượng portfolio và tự tin khi phỏng vấn doanh nghiệp.",
            },
          ],
          processTitle: "Cách Chúng Tôi Đào Tạo",
          processSubtitle: "Hành trình thực chiến 5 bước với mentor đồng hành.",
          process: ["Định hướng", "Nền tảng lab", "Sprint dự án", "Demo & phản biện", "Mentor nghề nghiệp"],
        };

  return (
    <>
      <HeroSection />

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

      <section className="services-lhu section-shell">
        <h2>{text.serviceTitle}</h2>
        <div className="services-grid-lhu">
          {text.services.map((service) => (
            <article key={service.title} className="service-card-lhu">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-lhu section-shell">
        <div className="process-head-lhu">
          <h2>{text.processTitle}</h2>
          <p>{text.processSubtitle}</p>
        </div>
        <div className="process-track-lhu">
          {text.process.map((step, index) => (
            <article key={step} className="process-step-lhu">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
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
