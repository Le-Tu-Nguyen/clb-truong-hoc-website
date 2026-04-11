import { NextRequest, NextResponse } from "next/server";

type DutyShift = "morning" | "afternoon" | "evening";

type DutyRegistration = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  weekStart: string;
  shift: DutyShift;
  room: string;
  note: string;
  status: "pending" | "approved";
  createdAt: string;
};

type DutyPayload = Omit<DutyRegistration, "id" | "status" | "createdAt">;

const registrations: DutyRegistration[] = [];

function isValidShift(value: string): value is DutyShift {
  return value === "morning" || value === "afternoon" || value === "evening";
}

function validatePayload(payload: Partial<DutyPayload>) {
  if (!payload.fullName || !payload.studentId || !payload.email || !payload.phone || !payload.weekStart || !payload.shift) {
    return "Missing required fields.";
  }

  if (!/^\d+$/.test(payload.studentId.trim())) {
    return "Student ID must contain digits only.";
  }

  if (!isValidShift(payload.shift)) {
    return "Invalid shift value.";
  }

  return "";
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get("studentId")?.trim().toLowerCase() || "";
  const email = url.searchParams.get("email")?.trim().toLowerCase() || "";

  const filtered = registrations.filter((item) => {
    const matchStudentId = !studentId || item.studentId.toLowerCase().includes(studentId);
    const matchEmail = !email || item.email.toLowerCase().includes(email);
    return matchStudentId && matchEmail;
  });

  return NextResponse.json({ registrations: filtered });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Partial<DutyPayload>;
  const validationError = validatePayload(payload);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const newRegistration: DutyRegistration = {
    id: registrations.length + 1,
    fullName: payload.fullName!.trim(),
    studentId: payload.studentId!.trim(),
    email: payload.email!.trim(),
    phone: payload.phone!.trim(),
    weekStart: payload.weekStart!,
    shift: payload.shift!,
    room: "Phòng Cisco C302",
    note: payload.note?.trim() || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  registrations.unshift(newRegistration);

  return NextResponse.json({
    message: "Duty registration created successfully.",
    registration: newRegistration,
  });
}
