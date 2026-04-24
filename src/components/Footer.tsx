import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-lhu">
      <div className="section-shell footer-inner-lhu">
        <div className="footer-brand-lhu">
          <Image src="/logo.jpg" alt="Đại học Lạc Hồng" className="footer-logo-lhu" width={84} height={84} />
          <div>
            <h3>FITWAN Network Academy</h3>
            <p>Đơn vị đào tạo: Khoa Công Nghệ Thông Tin - Đại học Lạc Hồng</p>
            <p>© 2026 FITWAN. All rights reserved.</p>
          </div>
        </div>

        <div className="footer-links-lhu">
          <Link href="/about">Giới thiệu</Link>
          <Link href="/events">Sự kiện</Link>
          <Link href="/register">Đăng ký</Link>
          <Link href="/contact">Liên hệ</Link>
        </div>

        <div className="footer-metric-lhu">
          <span>300+</span>
          <p>Học viên đang học</p>
        </div>
      </div>
    </footer>
  );
}