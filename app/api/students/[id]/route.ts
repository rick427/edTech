import { NextResponse } from "next/server";
import {
  getStudent,
  updateStudent,
  deleteStudent,
} from "@/lib/students.service";

type Params = {
  params: { id: string } | Promise<{ id: string }>;
};

export async function GET(_: Request, route: Params) {
  const params = route.params instanceof Promise ? await route.params : route.params;
  const student = getStudent(params.id);

  if (!student) {
    return NextResponse.json(
      { message: "Student not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(student);
}

export async function PUT(request: Request, route: Params) {
  const params = route.params instanceof Promise ? await route.params : route.params;
  try {
    const body = await request.json();
    const updated = updateStudent(params.id, body);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: 400 }
    );
  }
}

export async function DELETE(_: Request, route: Params) {
  const params = route.params instanceof Promise ? await route.params : route.params;
  try {
    deleteStudent(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: 400 }
    );
  }
}
