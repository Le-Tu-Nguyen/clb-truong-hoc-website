type EventCardProps = {
  title: string;
  date: string;
  location: string;
  description: string;
};

export default function EventCard({
  title,
  date,
  location,
  description,
}: EventCardProps) {
  return (
    <div className="event-card">
      <h3>{title}</h3>
      <p><strong>Thời gian:</strong> {date}</p>
      <p><strong>Địa điểm:</strong> {location}</p>
      <p>{description}</p>
    </div>
  );
}