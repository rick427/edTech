import { NextResponse } from "next/server";
import { getAllStudents, createStudent } from "@/lib/students.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let students = getAllStudents();

  const q = searchParams.get("q");
  const major = searchParams.get("major");
  const minGpa = searchParams.get("minGpa");

  if (q) {
    students = students.filter(s =>
      s.name.toLowerCase().includes(q.toLowerCase())
    );
  }
  if (major) {
    students = students.filter(s => s.major === major);
  }
  if (minGpa) {
    students = students.filter(s => s.gpa >= Number(minGpa));
  }

  return NextResponse.json(students);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const student = createStudent(body);
    return NextResponse.json(student, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: 400 }
    );
  }
}
