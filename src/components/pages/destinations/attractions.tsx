"use client";

import { useState } from "react";
import { motion as m } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardProps } from "@/types";

const CARDS_PER_ROW = 4;

const Attractions = ({ cards }: { cards: CardProps[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const rows: CardProps[][] = [];
    for (let i = 0; i < cards.length; i += CARDS_PER_ROW) {
        rows.push(cards.slice(i, i + CARDS_PER_ROW));
    }
    return rows.map((row, rowIndex) => {
        const baseIndex = rowIndex * CARDS_PER_ROW;
        const hoveredInRow =
            hoveredIndex !== null &&
            hoveredIndex >= baseIndex &&
            hoveredIndex < baseIndex + row.length;

        return (
            <div key={rowIndex} className="flex w-full overflow-hidden -ml-2">
                {row.map((data, colIndex) => {
                    const globalIndex = baseIndex + colIndex;
                    const isHovered = hoveredIndex === globalIndex;

                    const cardWidth = isHovered
                        ? "w-1/2"
                        : hoveredInRow
                        ? "w-1/5"
                        : "w-1/4";

                    return (
                        <div
                            key={globalIndex}
                            className={`transition-all pl-2 pb-2 duration-300 h-[21rem] text-white text-xl font-bold ${cardWidth}`}
                            onMouseEnter={() => setHoveredIndex(globalIndex)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div
                                className={cn(
                                    "size-full overflow-hidden rounded-xl flex items-center bg-cover",
                                    rowIndex % 2 === 0
                                        ? "justify-end"
                                        : "justify-start"
                                )}
                                style={{
                                    backgroundImage: `url(${data.image?.url})`,
                                }}
                            >
                                <m.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: isHovered ? "60%" : 0,
                                    }}
                                    className="bg-black h-full overflow-hidden shrink-0"
                                >
                                    <div className="w-72 px-6 py-4 space-y-3">
                                        <h3 className="font-semibold text-2xl">
                                            {data.title}
                                        </h3>
                                        <p className="font-manrope text-sm font-normal overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:13] [-webkit-box-orient:vertical]">
                                            {data.description}
                                        </p>
                                    </div>
                                </m.div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    });
};

export default Attractions;
