"use client";

import { cn, getImage } from "@/lib/utils";
import { TourProps } from "@/types";
import { useState } from "react";

const TourCard = ({ tour, index }: { tour: TourProps; index: number }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <div
            className={cn(
                "rounded-xl aspect-[1/0.7] lg:aspect-auto lg:h-72 2xl:h-96 bg-cover bg-center flex items-end p-5",
                tour.layout === "rectangle" ? "col-span-3" : "col-span-2"
            )}
            key={tour.id}
            style={{
                backgroundImage: `url(${getImage({
                    local: process.env.PLACEHOLDER_IMAGE!,
                    prod: tour.image.url,
                })})`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <h1
                className={cn(
                    "font-bold text-5xl transition-all duration-500",
                    hoveredIndex === index
                        ? "outlined-text-none"
                        : "outlined-text"
                )}
            >
                {tour.label}
            </h1>
        </div>
    );
};

export default TourCard;
