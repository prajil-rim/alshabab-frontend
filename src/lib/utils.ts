import { ContactInfoProps, GroupedContactInfo, SeoMetadata } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getImage({
    local,
    prod,
}: {
    local?: string | null;
    prod?: string;
}) {
    const imgUrl = process.env.NODE_ENV === "development" ? local : prod;

    return imgUrl || (process.env.PLACEHOLDER_IMAGE as string);
}

export function groupContactInfo(data: ContactInfoProps[]): GroupedContactInfo {
    return data.reduce((acc: GroupedContactInfo, item) => {
        if (!acc[item.contact]) {
            acc[item.contact] = [];
        }
        acc[item.contact]!.push(item.contact_details);
        return acc;
    }, {});
}

export function returnMetadata(data: { seo: SeoMetadata }) {
    return {
        title: data.seo?.metaTitle || "Al Shabab Tours",
        description: data.seo?.metaDescription || "",
        keywords: data.seo?.metaKeywords || "",
        robots: data.seo?.metaRobots || "",
        alternates: {
            canonical: data.seo?.canonicalUrl || "",
        },
        openGraph: {
            title: data.seo?.openGraph?.ogTitle || "Al Shabab Tours",
            description: data.seo?.openGraph?.ogDescription || "",
            url: data.seo?.openGraph?.ogUrl || "",
            type: data.seo?.openGraph?.ogType || "website",
            images: {
                url: data.seo?.openGraph?.ogImage?.url || "",
                alt: data.seo?.openGraph?.ogImage?.alternativeText || "",
            },
        },
        other: {
            "color-scheme": "light",
        },
    };
}
