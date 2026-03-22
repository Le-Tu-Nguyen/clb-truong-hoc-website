import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero">
      <h1>Chào mừng đến với CLB Trường Học</h1>
      <p>
        Nơi kết nối sinh viên năng động, sáng tạo và cùng nhau phát triển kỹ năng.
      </p>

      <div className="hero-buttons">
        <Link href="/events">
          <button className="btn btn-primary">Xem sự kiện</button>
        </Link>
        <Link href="/register">
          <button className="btn btn-secondary">Đăng ký tham gia</button>
        </Link>
      </div>
    </section>
  );
}