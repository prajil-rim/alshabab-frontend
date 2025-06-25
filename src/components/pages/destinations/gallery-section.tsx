"use client";

import { useState } from "react";
import { GalleryProps } from "@/types";
import GalleryCard from "./gallery-card";
import { Button } from "@/components/ui/button";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import GalleryCarousel from "@/components/carousels/gallery-carousel";

interface GallerySectionProps {
    title: string;
    description: string;
    gallery: GalleryProps[];
}

const INITIAL_LIMIT = 16;
const LOAD_MORE_COUNT = 16;

const GallerySection = ({
    title,
    description,
    gallery,
}: Readonly<GallerySectionProps>) => {
    const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
    };

    const visibleGallery = gallery.slice(0, visibleCount);
    const hasMoreToShow = visibleCount < gallery.length;

    return (
        <section className="max-w-[1824px] mx-auto py-10 space-y-12 text-center px-3 lg:px-2">
            <div className="space-y-6">
                <h1 className="text-2xl lg:text-4xl font-semibold">{title}</h1>
                <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                    {description}
                </p>
            </div>

            <div className="relative hidden lg:block">
                <div className="grid lg:grid-cols-4 gap-3">
                    {visibleGallery.map((gallery_) => (
                        <GalleryCard {...gallery_} key={gallery_.id} />
                    ))}
                </div>

                {hasMoreToShow && (
                    <>
                        <div className="absolute w-full h-1/4 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent rounded-b-xl z-20 pointer-events-none" />
                        <Button
                            onClick={handleShowMore}
                            variant={"outline"}
                            className="absolute rounded-full font-manrope border border-primary text-primary bg-transparent z-30 bottom-0 left-1/2 -translate-x-1/2 cursor-pointer hover:bg-primary hover:text-white"
                        >
                            Show More <ArrowRightUp color="red" />
                        </Button>
                    </>
                )}
            </div>

            <GalleryCarousel
                cards={[
                    ...gallery,
                    ...gallery,
                    ...gallery,
                    ...gallery,
                    ...gallery,
                ]}
            />
        </section>
    );
};

export default GallerySection;
