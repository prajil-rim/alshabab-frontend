"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import ContactUsForm from "../forms/contact-us-form";
import { DestinationListProps, PackageListProps } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ContactFormSmModal = ({
    cta,
    destinations,
    packages,
    bg = "white",
}: {
    cta: string;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    bg?: string;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        "rounded-full font-semibold lg:!px-5 lg:!py-2.5 cursor-pointer hover:bg-white",
                        bg === "white"
                            ? "bg-white text-black"
                            : "bg-[#202020] text-white !px-5"
                    )}
                >
                    {cta}
                    <ArrowRightUp color="red" />
                </Button>
            </DialogTrigger>
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
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ContactFormSmModal;
