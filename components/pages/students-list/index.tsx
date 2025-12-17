"use client";

import {
    Input,
    Button,
    HStack,
    VStack,
    Heading,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import type { Student } from "@/lib/db";
import StudentsTable from "@/components/pages/students-table";

interface StudentListProps {
    students: Student[];
}

export default function StudentList({ students }:StudentListProps) {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    function handleCreate(){
        router.push("/students/new");
    }

    const filteredStudents = useMemo(() => {
        if (!search) return students;

        const query = search.toLowerCase();
        return students.filter(
        (s) =>
            s.name.toLowerCase().includes(query) ||
            s.major.toLowerCase().includes(query) ||
            s.gpa.toString().includes(query)
        );
    }, [search, students]);
    return (
        <VStack gap="5" padding="20" alignItems="stretch">
            <HStack justify="space-between">
                <Heading size="md">Students</Heading>

                <HStack>
                    <Input
                        placeholder="Search by name, GPA, or department"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        w="280px"
                    />
                    <Button colorScheme="blue" onClick={handleCreate}>
                        New Student
                    </Button>
                </HStack>
            </HStack>

            <StudentsTable data={filteredStudents}/>
        </VStack>
    )
}
