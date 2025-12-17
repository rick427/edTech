"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { Button, VStack, Avatar, Card } from "@chakra-ui/react";

import type { Student } from "@/lib/db";

interface Props {
    student: Student;
}

export default function StudentInfo({student}:Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this student?")) return;

        setIsDeleting(true);
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            const res = await fetch(`${baseUrl}/api/students/${student.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || "Failed to delete student");
            }
            toaster.create({
                title: "Deleted",
                description: "Student record deleted successfully",
                type: "success",
                closable: true,
            });
            router.push("/home");
        } 
        catch (err: any) {
            toaster.create({
                title: "Error",
                description: err.message || "Failed to delete student",
                type: "error",
                closable: true,
            });
        } 
        finally {
            setIsDeleting(false);
        }
    };
    return (
        <VStack height="100vh" padding="20" justifyContent="center" alignItems="center">
            <Card.Root width="320px">
                <Card.Body gap="2">
                    <Avatar.Root size="lg" shape="full">
                        <Avatar.Image src="https://randomuser.me/api/portraits/men/75.jpg" />
                        <Avatar.Fallback name="Nue Camp" />
                    </Avatar.Root>
                    <Card.Title mt="2">{student.name}</Card.Title>
                    <Card.Description>
                        {student.name} is currently pursuing {student.major}. 
                        With a GPA of {student.gpa}, they have shown strong academic performance. 
                        Born on {student.dob}, {student.name} is registered under the number {student.registrationNumber}. 
                        Keep an eye on this student — they're making their mark!
                    </Card.Description>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <Button 
                        variant="outline" 
                        onClick={() => router.push(`/students/${student.id}/edit`)}
                    >
                        Edit
                    </Button>
                    <Button
                        colorPalette="red"
                        loading={isDeleting}
                        onClick={handleDelete}
                        loadingText="Deleting..."
                    >
                        Delete
                    </Button>
                </Card.Footer>
            </Card.Root>
        </VStack>
    )
}
