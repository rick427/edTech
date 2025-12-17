import type { Student } from "@/lib/db";

import { notFound } from "next/navigation";
import StudentInfo from "@/components/pages/student-info";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getStudent(id: string): Promise<Student> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/students/${id}`,
        { cache: "no-store" } //SSR
    );
    if (res.status === 404) 
        notFound();
    if (!res.ok) 
        throw new Error("Failed to fetch student");
    return res.json();
}

export default async function StudentDetail(pageProps: PageProps) {
    const params = await pageProps.params; 
    const student = await getStudent(params.id);

    return <StudentInfo student={student} />;
}
