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
            className="relative flex flex-col justify-end items-center h-[40rem] lg:h-[35rem] 2xl:h-[50rem] bg-no-repeat bg-[0%_60%] bg-cover after:inset-0 after:bg-black/50 after:absolute pb-10"
            style={{
                backgroundImage: `url(${cover.url})`,
            }}
        >
            <div className="space-y-4 flex flex-col justify-center items-center text-white relative z-10 flex-1">
                <span className="text-black bg-white rounded-full px-3 py-1 font-manrope text-xs lg:text-sm font-bold">
                    {category}
                </span>
                <h1 className="text-2xl lg:text-5xl font-bold overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-4xl text-center leading-tight">
                    {title}
                </h1>
                <p className="font-manrope lg:text-lg max-w-2xl text-center overflow-hidden text-ellipsis [display:-webkit-box] lg:[-webkit-line-clamp:3] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                    {description}
                </p>
                <div className="font-manrope text-center flex flex-col lg:flex-row items-center gap-3 lg:gap-0">
                    <div className="flex">
                        <span className="text-sm lg:text-base">
                            📅 {format(new Date(date), "MMMM dd, yyyy")}
                        </span>
                        <b className="mx-2">•</b>
                        <span className="text-sm lg:text-base">
                            🕒 {read_time}{" "}
                            <span className="rtl:hidden">read</span>
                            <span className="ltr:hidden">يقرأ</span>
                        </span>
                    </div>
                    {cta && (
                        <Link
                            href={cta.href}
                            target={cta.isExternal ? "_blank" : "_self"}
                            className="w-full lg:w-auto"
                        >
                            <Button
                                className="rounded-full bg-transparent cursor-pointer lg:ms-5 w-full lg:w-auto"
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
                    <BreadcrumbItem className="hidden lg:block">
                        <BreadcrumbPage className="text-white font-bold">
                            {breadcrumbs?.at(-1)?.text}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbItem className="lg:hidden">
                        <BreadcrumbPage className="text-white font-bold">
                            {(breadcrumbs?.at(-1)?.text.length || 0) > 15
                                ? breadcrumbs?.at(-1)?.text.slice(0, 10) + "..."
                                : breadcrumbs?.at(-1)?.text}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default BlogHero;
