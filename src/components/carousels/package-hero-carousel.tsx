import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { StrapiImage } from "../common/strapi-image";
import { getImage } from "@/lib/utils";
import { MediaProps } from "@/types";

type Props = {
    images: MediaProps[];
    open: boolean;
    onClose: () => void;
};

export default function PackageHeroCarousel({ images, open, onClose }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [mainRef, mainApi] = useEmblaCarousel({
        loop: true,
    });

    const [thumbRef, thumbApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const onSelect = useCallback(() => {
        if (!mainApi || !thumbApi) return;
        const index = mainApi.selectedScrollSnap();
        setSelectedIndex(index);
        thumbApi.scrollTo(index);
    }, [mainApi, thumbApi]);

    useEffect(() => {
        if (!mainApi) return;
        onSelect();
        mainApi.on("select", onSelect);
    }, [mainApi, onSelect]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
            >
                <X />
            </button>

            <div className="w-full max-w-5xl">
                {/* Main carousel */}
                <div className="relative">
                    <div className="overflow-hidden rounded-xl" ref={mainRef}>
                        <div className="flex">
                            {images.map((image, i) => (
                                <div
                                    key={i}
                                    className="flex-[0_0_100%] flex items-center justify-center"
                                >
                                    <StrapiImage
                                        src={getImage({
                                            local: "http://localhost:3000/local/new-hero.jpg",
                                            prod: image.url,
                                        })}
                                        alt={image.alternativeText || ""}
                                        width={600}
                                        height={300}
                                        className="max-h-[70vh] object-contain rounded-xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arrows */}
                    <button
                        onClick={() => mainApi?.scrollPrev()}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => mainApi?.scrollNext()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                    >
                        <ChevronRight />
                    </button>
                </div>

                {/* Thumbnails */}
                <div className="mt-4">
                    <div className="overflow-hidden" ref={thumbRef}>
                        <div className="flex gap-3">
                            {images.map((image, i) => (
                                <button
                                    key={i}
                                    onClick={() => mainApi?.scrollTo(i)}
                                    className={`flex-[0_0_100px] rounded-lg overflow-hidden border-2 ${
                                        selectedIndex === i
                                            ? "border-primary"
                                            : "border-transparent"
                                    }`}
                                >
                                    <StrapiImage
                                        src={getImage({
                                            local: "http://localhost:3000/local/new-hero.jpg",
                                            prod: image.url,
                                        })}
                                        alt={image.alternativeText || ""}
                                        width={300}
                                        height={200}
                                        className="h-16 w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
