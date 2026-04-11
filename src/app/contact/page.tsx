"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageContext";

type MemberIntro = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  intro: string;
  createdAt: string;
};

export default function ContactPage() {
  const { language, strings } = useLanguage();
  const mentorImageLink = "https://drive.google.com/file/d/16aHmnLgIIotnmFzyjo_D25FagPwVFshx/view?usp=drive_link";
  const mentorImageSrc = "https://drive.google.com/uc?export=view&id=16aHmnLgIIotnmFzyjo_D25FagPwVFshx";

  const [introForm, setIntroForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    intro: "",
  });
  const [introFilter, setIntroFilter] = useState({
    studentId: "",
    email: "",
  });
  const [introList, setIntroList] = useState<MemberIntro[]>([]);
  const [introMessage, setIntroMessage] = useState("");
  const [introError, setIntroError] = useState("");
  const [introLoading, setIntroLoading] = useState(false);

  const introText =
    language === "en"
      ? {
          sectionTitle: "Member introduction",
          sectionDescription: "Submit your short profile as a dedicated section on the contact page.",
          intro: "Member introduction *",
          submit: "Submit introduction",
          submitSuccess: "Member introduction submitted successfully.",
          submitFail: "Unable to submit member introduction. Please try again.",
          required: "Please complete all required member introduction fields.",
          studentIdInvalid: "Student ID must contain digits only.",
          searchTitle: "Track member introductions",
          searchDescription: "Search by student ID or email to view submitted introductions.",
          searchStudentId: "Search by student ID",
          searchEmail: "Search by email",
          searchButton: "Search",
          clearButton: "Clear filter",
          loading: "Loading introductions...",
          noData: "No introductions found.",
          tableName: "Full name",
          tableStudentId: "Student ID",
          tableIntro: "Introduction",
          tableCreatedAt: "Submitted at",
        }
      : {
          sectionTitle: "Giới thiệu thành viên",
          sectionDescription: "Gửi phần giới thiệu cá nhân tại trang Liên hệ.",
          intro: "Giới thiệu thành viên *",
          submit: "Gửi giới thiệu",
          submitSuccess: "Đã gửi giới thiệu thành viên thành công.",
          submitFail: "Không thể gửi giới thiệu thành viên. Vui lòng thử lại.",
          required: "Vui lòng nhập đầy đủ các trường bắt buộc của giới thiệu thành viên.",
          studentIdInvalid: "Mã số sinh viên chỉ được nhập số.",
          searchTitle: "Theo dõi giới thiệu thành viên",
          searchDescription: "Tìm theo MSSV hoặc email để xem phần giới thiệu đã gửi.",
          searchStudentId: "Tìm theo MSSV",
          searchEmail: "Tìm theo email",
          searchButton: "Tìm giới thiệu",
          clearButton: "Xóa lọc",
          loading: "Đang tải phần giới thiệu...",
          noData: "Chưa có giới thiệu thành viên phù hợp.",
          tableName: "Họ tên",
          tableStudentId: "MSSV",
          tableIntro: "Giới thiệu",
          tableCreatedAt: "Ngày gửi",
        };

  const fetchMemberIntros = useCallback(async (filters?: { studentId?: string; email?: string }) => {
    setIntroLoading(true);
    setIntroError("");

    const query = new URLSearchParams({
      studentId: filters?.studentId ?? "",
      email: filters?.email ?? "",
    }).toString();

    try {
      const response = await fetch(`/api/member-intros?${query}`);
      const data = (await response.json()) as { intros?: MemberIntro[] };
      setIntroList(data.intros || []);
    } catch {
      setIntroError(introText.submitFail);
    } finally {
      setIntroLoading(false);
    }
  }, [introText.submitFail]);

  useEffect(() => {
    fetchMemberIntros();
  }, [fetchMemberIntros]);

  function handleIntroChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.name === "studentId" ? e.target.value.replace(/\D/g, "") : e.target.value;
    setIntroForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  }

  async function handleIntroSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIntroMessage("");
    setIntroError("");

    if (!introForm.fullName || !introForm.studentId || !introForm.email || !introForm.intro) {
      setIntroError(introText.required);
      return;
    }

    if (!/^\d+$/.test(introForm.studentId)) {
      setIntroError(introText.studentIdInvalid);
      return;
    }

    try {
      const response = await fetch("/api/member-intros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(introForm),
      });

      if (!response.ok) {
        throw new Error("submit intro failed");
      }

      setIntroMessage(introText.submitSuccess);
      setIntroForm({
        fullName: "",
        studentId: "",
        email: "",
        intro: "",
      });
      await fetchMemberIntros(introFilter);
    } catch {
      setIntroError(introText.submitFail);
    }
  }

  function handleIntroFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIntroFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleIntroSearch(e: React.FormEvent) {
    e.preventDefault();
    await fetchMemberIntros(introFilter);
  }

  async function clearIntroFilter() {
    const resetFilter = { studentId: "", email: "" };
    setIntroFilter(resetFilter);
    await fetchMemberIntros(resetFilter);
  }

  return (
    <div className="page-container">
      <h1>{strings.contact.title}</h1>

      <section className="contact-mentor-card">
        <div className="contact-mentor-visual">
          <a href={mentorImageLink} target="_blank" rel="noreferrer" className="contact-mentor-image-link" aria-label="Giảng viên Nguyễn Vũ Thiên Phúc">
            <div className="contact-mentor-avatar-shell">
              <img src={mentorImageSrc} alt="GV Nguyễn Vũ Thiên Phúc" className="contact-mentor-avatar" />
            </div>
          </a>
        </div>

        <div className="contact-mentor-info">
          <h2>Gv: Nguyễn Vũ Thiên Phúc</h2>
          <p>Chủ nhiệm Học viện Mạng - Clb Fitwan</p>
          <p>Mail: phucnvt@lhu.edu.vn</p>
          <p>Sdt: 0943602479</p>
        </div>
      </section>

      <p>{strings.contact.description}</p>

      <h2>{strings.contact.infoTitle}</h2>
      <ul>
        <li>{strings.contact.email}</li>
        <li>{strings.contact.phone}</li>
        <li>{strings.contact.address}</li>
      </ul>

      <h2>{strings.contact.socialTitle}</h2>
      <ul>
        <li>{strings.contact.facebook}</li>
        <li>{strings.contact.instagram}</li>
        <li>{strings.contact.zalo}</li>
      </ul>

      <section className="duty-section">
        <h2>{introText.sectionTitle}</h2>
        <p>{introText.sectionDescription}</p>

        <div className="form-container duty-form-wrap">
          <form onSubmit={handleIntroSubmit}>
            <div className="duty-grid">
              <div className="form-group">
                <label>{strings.register.fullName}</label>
                <input name="fullName" value={introForm.fullName} onChange={handleIntroChange} placeholder={strings.register.placeholderName} />
              </div>

              <div className="form-group">
                <label>{strings.register.studentId}</label>
                <input
                  name="studentId"
                  value={introForm.studentId}
                  onChange={handleIntroChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={strings.register.placeholderId}
                />
              </div>

              <div className="form-group">
                <label>{strings.register.email}</label>
                <input type="email" name="email" value={introForm.email} onChange={handleIntroChange} placeholder={strings.register.placeholderEmail} />
              </div>
            </div>

            <div className="form-group">
              <label>{introText.intro}</label>
              <textarea name="intro" value={introForm.intro} onChange={handleIntroChange} placeholder={strings.register.placeholderInterest} />
            </div>

            <button type="submit" className="btn btn-primary">
              {introText.submit}
            </button>

            {introMessage && <p className="duty-message success">{introMessage}</p>}
            {introError && <p className="duty-message error">{introError}</p>}
          </form>
        </div>
      </section>

      <section className="duty-section">
        <h2>{introText.searchTitle}</h2>
        <p>{introText.searchDescription}</p>

        <form className="duty-filter-form" onSubmit={handleIntroSearch}>
          <input
            name="studentId"
            value={introFilter.studentId}
            onChange={handleIntroFilterChange}
            placeholder={introText.searchStudentId}
          />
          <input name="email" value={introFilter.email} onChange={handleIntroFilterChange} placeholder={introText.searchEmail} />
          <button className="btn btn-primary" type="submit">
            {introText.searchButton}
          </button>
          <button className="btn btn-secondary" type="button" onClick={clearIntroFilter}>
            {introText.clearButton}
          </button>
        </form>

        <div className="duty-table-wrap">
          {introLoading ? (
            <p>{introText.loading}</p>
          ) : introList.length === 0 ? (
            <p>{introText.noData}</p>
          ) : (
            <table className="duty-table">
              <thead>
                <tr>
                  <th>{introText.tableName}</th>
                  <th>{introText.tableStudentId}</th>
                  <th>{introText.tableIntro}</th>
                  <th>{introText.tableCreatedAt}</th>
                </tr>
              </thead>
              <tbody>
                {introList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.fullName}</td>
                    <td>{item.studentId}</td>
                    <td>{item.intro}</td>
                    <td>{new Date(item.createdAt).toLocaleString(language === "en" ? "en-GB" : "vi-VN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}