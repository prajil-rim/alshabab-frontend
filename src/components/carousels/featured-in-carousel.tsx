"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import SlideIndicator from "./slide-indicator";
import { LinkProps, LogoProps } from "@/types";
import FeaturedInCard from "../pages/about-us/featured-in-card";

const FeaturedInCarousel = ({
    data,
}: {
    data: {
        id: number;
        description: string;
        name: string;
        url: LinkProps;
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
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    align: "start",
                }}
            >
                <CarouselContent>
                    {data?.map((featured) => (
                        <CarouselItem
                            key={featured.id}
                            className="basis-1/2 sm:basis-1/3"
                        >
                            <FeaturedInCard data={featured} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default FeaturedInCarousel;
