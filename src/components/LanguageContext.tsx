"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "vi" | "en";

type Translations = typeof translations.vi;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  strings: Translations;
};

const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      events: "Sự kiện",
      dashboard: "Dashboard",
      contact: "Liên hệ",
      register: "Tham gia ngay",
      themeDefault: "Theme mặc định",
      themeSunset: "Theme Sunset",
      themeForest: "Theme Forest",
      language: "Ngôn ngữ",
      vietnamese: "Tiếng Việt",
      english: "English",
    },
    hero: {
      badge: "FITWAN",
      title: "FITWAN - Cisco Networking Club Đại học Lạc Hồng",
      subtitle: "Nơi kết nối sinh viên yêu thích mạng Cisco, an ninh mạng và kỹ năng hệ thống.",
      ctaEvents: "Xem sự kiện",
      ctaRegister: "Tham gia CLB",
    },
    home: {
      introTitle: "Giới thiệu sơ lược về FITWAN",
      introText:
        "FITWAN là phòng mạng Cisco tại Đại học Lạc Hồng, nơi sinh viên cùng học hỏi về mạng máy tính, an ninh mạng và trao đổi kinh nghiệm thực tế.",
      highlightTitle: "Hoạt động nổi bật",
      exploreTitle: "Khám phá thêm",
      exploreAbout: "Giới thiệu CLB",
      exploreEvents: "Xem tất cả sự kiện",
      exploreContact: "Liên hệ CLB",
      featuredEvents: [
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
      ],
    },
    about: {
      title: "Về CLB FITWAN",
      subtitle: "Tìm hiểu thêm về lịch sử, tầm nhìn và sứ mệnh của chúng tôi",
      missionTitle: "Sứ mệnh của chúng tôi",
      missionParagraph1:
        "FITWAN được thành lập với mục đích kết nối sinh viên, tạo môi trường học hỏi và phát triển kỹ năng trong một cộng đồng sáng tạo và hỗ trợ.",
      missionParagraph2:
        "Chúng tôi tin rằng sự hợp tác, trao đổi kiến thức và đam mê là chìa khóa để đạt được những thành tựu lớn.",
      valuesTitle: "Giá trị cơ bản",
      values: [
        "Kết nối",
        "Phát triển",
        "Sáng tạo",
        "Cộng đồng",
      ],
    },
    contact: {
      title: "Liên hệ CLB",
      description:
        "Nếu bạn cần thêm thông tin hoặc muốn hợp tác cùng CLB, vui lòng liên hệ qua các kênh dưới đây.",
      infoTitle: "Thông tin liên hệ",
      email: "Email: clbtruonghoc@example.com",
      phone: "Số điện thoại: 0123 456 789",
      address: "Địa chỉ: Khuôn viên Trường Đại học, Tòa nhà Sinh viên",
      socialTitle: "Mạng xã hội",
      facebook: "Facebook: fb.com/clbtruonghoc",
      instagram: "Instagram: instagram.com/clbtruonghoc",
      zalo: "Zalo OA: CLB Trường Học",
    },
    events: {
      headerTitle: "Sự kiện nổi bật",
      headerSubtitle: "Đừng bỏ lỡ các hoạt động hấp dẫn sắp tới",
      all: "Tất cả",
      workshop: "Workshop",
      hackathon: "Hackathon",
      social: "Giao lưu",
      volunteer: "Tình nguyện",
      training: "Đào tạo",
      filterPlaceholder: "Lọc loại sự kiện",
      searchPlaceholder: "Tìm kiếm sự kiện",
      noEvents: "Không tìm thấy sự kiện phù hợp",
    },
    dashboard: {
      headerTitle: "Dashboard thống kê",
      headerSubtitle: "Tổng quan hiệu suất CLB với dữ liệu động API.",
      members: "Thành viên",
      events: "Sự kiện",
      upcoming: "Sắp tới",
      table: {
        indicator: "Chỉ số",
        value: "Giá trị",
      },
      stats: {
        members: "Thành viên CLB",
        totalEvents: "Tổng sự kiện",
        upcomingEvents: "Sự kiện sắp tới",
        topCategory: "Danh mục hot",
        activeTeams: "Nhóm đang hoạt động",
      },
    },
    register: {
      title: "Đăng ký thành viên CLB",
      description: "Vui lòng điền đầy đủ thông tin để đăng ký tham gia CLB.",
      fullName: "Họ và tên *",
      studentId: "Mã số sinh viên *",
      email: "Email *",
      phone: "Số điện thoại *",
      major: "Ngành học",
      interest: "Lý do muốn tham gia CLB",
      placeholderName: "Nhập họ và tên",
      placeholderId: "Nhập MSSV",
      placeholderEmail: "Nhập email",
      placeholderPhone: "Nhập số điện thoại",
      placeholderMajor: "Ví dụ: Công nghệ thông tin",
      placeholderInterest: "Chia sẻ ngắn về mong muốn của bạn",
      submit: "Gửi đăng ký",
      requiredMessage: "Vui lòng nhập đầy đủ các trường bắt buộc.",
      successMessage: "Đăng ký thành công! CLB sẽ liên hệ với bạn sớm.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      events: "Events",
      dashboard: "Dashboard",
      contact: "Contact",
      register: "Join now",
      themeDefault: "Default theme",
      themeSunset: "Sunset theme",
      themeForest: "Forest theme",
      language: "Language",
      vietnamese: "Vietnamese",
      english: "English",
    },
    hero: {
      badge: "FITWAN",
      title: "FITWAN - Cisco Networking Club - Lac Hong University",
      subtitle: "Connecting students who love Cisco networking, cybersecurity, and systems skills.",
      ctaEvents: "See events",
      ctaRegister: "Join the club",
    },
    home: {
      introTitle: "About FITWAN",
      introText:
        "FITWAN is the Cisco networking club at Lac Hong University, where students learn about computer networks, cybersecurity, and share practical experience.",
      highlightTitle: "Featured activities",
      exploreTitle: "Explore more",
      exploreAbout: "About the club",
      exploreEvents: "See all events",
      exploreContact: "Contact the club",
      featuredEvents: [
        {
          title: "Soft Skills Workshop",
          date: "25/03/2026 - 18:00",
          location: "Hall A",
          description: "Share communication, teamwork, and presentation skills.",
        },
        {
          title: "Member Connection Day",
          date: "30/03/2026 - 08:00",
          location: "Campus grounds",
          description: "Networking activities connecting new members and club leaders.",
        },
        {
          title: "Weekend Volunteer",
          date: "05/04/2026 - 07:00",
          location: "Social protection center",
          description: "Join the club in volunteer work for the community.",
        },
      ],
    },
    about: {
      title: "About FITWAN",
      subtitle: "Learn more about our history, vision and mission.",
      missionTitle: "Our mission",
      missionParagraph1:
        "FITWAN was founded to connect students, provide a learning environment, and develop skills within a creative and supportive community.",
      missionParagraph2:
        "We believe collaboration, knowledge sharing, and passion are the keys to achieving great accomplishments.",
      valuesTitle: "Core values",
      values: ["Connection", "Growth", "Innovation", "Community"],
    },
    contact: {
      title: "Contact the club",
      description:
        "If you need more information or want to collaborate with the club, please reach out through the channels below.",
      infoTitle: "Contact information",
      email: "Email: clbtruonghoc@example.com",
      phone: "Phone: 0123 456 789",
      address: "Address: University campus, Student building",
      socialTitle: "Social media",
      facebook: "Facebook: fb.com/clbtruonghoc",
      instagram: "Instagram: instagram.com/clbtruonghoc",
      zalo: "Zalo OA: CLB Trường Học",
    },
    events: {
      headerTitle: "Featured events",
      headerSubtitle: "Don’t miss the exciting activities ahead.",
      all: "All",
      workshop: "Workshop",
      hackathon: "Hackathon",
      social: "Networking",
      volunteer: "Volunteer",
      training: "Training",
      filterPlaceholder: "Filter event type",
      searchPlaceholder: "Search events",
      noEvents: "No matching events found",
    },
    dashboard: {
      headerTitle: "Statistics dashboard",
      headerSubtitle: "Overview of club performance with dynamic API data.",
      members: "Members",
      events: "Events",
      upcoming: "Upcoming",
      table: {
        indicator: "Indicator",
        value: "Value",
      },
      stats: {
        members: "Club members",
        totalEvents: "Total events",
        upcomingEvents: "Upcoming events",
        topCategory: "Top category",
        activeTeams: "Active teams",
      },
    },
    register: {
      title: "Club registration",
      description: "Please complete the information to join the club.",
      fullName: "Full name *",
      studentId: "Student ID *",
      email: "Email *",
      phone: "Phone *",
      major: "Major",
      interest: "Why you want to join",
      placeholderName: "Enter your full name",
      placeholderId: "Enter student ID",
      placeholderEmail: "Enter email",
      placeholderPhone: "Enter phone number",
      placeholderMajor: "e.g. Computer Science",
      placeholderInterest: "Share briefly why you want to join",
      submit: "Submit registration",
      requiredMessage: "Please complete all required fields.",
      successMessage: "Registration successful! The club will contact you soon.",
    },
  },
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "vi",
  setLanguage: () => {},
  strings: translations.vi,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "vi";
    }
    const savedLanguage = localStorage.getItem("clb-language");
    return savedLanguage === "en" ? "en" : "vi";
  });

  useEffect(() => {
    localStorage.setItem("clb-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, strings: language === "en" ? translations.en : translations.vi }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
