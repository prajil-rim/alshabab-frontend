"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { CardProps } from "@/types";
import { useEffect, useState } from "react";
import SlideIndicator from "./slide-indicator";
import PDListCard from "../common/pd-list-section/pd-list-card";

const PDListCarousel = ({ hover_card }: { hover_card: CardProps[] }) => {
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
        <div className="mx-auto max-w-sm w-full sm:hidden pt-5">
            <Carousel setApi={setApi} className="w-full max-w-sm">
                <CarouselContent>
                    {hover_card?.map((card) => (
                        <CarouselItem key={card.id}>
                            <PDListCard card={card} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default PDListCarousel;
