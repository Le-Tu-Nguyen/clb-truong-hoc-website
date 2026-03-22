import { NextResponse } from "next/server";

export async function GET() {
  const stats = {
    totalMembers: 320,
    totalEvents: 23,
    upcomingEvents: 4,
    topCategory: "Kỹ thuật",
    activeTeams: 7,
  };

  return NextResponse.json({ stats });
}
