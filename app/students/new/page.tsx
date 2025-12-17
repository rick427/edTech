"use client";

import {
    Box,
    Field,
    Input,
    Stack,
    Button,
    Heading,
    NumberInput,
    NativeSelect,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
    name: string;
    dob: string;
    gpa: number;
    major: string;
    registrationNumber: string;
};

export default function NewStudent() {
    const router = useRouter();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            dob: "",
            gpa: 0,
            major: "",
            registrationNumber: "",
        },
    });

    async function onSubmit(data:FormValues){
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            const res = await fetch(`${baseUrl}/api/students`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.message || "Failed to create student")
            }

            toaster.create({
                title: "Student created",
                description: "Record saved successfully",
                type: "success",
                closable: true,
            })

            router.push("/home");
        } catch (err: any) {
            toaster.create({
                title: "Submission failed",
                description: err.message,
                type: "error",
                closable: true,
            })
        }
    }
    return (
        <Box maxW="lg" mx="auto" mt={10}>
            <Heading size="lg" mb={6}>
                New Student
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack gap={4}>
                    {/* Name */}
                    <Field.Root invalid={!!errors.name} required>
                        <Field.Label>Full name</Field.Label>
                        <Input
                            placeholder="Jane Doe"
                            {...register("name", { required: "Name is required" })}
                        />
                        <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* DOB */}
                    <Field.Root invalid={!!errors.dob} required>
                        <Field.Label>Date of birth</Field.Label>
                        <Input
                            type="date"
                            {...register("dob", { required: "Date of birth is required" })}
                        />
                        <Field.ErrorText>{errors.dob?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* GPA */}
                    <Field.Root invalid={!!errors.gpa} required>
                        <Field.Label>GPA</Field.Label>
                        
                        <Controller
                            name="gpa"
                            control={control}
                            rules={{
                                required: "GPA is required",
                                min: { value: 0, message: "GPA cannot be negative" },
                                max: { value: 4, message: "GPA cannot exceed 4.0" },
                            }}
                            render={({ field }) => (
                            <NumberInput.Root
                                min={0}
                                max={4}
                                step={0.1}
                                width="100%"
                                value={field.value === undefined ? "" : String(field.value)}
                                onValueChange={({ value, valueAsNumber }) => {
                                    if (value === "") {
                                        field.onChange(undefined)
                                    } else {
                                        field.onChange(valueAsNumber)
                                    }
                                }}
                            >
                                <NumberInput.Input placeholder="3.5" />
                            </NumberInput.Root>
                            )}
                        />

                        <Field.ErrorText>{errors.gpa?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* Major */}
                    <Field.Root invalid={!!errors.major} required>
                        <Field.Label>Major</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                {...register("major", { required: "Major is required" })}
                            >
                                <option value="">Select major</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Business">Business</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Law">Law</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                        <Field.ErrorText>
                            {errors.major?.message}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Registration number */}
                    <Field.Root invalid={!!errors.registrationNumber} required>
                        <Field.Label>Registration number</Field.Label>
                        <Input
                            placeholder="REG-2025-001"
                            {...register("registrationNumber", {
                                required: "Registration number is required",
                            })}
                        />
                        <Field.ErrorText>
                            {errors.registrationNumber?.message}
                        </Field.ErrorText>
                    </Field.Root>

                    <Button
                        type="submit"
                        loading={isSubmitting}
                        alignSelf="flex-start"
                    >
                        Create student
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
