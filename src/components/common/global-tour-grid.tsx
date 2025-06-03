"use client";

import { cn } from "@/lib/utils";
import { TourProps } from "@/types";
import { useState } from "react";

const GlobalTourGrid = ({ tours }: { tours: TourProps[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <div className="grid grid-cols-6 gap-3">
            {tours.map((tour, index) => (
                <div
                    className={cn(
                        "rounded-xl h-72 bg-cover bg-center flex items-end p-5",
                        tour.layout === "rectangle"
                            ? "col-span-3"
                            : "col-span-2"
                    )}
                    key={tour.id}
                    style={{
                        // backgroundImage: `url(${tour.image.url})`,
                        backgroundImage: `url(/images/destinations/${
                            index + 1
                        }.webp)`,
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
            ))}
        </div>
    );
};

export default GlobalTourGrid;
