"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion as m } from "framer-motion";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import Link from "next/link";
import { SlideProps } from "@/types";
import { useTranslations } from "next-intl";
import { getImage } from "@/lib/utils";

export default function CardSlider({ slides }: { slides: SlideProps[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const t = useTranslations("common");

    const handleHover = (index: number) => {
        setActiveIndex(index);
    };

    const handleHoverOut = () => {
        setActiveIndex(null);
    };

    return (
        <div className="w-full max-w-7xl mx-auto hidden lg:block">
            <div
                className="flex gap-4 overflow-hidden"
                onMouseLeave={handleHoverOut}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        onMouseEnter={() => handleHover(index)}
                        className={`transition-all duration-300 ease-in-out h-80 ${
                            activeIndex === index
                                ? "w-2/5"
                                : activeIndex === null && index === 0
                                ? "w-2/5"
                                : "w-1/5"
                        }`}
                    >
                        <div
                            className="h-full rounded-xl bg-cover bg-center text-[#F5F5F5] relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:to-transparent overflow-hidden flex justify-center items-end"
                            style={{
                                backgroundImage: `url(${getImage({
                                    local: process.env.PLACEHOLDER_IMAGE!,
                                    prod: slide.image.url,
                                })})`,
                            }}
                        >
                            <div className="relative z-10 space-y-3 p-4 flex flex-col justify-center items-center">
                                <h6 className="font-semibold text-2xl text-center">
                                    {slide.title}
                                </h6>
                                <m.div
                                    className="flex flex-col justify-center items-center gap-3"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={
                                        activeIndex === index ||
                                        (activeIndex === null && index === 0)
                                            ? { opacity: 1, height: "auto" }
                                            : {}
                                    }
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-center text-sm font-manrope max-w-[21rem] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                                        {slide.description}
                                    </p>
                                    <Link href={slide.cta?.href || "/"}>
                                        <Button
                                            variant="outline"
                                            size={"sm"}
                                            className="bg-transparent rounded-full font-manrope text-xs cursor-pointer"
                                        >
                                            {slide.cta?.text ||
                                                t("exploreMore")}{" "}
                                            <ArrowRightUp color="red" />
                                        </Button>
                                    </Link>
                                </m.div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
