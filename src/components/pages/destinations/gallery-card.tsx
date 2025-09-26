"use client";

import Instagram from "@/components/icons/instagram";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { getImage } from "@/lib/utils";
import { GalleryProps } from "@/types";
import Image from "next/image";

const GalleryCard = ({ label, image }: GalleryProps) => {
    return (
        <div className="rounded-xl bg-cover bg-center aspect-[1/1.1] flex items-end text-white font-manrope relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 after:to-transparent overflow-hidden">
            <ImageZoom className="cursor-pointer z-20 size-full">
                <Image
                    alt="Gallery image"
                    fill
                    src={getImage({
                        local: "/images/destination-form/alleppy.jpg",
                        prod: image?.url,
                    })}
                    className="size-full cursor-pointer"
                />
            </ImageZoom>
            <span className="absolute text-xs md:text-base z-30 flex items-center gap-1 p-3.5">
                <Instagram />
                {label}
            </span>
        </div>
    );
};

export default GalleryCard;
