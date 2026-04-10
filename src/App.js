import React from 'react';

const appStyles = {
  fontFamily: 'Inter, system-ui, sans-serif',
  lineHeight: 1.6,
  margin: 0,
  padding: 0,
  background: '#f4f7fb',
  color: '#0f172a',
};

const heroStyles = {
  background: 'linear-gradient(180deg, #0058d0 0%, #0041a3 100%)',
  padding: '60px 20px 40px',
  color: '#fff',
};

const navStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 1200,
  margin: '0 auto 40px',
  padding: '0 20px',
};

const navLogo = {
  fontSize: '1.05rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const navMenu = {
  display: 'flex',
  gap: 24,
};

const navLink = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: '0.95rem',
};

const containerStyles = {
  maxWidth: 1200,
  margin: '0 auto',
};

const heroGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: 24,
  alignItems: 'center',
};

const heroCard = {
  borderRadius: 28,
  overflow: 'hidden',
  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.18)',
  minHeight: 460,
  background: '#0e3d86',
};

const heroImage = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const heroContent = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 18,
};

const heroTitle = {
  fontSize: '3rem',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  margin: 0,
};

const heroText = {
  fontSize: '1rem',
  maxWidth: 560,
  margin: 0,
  color: 'rgba(255,255,255,0.88)',
};

const buttonRow = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
};

const primaryButton = {
  background: '#ea8600',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '14px 24px',
  fontWeight: 700,
  cursor: 'pointer',
};

const secondaryButton = {
  background: '#ffb547',
  color: '#0f172a',
  border: 'none',
  borderRadius: 10,
  padding: '14px 24px',
  fontWeight: 700,
  cursor: 'pointer',
};

const statsSection = {
  marginTop: -40,
  padding: '0 20px 40px',
};

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: 20,
};

const statCard = {
  background: '#1d62d0',
  borderRadius: 18,
  padding: '28px 24px',
  color: '#fff',
  textAlign: 'center',
  minHeight: 160,
  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12)',
};

const statNumber = {
  fontSize: '2rem',
  fontWeight: 800,
  margin: '0 0 8px',
};

const statLabel = {
  margin: 0,
  opacity: 0.9,
};

const coursesSection = {
  padding: '40px 20px 0',
};

const coursesHeader = {
  marginBottom: 24,
  color: '#0f172a',
};

const coursesTitle = {
  fontSize: '2rem',
  fontWeight: 800,
  margin: 0,
};

const coursesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 20,
};

const courseCard = {
  background: '#fff',
  borderRadius: 20,
  padding: 24,
  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const courseBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 12px',
  background: '#f7faff',
  color: '#0058d0',
  borderRadius: 999,
  fontSize: '0.85rem',
  fontWeight: 700,
  width: 'fit-content',
};

const courseTitle = {
  margin: 0,
  fontSize: '1.2rem',
  fontWeight: 800,
  color: '#0f172a',
};

const courseMeta = {
  display: 'grid',
  gap: 10,
  color: '#475569',
  fontSize: '0.95rem',
};

const detailButton = {
  marginTop: 'auto',
  background: '#ffbf25',
  color: '#0f172a',
  border: 'none',
  borderRadius: 12,
  padding: '14px 20px',
  fontWeight: 700,
  cursor: 'pointer',
};

const contactSection = {
  background: '#333333',
  color: '#f3f4f6',
  padding: '40px 20px',
};

const contactContainer = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
  maxWidth: 1200,
  margin: '0 auto',
};

const contactItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 14,
  marginBottom: 16,
  fontSize: '0.97rem',
};

const footer = {
  background: '#0e3b8a',
  color: '#f8fafc',
  padding: '28px 20px',
  textAlign: 'center',
};

const footerText = {
  margin: '8px 0 0',
  fontSize: '0.95rem',
  opacity: 0.9,
};

