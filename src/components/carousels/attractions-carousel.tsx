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
import { getImage } from "@/lib/utils";

const AttractionsCarousel = ({ cards }: { cards: CardProps[] }) => {
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
                <CarouselContent>
                    {cards?.map((card) => (
                        <CarouselItem
                            key={card.id}
                            className="sm:basis-1/2 md:basis-1/3"
                        >
                            <div className="h-[25rem] rounded-lg">
                                <div
                                    className="size-full overflow-hidden rounded-xl flex items-end bg-cover"
                                    style={{
                                        backgroundImage: `url(${getImage({
                                            local: process.env
                                                .PLACEHOLDER_IMAGE!,
                                            prod: card.image?.url,
                                        })})`,
                                    }}
                                >
                                    <div className="bg-black overflow-hidden">
                                        <div className="w-full px-6 py-4 space-y-2 text-white">
                                            <h3 className="font-semibold text-2xl">
                                                {card.title}
                                            </h3>
                                            <p className="font-manrope text-xs font-normal overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:13] [-webkit-box-orient:vertical]">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default AttractionsCarousel;
