import HeroSection from "../../components/HeroSection";
import EventCard from "../../components/EventCard";
import Link from "next/link";

const featuredEvents = [
  {
    title: "Workshop Kỹ năng mềm",
    date: "25/03/2026 - 18:00",
    location: "Hội trường A",
    description: "Chia sẻ kỹ năng giao tiếp, làm việc nhóm và thuyết trình.",
  },
  {
    title: "Ngày hội Kết nối Thành viên",
    date: "30/03/2026 - 08:00",
    location: "Sân trường",
    description: "Hoạt động giao lưu, kết nối giữa thành viên mới và ban điều hành.",
  },
  {
    title: "Tình nguyện cuối tuần",
    date: "05/04/2026 - 07:00",
    location: "Trung tâm bảo trợ xã hội",
    description: "Cùng CLB tham gia hoạt động thiện nguyện vì cộng đồng.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="section">
        <h2 className="section-title">Giới thiệu sơ lược về CLB</h2>
        <p style={{ textAlign: "center", lineHeight: "1.8", maxWidth: "900px", margin: "0 auto" }}>
          CLB Trường Học là môi trường lý tưởng để sinh viên học hỏi, phát triển
          kỹ năng, mở rộng mối quan hệ và tham gia các hoạt động ý nghĩa trong
          học tập lẫn cộng đồng. Chúng tôi hướng tới xây dựng một tập thể năng
          động, đoàn kết và sáng tạo.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Hoạt động nổi bật</h2>
        <div className="card-grid">
          {featuredEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <h2 className="section-title">Khám phá thêm</h2>
        <div className="hero-buttons">
          <Link href="/about">
            <button className="btn btn-secondary">Giới thiệu CLB</button>
          </Link>
          <Link href="/events">
            <button className="btn btn-primary">Xem tất cả sự kiện</button>
          </Link>
          <Link href="/contact">
            <button className="btn btn-secondary">Liên hệ CLB</button>
          </Link>
        </div>
      </section>
    </>
  );
}