"use client";

import { PackageListProps } from "@/types";
import { packageFormSchema } from "@/lib/zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PackageForm1 from "./template/package-form-1";
import { packageForm } from "@/data/loaders";

const PackageForm = ({
    packages,
    locale,
}: Readonly<{
    packages: PackageListProps[];
    locale: string;
}>) => {
    const [loading, setLoading] = useState(false);
    const path = usePathname();
    const form = useForm<z.infer<typeof packageFormSchema>>({
        resolver: zodResolver(packageFormSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            package: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof packageFormSchema>) {
        try {
            setLoading(true);
            const response = await packageForm({
                ...values,
                origin: path,
            });
            if (response.data) {
                toast.success("Message sent successfully!");
                form.reset();
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <PackageForm1
            form={form}
            packages={packages}
            onSubmit={onSubmit}
            loading={loading}
            locale={locale}
        />
    );
};

export default PackageForm;
