import { cn, getImage } from "@/lib/utils";
import { MediaProps } from "@/types";
import Image from "next/image";
import React from "react";

type PropType = {
    selected: boolean;
    index: number;
    onClick: () => void;
    image: MediaProps;
};

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, onClick, image } = props;

    return (
        <div className="[flex:0_0_25%] md:[flex:0_0_22%] min-w-0 pl-[0.8rem]">
            <button
                onClick={onClick}
                type="button"
                className={cn(
                    "aspect-square md:h-24 w-full rounded-lg border relative overflow-hidden",
                    selected && "border-2 border-secondary"
                )}
            >
                <Image
                    src={getImage({
                        local: "/local/image3.webp",
                        prod: image.url,
                    })}
                    alt={image.alternativeText || ""}
                    fill
                    className="object-cover"
                />
            </button>
        </div>
    );
};
