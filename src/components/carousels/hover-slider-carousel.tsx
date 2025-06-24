"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import SlideIndicator from "./slide-indicator";
import { SlideProps } from "@/types";
import Link from "next/link";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import { useTranslations } from "next-intl";

const HoverSliderCarousel = ({ slides }: { slides: SlideProps[] }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const t = useTranslations("common");

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
        <div>
            <Carousel setApi={setApi} className="w-full lg:hidden">
                <CarouselContent className="sm:w-1/2">
                    {slides?.map((slide) => (
                        <CarouselItem key={slide.id}>
                            <div className="w-full aspect-[1/0.8]">
                                <div
                                    className="h-full rounded-xl bg-cover bg-center text-[#F5F5F5] relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:to-transparent overflow-hidden flex justify-center items-end"
                                    style={{
                                        backgroundImage: `url(${slide.image?.url})`,
                                    }}
                                >
                                    <div className="relative z-10 space-y-3 p-4 flex flex-col justify-center items-center">
                                        <h6 className="font-semibold text-2xl text-center">
                                            {slide.title}
                                        </h6>
                                        <div className="flex flex-col justify-center items-center gap-3">
                                            <p className="text-center text-sm font-manrope max-w-[21rem] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                                                {slide.description}
                                            </p>
                                            <Link href={"/"}>
                                                <Button
                                                    variant="outline"
                                                    size={"sm"}
                                                    className="bg-transparent rounded-full font-manrope text-xs cursor-pointer"
                                                >
                                                    {t("exploreMore")}{" "}
                                                    <ArrowRightUp color="red" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator key={6} count={count} current={current} />
        </div>
    );
};

export default HoverSliderCarousel;
