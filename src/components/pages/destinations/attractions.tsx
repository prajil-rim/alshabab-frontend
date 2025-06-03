"use client";

import { useState } from "react";
import { motion as m } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardProps } from "@/types";

const TOTAL_CARDS = 8;
const CARDS_PER_ROW = 4;

const Attractions = ({ cards }: { cards: CardProps[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Create dummy cards
    const cards_ = Array.from({ length: TOTAL_CARDS }, (_, i) => i + 1);

    const rows: number[][] = [];
    // const rows: CardProps[][] = [];
    for (let i = 0; i < cards_.length; i += CARDS_PER_ROW) {
        rows.push(cards_.slice(i, i + CARDS_PER_ROW));
    }
    return rows.map((row, rowIndex) => {
        const baseIndex = rowIndex * CARDS_PER_ROW;
        const hoveredInRow =
            hoveredIndex !== null &&
            hoveredIndex >= baseIndex &&
            hoveredIndex < baseIndex + row.length;

        return (
            <div key={rowIndex} className="flex w-full overflow-hidden -ml-2">
                {row.map((_, colIndex) => {
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
                            className={`transition-all pl-2 duration-300 h-[21rem] text-white text-xl font-bold ${cardWidth}`}
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
                                    // backgroundImage: `url(${data.image.url})`,
                                    backgroundImage: `url(/images/others/hover_card_1.webp)`,
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
                                            Top Station
                                        </h3>
                                        <p className="font-manrope text-sm font-normal overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:13] [-webkit-box-orient:vertical]">
                                            Perched at 1,880 meters above sea
                                            level, Top Station is the highest
                                            point in Munnar, offering
                                            breathtaking panoramic views of the
                                            Western Ghats and the neighboring
                                            valleys of Tamil Nadu. Famous for
                                            its mesmerizing sunrises, this
                                            scenic spot is a paradise for
                                            photographers and nature lovers. As
                                            the morning mist slowly lifts,
                                            visitors can witness the rolling tea
                                            plantations, blue-hued Neelakurinji
                                            flowers &#040;which bloom once in 12
                                            years&#041;.
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
