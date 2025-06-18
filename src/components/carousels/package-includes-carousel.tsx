"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { CardProps } from "@/types";
import { useEffect, useState } from "react";
import Card from "../pages/packages/card";
import SlideIndicator from "./slide-indicator";

const PackageIncludesCarousel = ({
    package_includes,
}: {
    package_includes: CardProps[];
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
        <div className="mx-auto max-w-xs sm:hidden">
            <Carousel setApi={setApi} className="w-full max-w-xs">
                <CarouselContent>
                    {package_includes?.map((card) => (
                        <CarouselItem key={card.id}>
                            <Card {...card} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default PackageIncludesCarousel;
