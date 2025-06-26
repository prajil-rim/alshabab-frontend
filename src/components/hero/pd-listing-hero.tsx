"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import Whatsapp from "../icons/whatsapp";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import React, { Fragment } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { PDHeroProps } from "@/types";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
    hero: PDHeroProps[];
    breadcrumbs: {
        text: string;
        href?: string;
    }[];
}

const PDListingHero = ({ hero, breadcrumbs }: Readonly<BreadcrumbProps>) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    if (!hero || hero.length === 0) return null;

    return (
        <section className="w-full h-screen bg-black text-white">
            <Carousel
                setApi={setApi}
                opts={{
                    watchDrag: false,
                }}
                className="size-full relative"
            >
                <CarouselContent className="ml-0">
                    {hero.map((data, index) => (
                        <CarouselItem key={index} className="h-screen pl-0">
                            <div
                                className="relative flex flex-col justify-center items-center h-full bg-no-repeat bg-center bg-cover after:inset-0 after:bg-black/50 after:absolute gap-32 pb-10 font px-3"
                                style={{
                                    backgroundImage: `url(${data.background?.url})`,
                                }}
                            >
                                <div className="space-y-5 flex flex-col justify-center items-center text-white relative z-10">
                                    <h1 className="text-3xl lg:text-5xl font-bold max-w-[44rem] text-center leading-tight">
                                        {data.title}
                                    </h1>
                                    <p className="font-manrope lg:text-lg max-w-2xl text-center overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical]">
                                        {data.description}
                                    </p>
                                    <div className="font-manrope flex flex-col lg:flex-row justify-center items-center gap-4">
                                        <Link
                                            href={data.cta_button?.href}
                                            target={
                                                data.cta_button?.isExternal
                                                    ? "_blank"
                                                    : "_self"
                                            }
                                        >
                                            <Button className="bg-transparent rounded-full cursor-pointer border border-[#F5F1E3] hover:bg-white hover:text-black">
                                                {data.cta_button?.text}{" "}
                                                <ArrowRightUp color="red" />
                                            </Button>
                                        </Link>
                                        <Button className="rounded-full bg-[#FFE9EC] text-black hover:text-white cursor-pointer">
                                            {data.cta_whatsapp?.text}{" "}
                                            <Whatsapp />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="absolute bottom-0 w-full py-10">
                    <div className="flex w-full justify-between max-w-7xl mx-auto px-3">
                        <Breadcrumb>
                            <BreadcrumbList className="font-manrope text-white">
                                {breadcrumbs
                                    ?.slice(0, -1)
                                    .map(({ text, href }, i) => (
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
                        <ul className="flex gap-6 text-sm text-white font-manrope items-center">
                            {hero.map((data, index) => (
                                <li
                                    key={data.id}
                                    className={cn(
                                        "hidden lg:flex",
                                        index === current - 1
                                            ? "font-semibold border-b-2 border-primary"
                                            : ""
                                    )}
                                >
                                    {data.slide_name}
                                </li>
                            ))}
                            <li className="flex items-center gap-3">
                                <CarouselPrevious className="relative left-0 right-0 translate-y-0 disabled:bg-transparent disabled:text-white disabled:border-white disabled:opacity-100 hover:bg-primary/90 hover:text-white cursor-pointer" />
                                <CarouselNext className="relative left-0 right-0 translate-y-0 disabled:bg-transparent disabled:text-white disabled:border-white disabled:opacity-100 hover:bg-primary/90 hover:text-white cursor-pointer" />
                            </li>
                        </ul>
                    </div>
                </div>
            </Carousel>
        </section>
    );
};

export default PDListingHero;
