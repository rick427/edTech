"use client";

import { useRouter } from "next/navigation";
import { Button, Group, Table } from "@chakra-ui/react";

import type { Student } from "@/lib/db";

interface StudentTableProps {
    data: Student[];
}

export default function StudentTable({data}:StudentTableProps) {
    const router = useRouter();
    return (
        <Table.ScrollArea borderWidth="1px" borderRadius="lg">
            <Table.Root size="sm" variant="outline" showColumnBorder>
                <Table.Header>
                    <Table.Row>
                    <Table.ColumnHeader>ID Nos.</Table.ColumnHeader>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Major</Table.ColumnHeader>
                    <Table.ColumnHeader>GPA</Table.ColumnHeader>
                    <Table.ColumnHeader>Reg Nos.</Table.ColumnHeader>
                    <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(student => (
                    <Table.Row key={student.id}>
                        <Table.Cell>{student.id}</Table.Cell>
                        <Table.Cell>{student.name}</Table.Cell>
                        <Table.Cell>{student.major}</Table.Cell>
                        <Table.Cell>{student.gpa}</Table.Cell>
                        <Table.Cell>{student.registrationNumber}</Table.Cell>
                        <Table.Cell>
                            <Group gap="2">
                                <Button size="xs" variant="outline" onClick={() => router.push(`/students/${student.id}`)}>
                                    View
                                </Button>
                                <Button size="xs" onClick={() => router.push(`/students/${student.id}/edit`)}>
                                    Edit
                                </Button>
                            </Group>
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.Cell colSpan={5}>
                            Total students: {data.length}
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer>
            </Table.Root>
        </Table.ScrollArea>
    )
}
