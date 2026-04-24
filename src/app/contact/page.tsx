"use client";

import { useLanguage } from "../../components/LanguageContext";

type ContactMember = {
  id: number;
  nameVi: string;
  nameEn: string;
  roleVi: string;
  roleEn: string;
  email: string;
  hideEmailPrefix?: boolean;
  phone: string;
  status?: string;
  imageSrc: string;
  imageLink: string;
  imageAltVi: string;
  imageAltEn: string;
};

const contactMembers: ContactMember[] = [
  {
    id: 1,
    nameVi: "GV: Nguyễn Vũ Thiên Phúc",
    nameEn: "Instructor: Nguyen Vu Thien Phuc",
    roleVi: "Chủ nhiệm Học viện Mạng - CLB FITWAN",
    roleEn: "Head of Network Academy - FITWAN Club",
    email: "phucnvt@lhu.edu.vn",
    phone: "0943602479",
    imageSrc: "https://cdn.phototourl.com/free/2026-04-18-56bdccf8-9743-46a3-972b-09601ca490ce.jpg",
    imageLink: "https://cdn.phototourl.com/free/2026-04-18-56bdccf8-9743-46a3-972b-09601ca490ce.jpg",
    imageAltVi: "Giảng viên Nguyễn Vũ Thiên Phúc",
    imageAltEn: "Instructor Nguyen Vu Thien Phuc",
  },
  {
    id: 2,
    nameVi: "SV: Trần Đăng Khoa",
    nameEn: "Student: Tran Dang Khoa",
    roleVi: "Phó phòng Cisco - Học viện mạng",
    roleEn: "Vice Head of Cisco Division - Network Academy",
    email: "Khóa: 22",
    hideEmailPrefix: true,
    phone: "",
    status: "Trạng thái: đã tốt nghiệp",
    imageSrc: "https://cdn.phototourl.com/free/2026-04-18-a394bffe-76b6-4163-9c37-3d91eb9d0b9c.jpg",
    imageLink: "https://cdn.phototourl.com/free/2026-04-18-a394bffe-76b6-4163-9c37-3d91eb9d0b9c.jpg",
    imageAltVi: "Sinh viên Trần Đăng Khoa",
    imageAltEn: "Student Tran Dang Khoa",
  },
  {
    id: 3,
    nameVi: "SV: Lê Ngọc Anh",
    nameEn: "Student: Le Ngoc Anh",
    roleVi: "Trưởng ban truyền thông CLB FITWAN",
    roleEn: "Head of Communications - FITWAN Club",
    email: "anhlng.fitwan@lhu.edu.vn",
    phone: "0917456789",
    imageSrc: "https://randomuser.me/api/portraits/women/44.jpg",
    imageLink: "https://randomuser.me/api/portraits/women/44.jpg",
    imageAltVi: "Sinh viên Lê Ngọc Anh",
    imageAltEn: "Student Le Ngoc Anh",
  },
];

export default function ContactPage() {
  const { language, strings } = useLanguage();

  const memberSectionText =
    language === "en"
      ? {
          title: "Member profiles",
          emailPrefix: "Email",
          phonePrefix: "Phone",
        }
      : {
          title: "Giới thiệu thành viên",
          emailPrefix: "Mail",
          phonePrefix: "Sdt",
        };

  return (
    <div className="page-container">
      <h1>{strings.contact.title}</h1>

      {(() => {
        const [firstMember, ...remainingMembers] = contactMembers;

        const renderMemberCard = (member: ContactMember) => {
          const displayName = language === "en" ? member.nameEn : member.nameVi;
          const displayRole = language === "en" ? member.roleEn : member.roleVi;
          const displayAlt = language === "en" ? member.imageAltEn : member.imageAltVi;

          return (
            <section className="contact-mentor-card" key={member.id}>
              <div className="contact-mentor-visual">
                <a href={member.imageLink} target="_blank" rel="noreferrer" className="contact-mentor-image-link" aria-label={displayAlt}>
                  <div className="contact-mentor-avatar-shell">
                    <img src={member.imageSrc} alt={displayAlt} className="contact-mentor-avatar" />
                  </div>
                </a>
              </div>

              <div className="contact-mentor-info">
                <h2>{displayName}</h2>
                <p>{displayRole}</p>
                <p>{member.hideEmailPrefix ? member.email : `${memberSectionText.emailPrefix}: ${member.email}`}</p>
                {member.phone ? (
                  <p>
                    {memberSectionText.phonePrefix}: {member.phone}
                  </p>
                ) : null}
                {member.status ? <p>{member.status}</p> : null}
              </div>
            </section>
          );
        };

        return (
          <>
            {firstMember ? <div className="contact-members-list">{renderMemberCard(firstMember)}</div> : null}

            <h2>{memberSectionText.title}</h2>

            <div className="contact-members-list">
              {remainingMembers.map((member) => renderMemberCard(member))}
            </div>
          </>
        );
      })()}

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
    </div>
  );
}