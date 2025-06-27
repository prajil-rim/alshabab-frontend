"use client";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "../packages/card";
import { LinkProps, MediaProps } from "@/types";
import SlideIndicator from "@/components/carousels/slide-indicator";
import { useEffect, useState } from "react";

interface StaysSectionProps {
    title: string;
    stays: {
        id: number;
        title: string;
        description: string;
        label: string;
        image: MediaProps;
        cta: LinkProps | null;
    }[];
}

const StaysSection = ({ title, stays }: Readonly<StaysSectionProps>) => {
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
        <section className="max-w-7xl mx-auto py-10 space-y-3 lg:space-y-6 px-3 lg:px-6 2xl:px-0">
            <Carousel
                opts={{
                    align: "start",
                }}
                setApi={setApi}
                className="w-full"
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl lg:text-4xl font-semibold">
                        {title}
                    </h3>
                    <div className="items-center gap-3 hidden lg:flex">
                        <CarouselPrevious className="relative inset-0 translate-y-0" />
                        <CarouselNext className="relative inset-0 translate-y-0" />
                    </div>
                </div>
                <CarouselContent className="pt-10">
                    {stays?.map((stay, index) => (
                        <CarouselItem
                            key={index}
                            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                        >
                            <div className="p-1">
                                {/* card */}
                                <Card {...stay} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </section>
    );
};

export default StaysSection;
