import { NextRequest, NextResponse } from "next/server";

type MemberRegistrationStatus = "pending" | "approved" | "rejected";

type MemberRegistration = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  major: string;
  interest: string;
  status: MemberRegistrationStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
};

type MemberPayload = Omit<MemberRegistration, "id" | "status" | "createdAt" | "reviewedAt" | "reviewedBy">;

const registrations: MemberRegistration[] = [];
const PRESIDENT_REVIEW_KEY = process.env.PRESIDENT_REVIEW_KEY || "P@Cisco@lhu";

function validatePayload(payload: Partial<MemberPayload>) {
  if (!payload.fullName || !payload.studentId || !payload.email || !payload.phone) {
    return "Missing required fields.";
  }

  if (!/^\d+$/.test(payload.studentId.trim())) {
    return "Student ID must contain digits only.";
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
  const payload = (await request.json()) as Partial<MemberPayload>;
  const validationError = validatePayload(payload);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const newRegistration: MemberRegistration = {
    id: registrations.length + 1,
    fullName: payload.fullName!.trim(),
    studentId: payload.studentId!.trim(),
    email: payload.email!.trim(),
    phone: payload.phone!.trim(),
    major: payload.major?.trim() || "",
    interest: payload.interest?.trim() || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  registrations.unshift(newRegistration);

  return NextResponse.json(
    {
      message: "Member registration submitted and pending president approval.",
      registration: newRegistration,
    },
    { status: 201 }
  );
}

export async function PATCH(request: NextRequest) {
  const payload = (await request.json()) as {
    id?: number;
    action?: "approve" | "reject";
    reviewKey?: string;
    reviewerName?: string;
  };

  if (!payload.id || !payload.action || !payload.reviewKey) {
    return NextResponse.json({ message: "Missing review information." }, { status: 400 });
  }

  if (payload.reviewKey !== PRESIDENT_REVIEW_KEY) {
    return NextResponse.json({ message: "Invalid president review key." }, { status: 403 });
  }

  const target = registrations.find((item) => item.id === payload.id);

  if (!target) {
    return NextResponse.json({ message: "Registration not found." }, { status: 404 });
  }

  target.status = payload.action === "approve" ? "approved" : "rejected";
  target.reviewedAt = new Date().toISOString();
  target.reviewedBy = payload.reviewerName?.trim() || "Club President";

  return NextResponse.json({ message: "Review submitted.", registration: target });
}
