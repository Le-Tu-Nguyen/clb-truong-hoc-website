export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <header className="mb-12 border-l-8 border-blue-600 pl-6">
        <h1 className="text-4xl font-black uppercase italic">Về CLB Trường Học</h1>
        <p className="text-gray-500 mt-2">Tìm hiểu thêm về lịch sử, tầm nhìn và sứ mệnh của chúng tôi</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Sứ mệnh của chúng tôi</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            CLB Trường Học được thành lập với mục đích kết nối sinh viên, tạo môi trường học hỏi và phát triển kỹ năng trong một cộng đồng sáng tạo và hỗ trợ.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi tin rằng sự hợp tác, trao đổi kiến thức và đam mê là chìa khóa để đạt được những thành tựu lớn.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Giá trị cơ bản</h2>
          <ul className="space-y-3 text-gray-600">
            <li>✓ <strong>Kết nối:</strong> Xây dựng mạng lưới mạnh mẽ giữa các thành viên</li>
            <li>✓ <strong>Phát triển:</strong> Nâng cao kỹ năng và kiến thức chuyên môn</li>
            <li>✓ <strong>Sáng tạo:</strong> Khuyến khích ý tưởng mới và giải pháp đổi mới</li>
            <li>✓ <strong>Cộng đồng:</strong> Đóng góp tích cực cho xã hội</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
