"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryCard from "../pages/destinations/gallery-card";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import SlideIndicator from "./slide-indicator";
import { GalleryProps } from "@/types";

export default function GalleryCarousel({ cards }: { cards: GalleryProps[] }) {
    const [expanded, setExpanded] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        slidesToScroll: 1,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    return (
        <div className="lg:hidden">
            <AnimatePresence initial={false}>
                {!expanded ? (
                    <motion.div
                        key="carousel"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {cards.slice(0, 4).map((card, index) => (
                                    <div
                                        key={index}
                                        className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_25%] mr-4 rounded shadow"
                                    >
                                        <GalleryCard {...card} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        <SlideIndicator
                            count={cards.slice(0, 4).length}
                            current={selectedIndex + 1}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4"
                    >
                        {cards.map((card, index) => (
                            <div key={index} className="shadow rounded-xl">
                                <GalleryCard {...card} />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Show More Button */}
            <div className="text-center">
                <Button
                    onClick={() => setExpanded(!expanded)}
                    variant={"outline"}
                    className="rounded-full font-manrope border-primary text-primary"
                >
                    {expanded ? "See Less" : "See More"}
                    <ArrowRightUp color="red" />
                </Button>
            </div>
        </div>
    );
}
