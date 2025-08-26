"use client";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import { useCallback, useEffect, useRef, useState } from "react";
import Reel from "./reel";
import { ReelsSectionProps } from "@/types";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import SlideIndicator from "@/components/carousels/slide-indicator";
import { dir } from "i18next";
import { getImage } from "@/lib/utils";

export function ReelsSection({
    title,
    description,
    button,
    reels,
    background,
    locale,
}: Readonly<ReelsSectionProps> & { locale: string }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const videoRefs = useRef<HTMLVideoElement[]>([]);

    // Calculate which slide should be active (second visible one)
    const getActiveSlideIndex = (currentIndex: number, slideIndex: number) => {
        const totalSlides = reels?.length;
        const activePosition =
            (currentIndex + (breakpoint ? 0 : 1)) % totalSlides;
        return slideIndex === activePosition;
    };

    const breakpoint = useMediaQuery("(max-width: 768px)");

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const newIndex = emblaApi.selectedScrollSnap();
        setSelectedIndex(newIndex);

        setCurrent(emblaApi.selectedScrollSnap() + 1);

        // Determine which slide is active
        const activeIndex =
            (newIndex + (breakpoint ? 0 : 1)) % reels?.length || 0;

        videoRefs.current.forEach((video, idx) => {
            if (video) {
                if (idx === activeIndex) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, [emblaApi, breakpoint, reels?.length]);

    useEffect(() => {
        if (!emblaApi) return;

        setCount(emblaApi.scrollSnapList().length);
        setCurrent(emblaApi.selectedScrollSnap() + 1);

        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section
            dir="ltr"
            className="bg-cover bg-center relative after:absolute after:inset-0 after:bg-black/70"
            style={{
                backgroundImage: `url(${getImage({
                    local: "/local/g.jpg",
                    prod: background?.url,
                })})`,
            }}
        >
            <div className="relative z-10 max-w-7xl mx-auto py-12 lg:py-32 text-white lg:px-6 2xl:px-0">
                <Carousel
                    opts={{
                        align: breakpoint ? "center" : "start",
                        loop: true,
                    }}
                    setApi={(api) => setEmblaApi(api)}
                    className="w-full grid lg:grid-cols-3 gap-3 items-center"
                >
                    <div className="space-y-3 px-3" dir={dir(locale)}>
                        <h4 className="text-2xl lg:text-3xl font-semibold">
                            {title}
                        </h4>
                        <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:6] [-webkit-box-orient:vertical]">
                            {description}
                        </p>
                        <div className="flex justify-between items-center">
                            <Link
                                href={button?.href}
                                target={button?.isExternal ? "_blank" : "_self"}
                            >
                                <Button
                                    variant={"outline"}
                                    className="bg-transparent rounded-full shadow-none border-white font-manrope cursor-pointer"
                                >
                                    {button?.text} <ArrowRightUp />
                                </Button>
                            </Link>
                            <div className="space-x-2 hidden lg:block">
                                <CarouselPrevious
                                    className="relative inset-0 translate-y-0 bg-transparent border-white"
                                    variant={"outline"}
                                />
                                <CarouselNext className="relative inset-0 translate-y-0" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <CarouselContent>
                            {reels?.map(({ url }, index) => {
                                const isActive = getActiveSlideIndex(
                                    selectedIndex,
                                    index
                                );

                                return (
                                    <CarouselItem
                                        key={index}
                                        className="basis-[60%] sm:basis-1/4 py-10"
                                    >
                                        <Reel
                                            url={url}
                                            isActive={isActive}
                                            selectedIndex={selectedIndex}
                                            index={index}
                                            arrayLength={reels.length || 0}
                                            videoRefs={videoRefs}
                                        />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                    </div>
                </Carousel>

                <SlideIndicator count={count} current={current} />
            </div>
        </section>
    );
}