const App = () => {
  return (
    <div style={appStyles}>
      <nav style={navStyles}>
        <div style={navLogo}>Đại học Lạc Hồng</div>
        <div style={navMenu}>
          <a href="#" style={navLink}>Trang chủ</a>
          <a href="#" style={navLink}>Các khóa học</a>
          <a href="#" style={navLink}>AI & Network</a>
          <a href="#" style={navLink}>Liên hệ</a>
        </div>
      </nav>
      <section style={heroStyles}>
        <div style={containerStyles}>
          <div style={heroGrid}>
            <div style={heroCard}>
              <img
                src="https://images.unsplash.com/photo-1522202224026-8b0f1c3f9838?auto=format&fit=crop&w=1200&q=80"
                alt="Học viên thực hành mạng"
                style={heroImage}
              />
            </div>
            <div style={heroContent}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.85, fontSize: '0.88rem' }}>
                Chào mừng bạn đến với
              </span>
              <h1 style={heroTitle}>Học viện mạng Đại học Lạc Hồng</h1>
              <p style={heroText}>
                Chinh phục các chứng chỉ quốc tế Cisco, làm chủ hạ tầng mạng doanh nghiệp và ứng dụng AI vào quản trị hệ thống.
              </p>
              <div style={buttonRow}>
                <button style={primaryButton}>Khám phá học viện</button>
                <button style={secondaryButton}>Khám phá khóa học</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={statsSection}>
        <div style={containerStyles}>
          <div style={statsGrid}>
            <div style={statCard}>
              <p style={statNumber}>2.500+</p>
              <p style={statLabel}>Kỹ sư mạng đã đào tạo</p>
            </div>
            <div style={statCard}>
              <p style={statNumber}>100%</p>
              <p style={statLabel}>Thiết bị thật</p>
            </div>
            <div style={statCard}>
              <p style={statNumber}>95%</p>
              <p style={statLabel}>Đạt chứng chỉ Quốc tế (CCNA...)</p>
            </div>
            <div style={statCard}>
              <p style={statNumber}>Tăng cao</p>
              <p style={statLabel}>Cơ hội việc làm tại Doanh nghiệp</p>
            </div>
          </div>
        </div>
      </section>

      <section style={coursesSection}>
        <div style={containerStyles}>
          <div style={coursesHeader}>
            <p style={{ margin: 0, color: '#0f172a', opacity: 0.7, fontWeight: 700 }}>Các khóa học nổi bật</p>
            <h2 style={coursesTitle}>Học ngay, làm ngay với chương trình thực chiến</h2>
          </div>
          <div style={coursesGrid}>
            <article style={courseCard}>
              <span style={courseBadge}>Chứng chỉ quốc tế CCNA (200-301)</span>
              <h3 style={courseTitle}>CCNA Network Engineering</h3>
              <div style={courseMeta}>
                <span>• Linh hoạt</span>
                <span>• Sinh viên & người đi làm</span>
              </div>
              <button style={detailButton}>Xem chi tiết</button>
            </article>
            <article style={courseCard}>
              <span style={courseBadge}>An toàn thông tin & Ethical Hacking</span>
              <h3 style={courseTitle}>Cybersecurity & Ethical Hacking</h3>
              <div style={courseMeta}>
                <span>• Linh hoạt</span>
                <span>• Thực chiến 100%</span>
              </div>
              <button style={detailButton}>Xem chi tiết</button>
            </article>
            <article style={courseCard}>
              <span style={courseBadge}>Dịch vụ mạng</span>
              <h3 style={courseTitle}>Managed Network Services</h3>
              <div style={courseMeta}>
                <span>• Linh hoạt</span>
                <span>• Kỹ sư hệ thống</span>
              </div>
              <button style={detailButton}>Xem chi tiết</button>
            </article>
          </div>
        </div>
      </section>

      <section style={contactSection}>
        <div style={contactContainer}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800 }}>Liên hệ học viện</h3>
            <p style={{ margin: '16px 0 0', maxWidth: 520, color: '#d1d5db' }}>
              Dãy nhà B - Cơ sở 1 Đại học Lạc Hồng.
              <br />
              Số 10 Huỳnh Văn Nghệ, phường Bửu Long, TP. Biên Hòa, tỉnh Đồng Nai.
            </p>
          </div>
          <div>
            <div style={contactItem}>
              <span>✉️</span>
              <span>cntt@lhu.edu.vn</span>
            </div>
            <div style={contactItem}>
              <span>📞</span>
              <span>(+84) 251 3 952 251</span>
            </div>
          </div>
        </div>
      </section>

      <footer style={footer}>
        <p style={{ margin: 0, fontWeight: 700 }}>Đơn vị đào tạo: Khoa Công nghệ Thông tin</p>
        <p style={footerText}>© 2025 HỌC VIỆN MẠNG LẠC HỒNG.</p>
      </footer>
    </div>
  );
};

export default App;
