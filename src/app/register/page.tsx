"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    major: "",
    interest: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("clb-registration-draft");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clb-registration-draft", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.studentId ||
      !formData.email ||
      !formData.phone
    ) {
      setMessage("Vui lòng nhập đầy đủ các trường bắt buộc.");
      return;
    }

    setMessage("Đăng ký thành công! CLB sẽ liên hệ với bạn sớm.");
    setFormData({
      fullName: "",
      studentId: "",
      email: "",
      phone: "",
      major: "",
      interest: "",
    });
  };

  return (
    <div className="page-container">
      <h1>Đăng ký thành viên CLB</h1>
      <p style={{ marginBottom: "20px" }}>
        Vui lòng điền đầy đủ thông tin để đăng ký tham gia CLB.
      </p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="form-group">
            <label>Mã số sinh viên *</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Nhập MSSV"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="form-group">
            <label>Ngành học</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="Ví dụ: Công nghệ thông tin"
            />
          </div>

          <div className="form-group">
            <label>Lý do muốn tham gia CLB</label>
            <textarea
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="Chia sẻ ngắn về mong muốn của bạn"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Gửi đăng ký
          </button>

          {message && (
            <p style={{ marginTop: "16px", color: "#0d47a1", fontWeight: "bold" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}