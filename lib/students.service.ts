import { Student, readStudents, writeStudents } from "./db";

export function getAllStudents() {
    return readStudents();
}

export function getStudent(id: string) {
    return readStudents().find(s => s.id === id);
}

export function createStudent(payload: Omit<Student, "id">) {
    validate(payload);

    const students = readStudents();
    const student: Student = {
        id: crypto.randomUUID(),
        ...payload,
    };

    students.push(student);
    writeStudents(students);
    return student;
}

export function updateStudent(id: string, payload: Partial<Student>) {
    const students = readStudents();
    const index = students.findIndex(s => s.id === id);

    if (index === -1) throw new Error("Student not found");

    students[index] = { ...students[index], ...payload };
    writeStudents(students);

    return students[index];
}

export function deleteStudent(id: string) {
    const students = readStudents();
    const updated = students.filter(s => s.id !== id);

    if (students.length === updated.length) {
        throw new Error("Student not found");
    }

    writeStudents(updated);
}

function validate(data: Omit<Student, "id">) {
    if (!data.name) 
        throw new Error("Name is required");
    if (!data.registrationNumber) 
        throw new Error("Registration number required");
    if (data.gpa < 0 || data.gpa > 4) {
        throw new Error("GPA must be between 0 and 4");
    }
}
