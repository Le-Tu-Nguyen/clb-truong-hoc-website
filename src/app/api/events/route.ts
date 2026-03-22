import { NextRequest, NextResponse } from "next/server";

const EVENTS = [
  { id: 1, title: "Workshop: Lập trình Next.js nâng cao", date: "2026-03-25", location: "Phòng LAB 402", tag: "Kỹ thuật", type: "workshop", description: "Học cách xây dựng ứng dụng Next.js fullstack với TypeScript." },
  { id: 2, title: "Hackathon 24h: Giải pháp cho Nông nghiệp", date: "2026-04-10", location: "Hội trường lớn", tag: "Thi đấu", type: "hackathon", description: "Cạnh tranh giải pháp công nghệ với đội nhóm sinh viên." },
  { id: 3, title: "Ngày hội Kết nối Thành viên", date: "2026-03-30", location: "Sân trường", tag: "Giao lưu", type: "social", description: "Hoạt động giao lưu, kết nối giữa thành viên mới và ban điều hành." },
  { id: 4, title: "Tình nguyện cuối tuần", date: "2026-04-05", location: "Trung tâm bảo trợ xã hội", tag: "Tình nguyện", type: "volunteer", description: "Tham gia hoạt động thiện nguyện vì cộng đồng." },
  { id: 5, title: "Đào tạo kỹ năng mềm", date: "2026-04-15", location: "Phòng seminar", tag: "Phát triển", type: "training", description: "Rèn luyện giao tiếp, lãnh đạo và teamwork." },
];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type")?.toLowerCase() || "";
  const search = url.searchParams.get("search")?.toLowerCase() || "";

  const filtered = EVENTS.filter((event) => {
    const matchType = !type || event.type === type;
    const matchSearch = !search || event.title.toLowerCase().includes(search) || event.description.toLowerCase().includes(search);
    return matchType && matchSearch;
  });

  return NextResponse.json({ events: filtered });
}
