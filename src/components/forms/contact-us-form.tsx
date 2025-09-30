"use client";

import { DestinationListProps, ParentPackageListProps } from "@/types";
import { contactUsSchema } from "@/lib/zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitContactUsForm } from "@/data/loaders";
import Form1 from "./template/form-1";
import Form2 from "./template/form-2";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ContactUsForm = ({
    destinations,
    packages,
    formType,
    locale,
}: Readonly<{
    destinations: DestinationListProps[];
    packages: ParentPackageListProps[];
    formType: "form1" | "form2";
    locale: string;
}>) => {
    const [loading, setLoading] = useState(false);
    const path = usePathname();
    const form = useForm<z.infer<typeof contactUsSchema>>({
        resolver: zodResolver(contactUsSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            destination: "",
            package: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof contactUsSchema>) {
        try {
            setLoading(true);
            const response = await submitContactUsForm({
                ...values,
                origin: path,
            });
            if (response.data) {
                toast.success("Message sent successfully!");
                form.reset();
            } else {
                toast.error("Something went wrong!");
            }
        } catch {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    if (formType === "form1") {
        return (
            <Form1
                form={form}
                destinations={destinations}
                packages={packages}
                onSubmit={onSubmit}
                loading={loading}
            />
        );
    } else if (formType === "form2") {
        return (
            <Form2
                form={form}
                destinations={destinations}
                packages={packages}
                onSubmit={onSubmit}
                loading={loading}
                locale={locale}
            />
        );
    } else {
        return null;
    }
};

export default ContactUsForm;
