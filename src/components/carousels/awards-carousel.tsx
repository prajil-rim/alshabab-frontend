"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import SlideIndicator from "./slide-indicator";
import { LogoProps } from "@/types";
import { StrapiImage } from "../common/strapi-image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AwardsCarousel = ({
    awards,
}: {
    awards: {
        id: number;
        title: string;
        year: string;
        url: string;
        logo: LogoProps;
    }[];
}) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="lg:hidden">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent className="w-[80%] sm:w-1/3">
                    {awards?.map((award, i) => (
                        <CarouselItem key={award.id}>
                            <Link
                                href={award.url}
                                target="_blank"
                                className={cn(
                                    "aspect-square group rounded-xl border-2 border-[#BDBDBD80] flex flex-col justify-center items-center p-6 hover:border-primary hover:shadow-xl",
                                    current === i + 1 && "border-primary"
                                )}
                                key={award.id}
                            >
                                <StrapiImage
                                    src={
                                        award.logo?.image?.url ||
                                        process.env.PLACEHOLDER_IMAGE!
                                    }
                                    alt={
                                        award.logo.image.alternativeText ||
                                        award.logo.logoText
                                    }
                                    width={100}
                                    height={100}
                                    className={cn(
                                        "w-4/5 aspect-3/2 object-contain grayscale group-hover:grayscale-0 transform-all duration-300",
                                        current === i + 1 && "grayscale-0"
                                    )}
                                />
                                <span className="text-xl font-semibold font-manrope text-center max-w-[15rem] mb-3 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                                    {award.title}
                                </span>
                                <span
                                    className={cn(
                                        "font-manrope text-lg text-[#767676] font-medium group-hover:text-primary",
                                        current === i + 1 && "text-primary"
                                    )}
                                >
                                    {award.year}
                                </span>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default AwardsCarousel;
