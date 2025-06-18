"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import SlideIndicator from "./slide-indicator";
import { CardProps } from "@/types";
import CardWithAnimatedParagraph from "../common/card";

const ExperiencesCarousel = ({ hover_card }: { hover_card: CardProps[] }) => {
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
                <CarouselContent className="w-full sm:w-1/2 md:w-1/3">
                    {hover_card?.map((card) => (
                        <CarouselItem key={card.id}>
                            <CardWithAnimatedParagraph card={card} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default ExperiencesCarousel;
