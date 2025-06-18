"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import SlideIndicator from "./slide-indicator";
import { DealsProps } from "@/types";
import Link from "next/link";
import DealCard from "../pages/destinations/deal-card";

const DealsCarousel = ({ packages }: { packages: DealsProps[] }) => {
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
        <div className="lg:hidden pt-5">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {packages?.map((package_) => (
                        <CarouselItem
                            key={package_.id}
                            className="sm:basis-1/2"
                        >
                            <Link href={"/"}>
                                <DealCard package_={package_} />
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default DealsCarousel;
