"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import ContactUsForm from "../forms/contact-us-form";
import { X } from "lucide-react";
import { DestinationListProps, PackageListProps } from "@/types";
import Image from "next/image";

const ContactFormModal = ({
    cta,
    destinations,
    packages,
}: {
    cta: string;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-white text-black rounded-full font-semibold !px-5 !py-2.5 cursor-pointer hover:bg-white">
                    {cta}
                    <ArrowRightUp color="red" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-6xl sm:max-w-4xl bg-cover max-h-[calc(100vh-1rem)] bg-[300%_0%] p-0 overflow-hidden border-0 bg-[#212121]">
                <DialogTitle className="sr-only">Contact Us</DialogTitle>
                <Image
                    src={"/images/others/contact_modal.webp"}
                    alt=""
                    className="size-full relative -left-1/4"
                    width={500}
                    height={500}
                />
                <div className="absolute right-0 size-full flex justify-end items-center pe-10 bg-gradient-to-r from-transparent via-[#212121] to-[#212121]">
                    <ContactUsForm
                        destinations={destinations || []}
                        packages={packages || []}
                        formType="form2"
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
