import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-lhu">
      <div className="section-shell footer-inner-lhu">
        <div className="footer-brand-lhu">
          <Image src="/logo.jpg" alt="Đại học Lạc Hồng" className="footer-logo-lhu" width={84} height={84} />
          <div>
            <p>Đơn vị đào tạo: Khoa Công Nghệ Thông Tin</p>
            <p>© 2026 HỌC VIỆN MẠNG LẠC HỒNG.</p>
          </div>
        </div>
        <div className="footer-metric-lhu">300+ Học viên đang học</div>
      </div>
    </footer>
  );
}