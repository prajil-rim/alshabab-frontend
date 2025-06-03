import { ContactInfoProps } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type GroupedContactInfo = {
    [key in ContactInfoProps["contact"]]?: string[];
};

export function groupContactInfo(data: ContactInfoProps[]): GroupedContactInfo {
    return data.reduce((acc: GroupedContactInfo, item) => {
        if (!acc[item.contact]) {
            acc[item.contact] = [];
        }
        acc[item.contact]!.push(item.contact_details);
        return acc;
    }, {});
}
