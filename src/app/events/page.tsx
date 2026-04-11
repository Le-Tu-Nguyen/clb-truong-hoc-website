"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Input, Select, Skeleton, Empty, Space } from "antd";
import EventCard from "../../components/EventCard";

const eventTypes = [
  { value: "", label: "Tất cả" },
  { value: "workshop", label: "Workshop" },
  { value: "hackathon", label: "Hackathon" },
  { value: "social", label: "Giao lưu" },
  { value: "volunteer", label: "Tình nguyện" },
  { value: "training", label: "Đào tạo" },
];

type EventItem = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  tag: string;
  type: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedFilter = localStorage.getItem("clb-events-filter") || "";
    const savedSearch = localStorage.getItem("clb-events-search") || "";
    setFilter(savedFilter);
    setSearch(savedSearch);
  }, []);

  useEffect(() => {
    localStorage.setItem("clb-events-filter", filter);
    localStorage.setItem("clb-events-search", search);

    setLoading(true);
    const query = new URLSearchParams({ type: filter, search }).toString();

    fetch(`/api/events?${query}`)
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []))
      .finally(() => setLoading(false));
  }, [filter, search]);

  const hasNoEvents = !loading && events.length === 0;

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <section className="mb-8 p-4 bg-white dark:bg-zinc-900/70 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-sm transition-all duration-300">
        <Space wrap>
          <Select
            value={filter}
            onChange={(value) => setFilter(value)}
            options={eventTypes}
            style={{ width: 160 }}
            placeholder="Lọc loại sự kiện"
          />
          <Input.Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm sự kiện"
            allowClear
            style={{ width: 360 }}
            enterButton
          />
        </Space>
      </section>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} active paragraph={{ rows: 5 }} />
          ))}
        </div>
      ) : hasNoEvents ? (
        <Empty description="Không tìm thấy sự kiện phù hợp" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} title={event.title} date={event.date} location={event.location} description={event.description} />
          ))}
        </div>
      )}
    </div>
  );
}
