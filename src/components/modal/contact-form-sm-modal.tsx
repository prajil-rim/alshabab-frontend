"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ContactUsForm from "../forms/contact-us-form";
import { DestinationListProps, PackageListProps } from "@/types";
import Image from "next/image";

const ContactFormSmModal = ({
    children,
    destinations,
    packages,
    locale,
}: {
    children: React.ReactNode;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    locale: string;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-[#ECF4FF] px-2 max-h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-none">
                <DialogTitle className="sr-only">Contact Us</DialogTitle>
                <DialogDescription className="sr-only"></DialogDescription>
                <div className="size-full flex flex-col gap-3 items-center">
                    <Image
                        src="/images/logo/form_logo.webp"
                        width={100}
                        height={40}
                        alt="logo red"
                        className="mx-auto"
                    />
                    <ContactUsForm
                        destinations={destinations || []}
                        packages={packages || []}
                        formType="form2"
                        locale={locale}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ContactFormSmModal;
