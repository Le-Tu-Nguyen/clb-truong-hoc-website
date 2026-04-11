import { NextRequest, NextResponse } from "next/server";

type MemberIntro = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  intro: string;
  createdAt: string;
};

type MemberIntroPayload = Omit<MemberIntro, "id" | "createdAt">;

const intros: MemberIntro[] = [];

function validatePayload(payload: Partial<MemberIntroPayload>) {
  if (!payload.fullName || !payload.studentId || !payload.email || !payload.intro) {
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

  const filtered = intros.filter((item) => {
    const matchStudentId = !studentId || item.studentId.toLowerCase().includes(studentId);
    const matchEmail = !email || item.email.toLowerCase().includes(email);
    return matchStudentId && matchEmail;
  });

  return NextResponse.json({ intros: filtered });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Partial<MemberIntroPayload>;
  const validationError = validatePayload(payload);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const newIntro: MemberIntro = {
    id: intros.length + 1,
    fullName: payload.fullName!.trim(),
    studentId: payload.studentId!.trim(),
    email: payload.email!.trim(),
    intro: payload.intro!.trim(),
    createdAt: new Date().toISOString(),
  };

  intros.unshift(newIntro);

  return NextResponse.json(
    {
      message: "Member introduction submitted successfully.",
      intro: newIntro,
    },
    { status: 201 }
  );
}
