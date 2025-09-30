"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ContactUsForm from "../forms/contact-us-form";
import { X } from "lucide-react";
import { DestinationListProps, ParentPackageListProps } from "@/types";
import Image from "next/image";

const ContactFormModal = ({
    destinations,
    packages,
    locale,
    children,
}: {
    destinations: DestinationListProps[];
    packages: ParentPackageListProps[];
    locale: string;
    children?: React.ReactNode;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                dir="ltr"
                className="w-full max-w-6xl sm:max-w-4xl bg-cover lg:max-h-[calc(100vh-1rem)] bg-[300%_0%] p-0 overflow-hidden border-0 bg-[#212121]"
            >
                <DialogTitle className="sr-only">Contact Us</DialogTitle>
                <DialogDescription className="sr-only"></DialogDescription>
                <Image
                    src={"/images/others/contact_modal.webp"}
                    alt="Office lady"
                    className="size-full relative -left-1/4 hidden lg:block"
                    width={500}
                    height={500}
                />
                <div className="absolute right-0 size-full flex justify-end items-center pe-10 bg-gradient-to-r from-transparent via-[#212121] to-[#212121]">
                    <ContactUsForm
                        destinations={destinations || []}
                        packages={packages || []}
                        formType="form2"
                        locale={locale}
                    />
                </div>
                <DialogClose className="z-50 absolute right-0 text-white m-3 cursor-pointer">
                    <X size={20} />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default ContactFormModal;
