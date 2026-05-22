"use client";

import Image from "next/image";
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
    phone: "0943602***",
    imageSrc: "https://cdn.phototourl.com/free/2026-05-21-045cef44-5c18-4a46-8644-9181d2d42b48.png",
    imageLink: "https://cdn.phototourl.com/free/2026-05-21-045cef44-5c18-4a46-8644-9181d2d42b48.png",
    imageAltVi: "Giảng viên Nguyễn Vũ Thiên Phúc",
    imageAltEn: "Instructor Nguyen Vu Thien Phuc",
  },
  {
    id: 2,
    nameVi: "SV: Trần Đăng Khoa",
    nameEn: "Student: Tran Dang Khoa",
    roleVi: "Phó chủ nhiệm Học viện mạng - CLB FITWAN",
    roleEn: "Vice Head of Network Academy - FITWAN Club",
    email: "KhoaTran.FitWan@LHU.edu.vn",
    phone: "0347333***",
    imageSrc: "https://cdn.phototourl.com/free/2026-05-21-4c6b4d30-1c06-4dc1-b719-b7914facc199.png",
    imageLink: "https://cdn.phototourl.com/free/2026-05-21-4c6b4d30-1c06-4dc1-b719-b7914facc199.png",
    imageAltVi: "Sinh viên Trần Đăng Khoa",
    imageAltEn: "Student Tran Dang Khoa",
  },
  {
    id: 3,
    nameVi: "SV: Lê Tú Nguyên",
    nameEn: "Student: Le Tu Nguyen",
    roleVi: "Trưởng ban truyền thông CLB FITWAN",
    roleEn: "Head of Communications - FITWAN Club",
    email: "NguyenLT.FitWan@LHU.edu.vn",
    phone: "0359663***",
    imageSrc: "https://cdn.phototourl.com/free/2026-05-21-74e02feb-e484-4ed1-ae78-74965f987048.png",
    imageLink: "https://cdn.phototourl.com/free/2026-05-21-74e02feb-e484-4ed1-ae78-74965f987048.png",
    imageAltVi: "Sinh viên Lê Tú Nguyên",
    imageAltEn: "Student Le Tu Nguyen",
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
                    <Image src={member.imageSrc} alt={displayAlt} className="contact-mentor-avatar" width={240} height={240} />
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