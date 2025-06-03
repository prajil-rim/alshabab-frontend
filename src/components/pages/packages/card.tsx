import { CardProps } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";

const Card = ({
    title,
    description,
    image,
    delete_index,
    label,
}: Readonly<CardProps & { delete_index: number }>) => {
    return (
        <div className="group relative aspect-[1/1.35] overflow-hidden rounded-xl scale-y-100 hover:scale-y-105 transition-all duration-500 origin-bottom">
            <div>
                <Image
                    src={`/images/others/card_${delete_index + 1}.webp`}
                    // src={image.url}
                    alt={
                        image.alternativeText || "Alternative Text not provided"
                    }
                    className="size-full object-cover"
                    width={100}
                    height={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 w-full p-5 text-white z-10">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100 font-manrope text-ellipsis [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                    {description}
                </p>
            </div>
            {label && (
                <div className="absolute top-0 left-0 m-4 flex items-center gap-1 bg-white rounded-full px-2.5 py-1">
                    <Star size={15} className="stroke-yellow-500" />
                    <span className="font-manrope text-sm">{label}</span>
                </div>
            )}
        </div>
    );
};

export default Card;
