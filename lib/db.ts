import fs from "fs";
import path from "path";

export type Student = {
    id: string;
    dob: string;
    gpa: number;
    name: string;
    major: string;
    registrationNumber: string;
};

const filePath = path.join(process.cwd(), "data", "students.json");

export function readStudents(): Student[] {
    if (!fs.existsSync(filePath)) return [];

    try {
        const data = fs.readFileSync(filePath, "utf-8");
        if (!data) return [];
        return JSON.parse(data) as Student[];
    } catch (err) {
        console.error("Failed to parse students.json:", err);
        return [];
    }
}

export function writeStudents(data: Student[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}