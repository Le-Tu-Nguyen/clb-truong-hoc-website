"use client";

import { useEffect, useState } from "react";
import { Card, Col, Progress, Row, Statistic, Table } from "antd";

type Stats = {
  totalMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  topCategory: string;
  activeTeams: number;
};

const columns = [
  { title: "Chỉ số", dataIndex: "key", key: "key" },
  { title: "Giá trị", dataIndex: "value", key: "value" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats))
      .finally(() => setLoading(false));
  }, []);

  const dataSource = stats
    ? [
        { key: "Thành viên CLB", value: stats.totalMembers },
        { key: "Tổng sự kiện", value: stats.totalEvents },
        { key: "Sự kiện sắp tới", value: stats.upcomingEvents },
        { key: "Danh mục hot", value: stats.topCategory },
        { key: "Nhóm đang hoạt động", value: stats.activeTeams },
      ]
    : [];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <header className="mb-10 border-l-8 border-blue-600 pl-6">
        <h1 className="text-4xl font-black uppercase italic">Dashboard thống kê</h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">Tổng quan hiệu suất CLB với dữ liệu động API.</p>
      </header>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card loading={loading} bordered>
            <Statistic title="Thành viên" value={stats?.totalMembers ?? 0} />
            <Progress percent={Math.min(((stats?.totalMembers ?? 0) / 500) * 100, 100)} status="active" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card loading={loading} bordered>
            <Statistic title="Sự kiện" value={stats?.totalEvents ?? 0} />
            <Progress percent={Math.min(((stats?.totalEvents ?? 0) / 30) * 100, 100)} status="active" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card loading={loading} bordered>
            <Statistic title="Sắp tới" value={stats?.upcomingEvents ?? 0} />
            <Progress percent={Math.min(((stats?.upcomingEvents ?? 0) / 10) * 100, 100)} status="active" />
          </Card>
        </Col>
      </Row>

      <section className="mt-8 bg-white dark:bg-zinc-900/70 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 shadow-sm transition-all duration-300">
        <Table rowKey="key" loading={loading} columns={columns} dataSource={dataSource} pagination={false} />
      </section>
    </div>
  );
}
