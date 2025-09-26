"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Thumb } from "./itinerary-carousel-thumb-button";
import { MediaProps } from "@/types";
import { getImage } from "@/lib/utils";

type PropType = {
    slides: MediaProps[];
};

const ItineraryCarousel: React.FC<PropType> = (props) => {
    const { slides } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();

        emblaMainApi.on("select", onSelect).on("reInit", onSelect);
    }, [emblaMainApi, onSelect]);

    return (
        <div className="w-full m-auto overflow-hidden">
            <div className="overflow-hidden" ref={emblaMainRef}>
                <div className="flex -ml-4 touch-pan-y touch-pinch-zoom">
                    {slides.map((slide) => (
                        <div
                            className="[transform:translate3d(0,0,0)] [flex:0_0_100%] min-w-0 pl-4"
                            key={slide.id}
                        >
                            <div className="shadow-lg rounded-lg flex justify-center items-center h-[19rem] select-none relative overflow-hidden">
                                <Image
                                    src={getImage({
                                        local: "/local/image3.webp",
                                        prod: slide.url,
                                    })}
                                    alt={slide.alternativeText || ""}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-[0.8rem]">
                <div className="overflow-hidden" ref={emblaThumbsRef}>
                    <div className="flex flex-row ml-[calc(0.8rem*-1)]">
                        {slides.map((slide, index) => (
                            <Thumb
                                key={slide.documentId}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                                image={slide}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryCarousel;
