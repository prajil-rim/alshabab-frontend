import { ImageViewer } from "@/components/modal/image-viewer";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { getImage } from "@/lib/utils";
import { MediaProps } from "@/types";
import Image from "next/image";

const Itinerary = ({
    itineraries,
}: {
    itineraries: {
        id: number;
        title: string;
        description: string;
        images: MediaProps[];
    }[];
}) => {
    return (
        <div className="bg-[#FAFAFA] rounded-xl p-3 font-manrope space-y-4">
            {itineraries.map((itinerary) => (
                <ItineraryCard
                    key={itinerary.id}
                    title={itinerary.title}
                    description={itinerary.description}
                    images={itinerary.images}
                />
            ))}
        </div>
    );
};

export default Itinerary;

function ItineraryCard({
    title,
    description,
    images,
}: {
    title: string;
    description: string;
    images: MediaProps[];
}) {
    return (
        <div className="bg-white rounded-xl border hover:border-primary hover:shadow-lg p-3 space-y-4">
            <h4 className="font-playfair-display font-bold text-primary text-lg">
                {title}
            </h4>
            <div className="flex flex-col md:flex-row gap-3">
                <ImageZoom className="cursor-pointer w-full md:w-[45%] h-[200px] md:h-[285px]">
                    <Image
                        src={getImage({
                            local: "/images/destination-form/alleppy.jpg",
                            prod: images[0].url,
                        })}
                        alt={images[0].alternativeText || "image"}
                        fill
                        className="w-full h-[200px] md:h-[285px] rounded-md"
                    />
                </ImageZoom>
                <div className="flex-1 h-[285px] flex flex-col justify-between">
                    <p className="text-[#202020]/50 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:6] [-webkit-box-orient:vertical]">
                        {description}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        {images[1] && (
                            <ImageZoom className="w-full laspect-[1/0.9]">
                                <Image
                                    src={getImage({
                                        local: "/local/image2.webp",
                                        prod: images[1].url,
                                    })}
                                    alt={images[1].alternativeText || "image"}
                                    fill
                                    className="rounded-md"
                                />
                            </ImageZoom>
                        )}
                        {images[2] && (
                            <ImageZoom className="w-full aspect-[1/0.9]">
                                <Image
                                    src={getImage({
                                        local: "/local/image2.webp",
                                        prod: images[2].url,
                                    })}
                                    alt={images[2].alternativeText || "image"}
                                    fill
                                    className="rounded-md"
                                />
                            </ImageZoom>
                        )}
                        {images[3] && images[4] ? (
                            <ImageViewer images={images} />
                        ) : (
                            images[3] && (
                                <ImageZoom className="w-full aspect-[1/0.9]">
                                    <Image
                                        src={getImage({
                                            local: "/local/image2.webp",
                                            prod: images[3].url,
                                        })}
                                        alt={
                                            images[3].alternativeText || "image"
                                        }
                                        fill
                                        className="rounded-md"
                                    />
                                </ImageZoom>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
