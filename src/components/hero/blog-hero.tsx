import { LinkProps, MediaProps } from "@/types";
import ArrowRightUp from "../icons/arrow-right-up";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { Fragment } from "react";

interface BlogHeroProps {
    id: number;
    title: string;
    description: string;
    date: string;
    read_time: string;
    category: string;
    cover: MediaProps;
    cta: LinkProps;
    breadcrumbs?: {
        text: string;
        href?: string;
    }[];
}

const BlogHero = ({
    category,
    cover,
    cta,
    description,
    title,
    date,
    read_time,
    breadcrumbs,
}: BlogHeroProps) => {
    return (
        <div
            className="relative flex flex-col justify-end items-center h-[35rem] bg-no-repeat bg-[0%_60%] bg-cover after:inset-0 after:bg-black/50 after:absolute gap-20 pb-10"
            style={{
                // backgroundImage: `url(${cover.url})`,
                backgroundImage: "url(/images/hero/blog_listing_hero.webp)",
            }}
        >
            <div className="space-y-4 flex flex-col justify-center items-center text-white relative z-10">
                <span className="text-black bg-white rounded-full px-3 py-1 font-manrope text-sm font-bold">
                    {category}
                </span>
                <h1 className="text-5xl font-bold overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-4xl text-center leading-tight">
                    {title}
                </h1>
                <p className="font-manrope text-lg max-w-2xl text-center overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    {description}
                </p>
                <div className="font-manrope">
                    <span>📅 {format(new Date(date), "MMMM dd, yyyy")}</span>
                    <b className="mx-2">•</b>
                    <span>🕒 {read_time} read</span>
                    {cta && (
                        <Link
                            href={cta.href}
                            target={cta.isExternal ? "_blank" : "_self"}
                        >
                            <Button
                                className="rounded-full bg-transparent cursor-pointer ms-5"
                                variant={"outline"}
                            >
                                {cta.text} <ArrowRightUp color="red" />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            <Breadcrumb className="relative z-10">
                <BreadcrumbList className="font-manrope text-white">
                    {breadcrumbs?.slice(0, -1).map(({ text, href }, i) => (
                        <Fragment key={i}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={href}
                                    className="hover:text-white"
                                >
                                    {text}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white font-bold">
                            {breadcrumbs?.at(-1)?.text}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default BlogHero;
