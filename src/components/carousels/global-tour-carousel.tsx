"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import SlideIndicator from "./slide-indicator";
import { TourProps } from "@/types";
import TourCard from "../common/global-tours/tour-card";

const GlobalTourCarousel = ({ tours }: { tours: TourProps[] }) => {
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
        <div>
            <Carousel setApi={setApi} className="w-full lg:hidden">
                <CarouselContent className="w-full md:w-1/2">
                    {tours?.map((tour, i) => (
                        <CarouselItem key={tour.id}>
                            <TourCard tour={tour} index={i} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default GlobalTourCarousel;
