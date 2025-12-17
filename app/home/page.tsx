import StudentsList from "@/components/pages/students-list";

import type { Student } from "@/lib/db";
import { getAllStudents } from "@/lib/students.service";

export default async function PortalPage() {
    let students:Student[] = [];
    try {
        students = getAllStudents();
    } catch (e: any) {
        console.log("Failed to read students:", e.message);
    }

    return <StudentsList students={students} />;
}
