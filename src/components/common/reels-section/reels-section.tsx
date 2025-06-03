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

const slides = [
    { url: "/videos/reels/reel1.mp4" },
    { url: "/videos/reels/reel2.mp4" },
    { url: "/videos/reels/reel3.mp4" },
    { url: "/videos/reels/reel4.mp4" },
    { url: "/videos/reels/reel5.mp4" },
];

export function ReelsSection({
    title,
    description,
    button,
    reels,
    background,
}: Readonly<ReelsSectionProps>) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

    const videoRefs = useRef<HTMLVideoElement[]>([]);

    // Calculate which slide should be active (second visible one)
    const getActiveSlideIndex = (currentIndex: number, slideIndex: number) => {
        const totalSlides = slides.length;
        const activePosition = (currentIndex + 1) % totalSlides;
        return slideIndex === activePosition;
    };

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const newIndex = emblaApi.selectedScrollSnap();
        setSelectedIndex(newIndex);

        // Determine which slide is active
        const activeIndex = (newIndex + 1) % slides.length;

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
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
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
            className="bg-cover bg-center relative after:absolute after:inset-0 after:bg-black/70"
            style={{
                // backgroundImage: `url(${background.url})`,
                backgroundImage: "url(/images/others/reel_bg.webp)",
            }}
        >
            <div className="relative z-10 max-w-6xl mx-auto py-32 text-white">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    setApi={(api) => setEmblaApi(api)}
                    className="w-full grid grid-cols-3 gap-3 items-center"
                >
                    <div className="space-y-3">
                        <h4 className="text-3xl font-semibold">{title}</h4>
                        <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical]">
                            {description}
                        </p>
                        <div className="flex justify-between items-center">
                            <Link
                                href={button.href}
                                target={button.isExternal ? "_blank" : "_self"}
                            >
                                <Button
                                    variant={"outline"}
                                    className="bg-transparent rounded-full shadow-none border-white font-manrope cursor-pointer"
                                >
                                    {button.text} <ArrowRightUp />
                                </Button>
                            </Link>
                            <div className="space-x-2">
                                <CarouselPrevious
                                    className="relative inset-0 translate-y-0 bg-transparent border-white"
                                    variant={"outline"}
                                />
                                <CarouselNext className="relative inset-0 translate-y-0" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <CarouselContent>
                            {slides?.map(({ url }, index) => {
                                const isActive = getActiveSlideIndex(
                                    selectedIndex,
                                    index
                                );

                                return (
                                    <CarouselItem
                                        key={index}
                                        className="md:basis-1/2 lg:basis-1/4 py-10"
                                    >
                                        <Reel
                                            url={url}
                                            isActive={isActive}
                                            selectedIndex={selectedIndex}
                                            index={index}
                                            arrayLength={slides.length || 0}
                                            videoRefs={videoRefs}
                                        />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
