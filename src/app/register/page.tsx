"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageContext";

type DutyShift = "morning" | "afternoon" | "evening";
type MemberRegistrationStatus = "pending" | "approved" | "rejected";

type MemberRegistration = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  major: string;
  interest: string;
  status: MemberRegistrationStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
};

type DutyRegistration = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  weekStart: string;
  shift: DutyShift;
  room: string;
  note: string;
  status: "pending" | "approved";
  createdAt: string;
};

export default function RegisterPage() {
  const { language, strings } = useLanguage();

  const [memberForm, setMemberForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    major: "",
    interest: "",
  });
  const [memberFilter, setMemberFilter] = useState({
    studentId: "",
    email: "",
  });
  const [memberList, setMemberList] = useState<MemberRegistration[]>([]);
  const [memberMessage, setMemberMessage] = useState("");
  const [memberError, setMemberError] = useState("");
  const [memberLoading, setMemberLoading] = useState(false);

  const [reviewKey, setReviewKey] = useState("");
  const [reviewerName, setReviewerName] = useState(language === "en" ? "Club President" : "Chủ tịch CLB");
  const [reviewMessage, setReviewMessage] = useState("");

  const memberText =
    language === "en"
      ? {
          pendingNotice: "Your registration will only become valid after review by the club president.",
          submitSuccess: "Registration submitted. Waiting for president approval.",
          submitFail: "Unable to submit registration. Please try again.",
          searchTitle: "Track member registration status",
          searchDescription: "Search by student ID or email to view current review status.",
          searchStudentId: "Search by student ID",
          searchEmail: "Search by email",
          searchButton: "Search",
          clearButton: "Clear filter",
          noData: "No member registrations found.",
          loading: "Loading registrations...",
          tableName: "Full name",
          tableStudentId: "Student ID",
          tableStatus: "Status",
          tableSubmittedAt: "Submitted at",
          tableReviewedBy: "Reviewed by",
          statusPending: "Pending president review",
          statusApproved: "Approved",
          statusRejected: "Rejected",
          reviewTitle: "President review area",
          reviewDescription: "Only the club president can approve or reject member registrations.",
          reviewKey: "President review key",
          reviewerName: "Reviewer name",
          approve: "Approve",
          reject: "Reject",
          reviewSuccess: "Review completed successfully.",
          reviewFail: "Unable to submit review. Check review key and try again.",
          studentIdInvalid: "Student ID must contain digits only.",
        }
      : {
          pendingNotice: "Đơn đăng ký chỉ có hiệu lực sau khi được Chủ tịch CLB kiểm duyệt.",
          submitSuccess: "Đăng ký đã gửi và đang chờ Chủ tịch CLB duyệt.",
          submitFail: "Không thể gửi đăng ký. Vui lòng thử lại.",
          searchTitle: "Theo dõi trạng thái đăng ký thành viên",
          searchDescription: "Tìm theo MSSV hoặc email để xem trạng thái kiểm duyệt hiện tại.",
          searchStudentId: "Tìm theo MSSV",
          searchEmail: "Tìm theo email",
          searchButton: "Tìm đăng ký",
          clearButton: "Xóa lọc",
          noData: "Chưa có đăng ký thành viên phù hợp.",
          loading: "Đang tải danh sách đăng ký...",
          tableName: "Họ tên",
          tableStudentId: "MSSV",
          tableStatus: "Trạng thái",
          tableSubmittedAt: "Ngày gửi",
          tableReviewedBy: "Người duyệt",
          statusPending: "Chờ Chủ tịch duyệt",
          statusApproved: "Đã duyệt",
          statusRejected: "Từ chối",
          reviewTitle: "Khu vực kiểm duyệt của Chủ tịch CLB",
          reviewDescription: "Chỉ Chủ tịch CLB mới được phép duyệt hoặc từ chối đơn đăng ký thành viên.",
          reviewKey: "Mã kiểm duyệt của Chủ tịch",
          reviewerName: "Tên người duyệt",
          approve: "Duyệt",
          reject: "Từ chối",
          reviewSuccess: "Đã xử lý kiểm duyệt thành công.",
          reviewFail: "Không thể gửi kiểm duyệt. Vui lòng kiểm tra mã duyệt.",
          studentIdInvalid: "Mã số sinh viên chỉ được nhập số.",
        };

  const [dutyForm, setDutyForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    weekStart: "",
    shift: "morning" as DutyShift,
    room: "Phòng Cisco C302",
    note: "",
  });

  const [dutyFilter, setDutyFilter] = useState({
    studentId: "",
    email: "",
  });

  const [dutyMessage, setDutyMessage] = useState("");
  const [dutyError, setDutyError] = useState("");
  const [dutyLoading, setDutyLoading] = useState(false);
  const [dutyList, setDutyList] = useState<DutyRegistration[]>([]);

  const dutyText =
    language === "en"
      ? {
          sectionTitle: "Weekly duty registration",
          sectionDescription:
            "Members can register weekly duty shifts and track their submitted schedules.",
          weekStart: "Week start date *",
          shift: "Duty shift *",
          room: "Duty location",
          note: "Note",
          submit: "Register duty shift",
          searchTitle: "Track registered schedules",
          searchDescription: "Filter by student ID or email to quickly find your registrations.",
          searchStudentId: "Search by student ID",
          searchEmail: "Search by email",
          searchButton: "Search",
          clearButton: "Clear filter",
          loading: "Loading schedules...",
          noData: "No duty registrations found.",
          tableName: "Full name",
          tableStudentId: "Student ID",
          tableWeek: "Week",
          tableShift: "Shift",
          tableRoom: "Location",
          tableStatus: "Status",
          tableCreatedAt: "Submitted at",
          shiftMorning: "Morning",
          shiftAfternoon: "Afternoon",
          shiftEvening: "Evening",
          statusPending: "Pending",
          statusApproved: "Approved",
          submitSuccess: "Duty registration submitted successfully.",
          submitFail: "Unable to submit duty registration. Please try again.",
          required: "Please complete all required duty schedule fields.",
          studentIdInvalid: "Student ID must contain digits only.",
        }
      : {
          sectionTitle: "Đăng ký lịch trực hàng tuần",
          sectionDescription:
            "Thành viên có thể đăng ký ca trực theo tuần và theo dõi các lịch trực đã gửi.",
          weekStart: "Ngày bắt đầu tuần *",
          shift: "Ca trực *",
          room: "Địa điểm trực",
          note: "Ghi chú",
          submit: "Đăng ký ca trực",
          searchTitle: "Theo dõi lịch trực đã đăng ký",
          searchDescription: "Lọc theo MSSV hoặc email để tìm nhanh lịch trực của bạn.",
          searchStudentId: "Tìm theo MSSV",
          searchEmail: "Tìm theo email",
          searchButton: "Tìm lịch",
          clearButton: "Xóa lọc",
          loading: "Đang tải danh sách lịch trực...",
          noData: "Chưa có lịch trực nào phù hợp.",
          tableName: "Họ tên",
          tableStudentId: "MSSV",
          tableWeek: "Tuần",
          tableShift: "Ca trực",
          tableRoom: "Địa điểm",
          tableStatus: "Trạng thái",
          tableCreatedAt: "Ngày gửi",
          shiftMorning: "Sáng",
          shiftAfternoon: "Chiều",
          shiftEvening: "Tối",
          statusPending: "Chờ duyệt",
          statusApproved: "Đã duyệt",
          submitSuccess: "Đăng ký lịch trực thành công.",
          submitFail: "Không thể đăng ký lịch trực. Vui lòng thử lại.",
          required: "Vui lòng nhập đầy đủ các trường bắt buộc của lịch trực.",
          studentIdInvalid: "Mã số sinh viên chỉ được nhập số.",
        };


  useEffect(() => {
    const saved = localStorage.getItem("clb-registration-draft");
    if (saved) {
      setMemberForm(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clb-registration-draft", JSON.stringify(memberForm));
  }, [memberForm]);

  useEffect(() => {
    const savedDutyDraft = localStorage.getItem("clb-duty-registration-draft");
    if (savedDutyDraft) {
      setDutyForm(JSON.parse(savedDutyDraft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clb-duty-registration-draft", JSON.stringify(dutyForm));
  }, [dutyForm]);

  const fetchMemberRegistrations = useCallback(async (filters?: { studentId?: string; email?: string }) => {
    setMemberLoading(true);
    setMemberError("");

    const query = new URLSearchParams({
      studentId: filters?.studentId ?? "",
      email: filters?.email ?? "",
    }).toString();

    try {
      const response = await fetch(`/api/member-registrations?${query}`);
      const data = (await response.json()) as { registrations?: MemberRegistration[] };
      setMemberList(data.registrations || []);
    } catch {
      setMemberError(memberText.submitFail);
    } finally {
      setMemberLoading(false);
    }
  }, [memberText.submitFail]);

  const fetchDutyRegistrations = useCallback(async (filters?: { studentId?: string; email?: string }) => {
    setDutyLoading(true);
    setDutyError("");

    const query = new URLSearchParams({
      studentId: filters?.studentId ?? "",
      email: filters?.email ?? "",
    }).toString();

    try {
      const response = await fetch(`/api/duty-schedule?${query}`);
      const data = (await response.json()) as { registrations?: DutyRegistration[] };
      setDutyList(data.registrations || []);
    } catch {
      setDutyError(dutyText.submitFail);
    } finally {
      setDutyLoading(false);
    }
  }, [dutyText.submitFail]);


  useEffect(() => {
    fetchMemberRegistrations();
  }, [fetchMemberRegistrations]);

  useEffect(() => {
    fetchDutyRegistrations();
  }, [fetchDutyRegistrations]);


  const handleMemberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.name === "studentId" ? e.target.value.replace(/\D/g, "") : e.target.value;

    setMemberForm({
      ...memberForm,
      [e.target.name]: value,
    });
  };

  async function handleMemberSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMemberMessage("");
    setMemberError("");

    if (
      !memberForm.fullName ||
      !memberForm.studentId ||
      !memberForm.email ||
      !memberForm.phone
    ) {
      setMemberError(strings.register.requiredMessage);
      return;
    }

    if (!/^\d+$/.test(memberForm.studentId)) {
      setMemberError(memberText.studentIdInvalid);
      return;
    }

    try {
      const response = await fetch("/api/member-registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberForm),
      });

      if (!response.ok) {
        throw new Error("submit failed");
      }

      setMemberMessage(memberText.submitSuccess);
      setMemberForm({
        fullName: "",
        studentId: "",
        email: "",
        phone: "",
        major: "",
        interest: "",
      });
      await fetchMemberRegistrations(memberFilter);
    } catch {
      setMemberError(memberText.submitFail);
    }
  }

  const shiftLabelMap: Record<DutyShift, string> = {
    morning: dutyText.shiftMorning,
    afternoon: dutyText.shiftAfternoon,
    evening: dutyText.shiftEvening,
  };

  const statusLabelMap: Record<DutyRegistration["status"], string> = {
    pending: dutyText.statusPending,
    approved: dutyText.statusApproved,
  };

  const memberStatusLabelMap: Record<MemberRegistrationStatus, string> = {
    pending: memberText.statusPending,
    approved: memberText.statusApproved,
    rejected: memberText.statusRejected,
  };

  function formatWeekRange(weekStart: string) {
    const start = new Date(weekStart);
    if (Number.isNaN(start.getTime())) {
      return weekStart;
    }

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    return `${start.toLocaleDateString(language === "en" ? "en-GB" : "vi-VN", options)} - ${end.toLocaleDateString(
      language === "en" ? "en-GB" : "vi-VN",
      options
    )}`;
  }

  function handleDutyChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const value = e.target.name === "studentId" ? e.target.value.replace(/\D/g, "") : e.target.value;

    setDutyForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  }

  async function handleDutySubmit(e: React.FormEvent) {
    e.preventDefault();
    setDutyMessage("");
    setDutyError("");

    if (!dutyForm.fullName || !dutyForm.studentId || !dutyForm.email || !dutyForm.phone || !dutyForm.weekStart || !dutyForm.shift) {
      setDutyError(dutyText.required);
      return;
    }

    if (!/^\d+$/.test(dutyForm.studentId)) {
      setDutyError(dutyText.studentIdInvalid);
      return;
    }

    try {
      const response = await fetch("/api/duty-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dutyForm),
      });

      if (!response.ok) {
        throw new Error("submit failed");
      }

      setDutyMessage(dutyText.submitSuccess);
      setDutyForm((prev) => ({
        ...prev,
        weekStart: "",
        note: "",
      }));
      await fetchDutyRegistrations(dutyFilter);
    } catch {
      setDutyError(dutyText.submitFail);
    }
  }

  function handleDutyFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDutyFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleDutySearch(e: React.FormEvent) {
    e.preventDefault();
    await fetchDutyRegistrations(dutyFilter);
  }

  async function clearDutyFilter() {
    const resetFilter = { studentId: "", email: "" };
    setDutyFilter(resetFilter);
    await fetchDutyRegistrations(resetFilter);
  }


  function handleMemberFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMemberFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleMemberSearch(e: React.FormEvent) {
    e.preventDefault();
    await fetchMemberRegistrations(memberFilter);
  }

  async function clearMemberFilter() {
    const resetFilter = { studentId: "", email: "" };
    setMemberFilter(resetFilter);
    await fetchMemberRegistrations(resetFilter);
  }

  async function handleReviewMember(id: number, action: "approve" | "reject") {
    setReviewMessage("");

    try {
      const response = await fetch("/api/member-registrations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          action,
          reviewKey,
          reviewerName,
        }),
      });

      if (!response.ok) {
        throw new Error("review failed");
      }

      setReviewMessage(memberText.reviewSuccess);
      await fetchMemberRegistrations(memberFilter);
    } catch {
      setReviewMessage(memberText.reviewFail);
    }
  }

  return (
    <div className="page-container">
      <h1>{strings.register.title}</h1>
      <p style={{ marginBottom: "20px" }}>
        {strings.register.description}
      </p>
      <p className="register-review-note">{memberText.pendingNotice}</p>

      <div className="form-container">
        <form onSubmit={handleMemberSubmit}>
          <div className="form-group">
            <label>{strings.register.fullName}</label>
            <input
              type="text"
              name="fullName"
              value={memberForm.fullName}
              onChange={handleMemberChange}
              placeholder={strings.register.placeholderName}
            />
          </div>

          <div className="form-group">
            <label>{strings.register.studentId}</label>
            <input
              type="text"
              name="studentId"
              value={memberForm.studentId}
              onChange={handleMemberChange}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={strings.register.placeholderId}
            />
          </div>

          <div className="form-group">
            <label>{strings.register.email}</label>
            <input
              type="email"
              name="email"
              value={memberForm.email}
              onChange={handleMemberChange}
              placeholder={strings.register.placeholderEmail}
            />
          </div>

          <div className="form-group">
            <label>{strings.register.phone}</label>
            <input
              type="text"
              name="phone"
              value={memberForm.phone}
              onChange={handleMemberChange}
              placeholder={strings.register.placeholderPhone}
            />
          </div>

          <div className="form-group">
            <label>{strings.register.major}</label>
            <input
              type="text"
              name="major"
              value={memberForm.major}
              onChange={handleMemberChange}
              placeholder={strings.register.placeholderMajor}
            />
          </div>

          <div className="form-group">
            <label>{strings.register.interest}</label>
            <textarea
              name="interest"
              value={memberForm.interest}
              onChange={handleMemberChange}
              placeholder={strings.register.placeholderInterest}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {strings.register.submit}
          </button>

          {memberMessage && (
            <p style={{ marginTop: "16px", color: "#0d47a1", fontWeight: "bold" }}>
              {memberMessage}
            </p>
          )}
          {memberError && <p className="duty-message error">{memberError}</p>}
        </form>
      </div>

      <section className="duty-section">
        <h2>{memberText.searchTitle}</h2>
        <p>{memberText.searchDescription}</p>

        <form className="duty-filter-form" onSubmit={handleMemberSearch}>
          <input
            name="studentId"
            value={memberFilter.studentId}
            onChange={handleMemberFilterChange}
            placeholder={memberText.searchStudentId}
          />
          <input name="email" value={memberFilter.email} onChange={handleMemberFilterChange} placeholder={memberText.searchEmail} />
          <button className="btn btn-primary" type="submit">
            {memberText.searchButton}
          </button>
          <button className="btn btn-secondary" type="button" onClick={clearMemberFilter}>
            {memberText.clearButton}
          </button>
        </form>

        <div className="duty-table-wrap">
          {memberLoading ? (
            <p>{memberText.loading}</p>
          ) : memberList.length === 0 ? (
            <p>{memberText.noData}</p>
          ) : (
            <table className="duty-table">
              <thead>
                <tr>
                  <th>{memberText.tableName}</th>
                  <th>{memberText.tableStudentId}</th>
                  <th>{memberText.tableStatus}</th>
                  <th>{memberText.tableSubmittedAt}</th>
                  <th>{memberText.tableReviewedBy}</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.fullName}</td>
                    <td>{item.studentId}</td>
                    <td>
                      <span className={`duty-status ${item.status}`}>{memberStatusLabelMap[item.status]}</span>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleString(language === "en" ? "en-GB" : "vi-VN")}</td>
                    <td>{item.reviewedBy || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="duty-section">
        <h2>{memberText.reviewTitle}</h2>
        <p>{memberText.reviewDescription}</p>

        <div className="form-container duty-form-wrap">
          <div className="duty-grid">
            <div className="form-group">
              <label>{memberText.reviewKey}</label>
              <input type="password" value={reviewKey} onChange={(event) => setReviewKey(event.target.value)} />
            </div>
            <div className="form-group">
              <label>{memberText.reviewerName}</label>
              <input value={reviewerName} onChange={(event) => setReviewerName(event.target.value)} />
            </div>
          </div>

          <div className="review-actions-grid">
            {memberList
              .filter((item) => item.status === "pending")
              .map((item) => (
                <article key={item.id} className="review-item-card">
                  <p>
                    <strong>{item.fullName}</strong> - {item.studentId}
                  </p>
                  <p>{item.email}</p>
                  <div className="review-item-buttons">
                    <button type="button" className="btn btn-primary" onClick={() => handleReviewMember(item.id, "approve")}>
                      {memberText.approve}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => handleReviewMember(item.id, "reject")}>
                      {memberText.reject}
                    </button>
                  </div>
                </article>
              ))}
          </div>

          {reviewMessage && <p className="duty-message">{reviewMessage}</p>}
        </div>
      </section>

      <section className="duty-section">
        <h2>{dutyText.sectionTitle}</h2>
        <p>{dutyText.sectionDescription}</p>

        <div className="form-container duty-form-wrap">
          <form onSubmit={handleDutySubmit}>
            <div className="duty-grid">
              <div className="form-group">
                <label>{strings.register.fullName}</label>
                <input name="fullName" value={dutyForm.fullName} onChange={handleDutyChange} placeholder={strings.register.placeholderName} />
              </div>

              <div className="form-group">
                <label>{strings.register.studentId}</label>
                <input
                  name="studentId"
                  value={dutyForm.studentId}
                  onChange={handleDutyChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={strings.register.placeholderId}
                />
              </div>

              <div className="form-group">
                <label>{strings.register.email}</label>
                <input type="email" name="email" value={dutyForm.email} onChange={handleDutyChange} placeholder={strings.register.placeholderEmail} />
              </div>

              <div className="form-group">
                <label>{strings.register.phone}</label>
                <input name="phone" value={dutyForm.phone} onChange={handleDutyChange} placeholder={strings.register.placeholderPhone} />
              </div>

              <div className="form-group">
                <label>{dutyText.weekStart}</label>
                <input type="date" name="weekStart" value={dutyForm.weekStart} onChange={handleDutyChange} />
              </div>

              <div className="form-group">
                <label>{dutyText.shift}</label>
                <select name="shift" value={dutyForm.shift} onChange={handleDutyChange}>
                  <option value="morning">{dutyText.shiftMorning}</option>
                  <option value="afternoon">{dutyText.shiftAfternoon}</option>
                  <option value="evening">{dutyText.shiftEvening}</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{dutyText.room}</label>
              <input name="room" value="Phòng Cisco C302" readOnly />
            </div>

            <div className="form-group">
              <label>{dutyText.note}</label>
              <textarea name="note" value={dutyForm.note} onChange={handleDutyChange} placeholder={strings.register.placeholderInterest} />
            </div>

            <button type="submit" className="btn btn-primary">
              {dutyText.submit}
            </button>

            {dutyMessage && <p className="duty-message success">{dutyMessage}</p>}
            {dutyError && <p className="duty-message error">{dutyError}</p>}
          </form>
        </div>
      </section>

      <section className="duty-section">
        <h2>{dutyText.searchTitle}</h2>
        <p>{dutyText.searchDescription}</p>

        <form className="duty-filter-form" onSubmit={handleDutySearch}>
          <input
            name="studentId"
            value={dutyFilter.studentId}
            onChange={handleDutyFilterChange}
            placeholder={dutyText.searchStudentId}
          />
          <input name="email" value={dutyFilter.email} onChange={handleDutyFilterChange} placeholder={dutyText.searchEmail} />

          <button className="btn btn-primary" type="submit">
            {dutyText.searchButton}
          </button>
          <button className="btn btn-secondary" type="button" onClick={clearDutyFilter}>
            {dutyText.clearButton}
          </button>
        </form>

        <div className="duty-table-wrap">
          {dutyLoading ? (
            <p>{dutyText.loading}</p>
          ) : dutyList.length === 0 ? (
            <p>{dutyText.noData}</p>
          ) : (
            <table className="duty-table">
              <thead>
                <tr>
                  <th>{dutyText.tableName}</th>
                  <th>{dutyText.tableStudentId}</th>
                  <th>{dutyText.tableWeek}</th>
                  <th>{dutyText.tableShift}</th>
                  <th>{dutyText.tableRoom}</th>
                  <th>{dutyText.tableStatus}</th>
                  <th>{dutyText.tableCreatedAt}</th>
                </tr>
              </thead>
              <tbody>
                {dutyList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.fullName}</td>
                    <td>{item.studentId}</td>
                    <td>{formatWeekRange(item.weekStart)}</td>
                    <td>{shiftLabelMap[item.shift]}</td>
                    <td>{item.room}</td>
                    <td>
                      <span className={`duty-status ${item.status}`}>{statusLabelMap[item.status]}</span>
                    </td>
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