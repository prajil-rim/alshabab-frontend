"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { PackageListProps } from "@/types";
import Image from "next/image";
import PackageForm from "../forms/package-form";

const PackageFormModal = ({
    packages,
    locale,
    children,
    modalData,
}: {
    packages: PackageListProps[];
    locale: string;
    children?: React.ReactNode;
    modalData: {
        title: string;
        phone: string;
    };
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                dir="ltr"
                className="w-full max-w-6xl sm:max-w-4xl bg-cover h-[calc(100vh-1rem)] lg:max-h-[calc(100vh-1rem)] bg-[300%_0%] p-0 overflow-hidden border-0 bg-[#212121]"
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
                <div className="hidden md:block absolute left-0 top-3/4 -translate-y-3/4 px-3 space-y-4 z-20 max-w-sm text-white">
                    <h1 className="text-3xl font-bold text-center">
                        {modalData.title}
                    </h1>
                    <p className="text-lg font-semibold font-manrope text-center opacity-70">
                        {modalData.phone}
                    </p>
                </div>
                <div className="absolute right-0 size-full flex justify-end items-center pe-10 bg-gradient-to-r from-transparent via-[#212121] to-[#212121]">
                    <PackageForm packages={packages || []} locale={locale} />
                </div>
                <DialogClose className="z-50 absolute right-0 text-white m-3 cursor-pointer">
                    <X size={20} />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default PackageFormModal;
