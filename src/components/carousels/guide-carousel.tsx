"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import SlideIndicator from "./slide-indicator";
import { GuideProps } from "@/types";
import GuideCard from "../pages/about-us/guide-card";

const GuideCarousel = ({ guides }: { guides: GuideProps[] }) => {
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
                <CarouselContent className="sm:w-1/2">
                    {guides?.map((guide) => (
                        <CarouselItem key={guide.id}>
                            <GuideCard guide={guide} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default GuideCarousel;
