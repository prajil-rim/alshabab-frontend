import { StrapiImage } from "@/components/common/strapi-image";
import Leaf from "@/components/icons/leaf";
import { MediaProps } from "@/types";

interface WhyUsSectionProps {
    title: string;
    description: string;
    cards: {
        id: number;
        title: string;
        description: string;
        image: MediaProps | null;
        icon: MediaProps | null;
        isImageOnly: boolean;
    }[];
    video: MediaProps;
}

const WhyUsSection = ({
    title,
    description,
    video,
    cards,
}: Readonly<WhyUsSectionProps>) => {
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <div className="relative">
                <h1 className="font-semibold text-4xl text-center">{title}</h1>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                    <Leaf />
                </div>
            </div>
            <p className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid grid-cols-3 gap-3 pt-5">
                {cards[0].isImageOnly ? (
                    <ImageOnlyCard
                        url={cards[0].image?.url || ""}
                        alt={
                            cards[0].image?.alternativeText ||
                            "Alternative Text not provided"
                        }
                    />
                ) : (
                    <Card {...cards[0]} />
                )}
                <div className="rounded-xl row-span-3 overflow-hidden">
                    <video
                        src="/videos/vid1.webm"
                        // src={video.url}
                        className="w-full object-center object-cover"
                        autoPlay
                        muted
                        loop
                    ></video>
                </div>
                {cards
                    .slice(1)
                    .map((card) =>
                        card.isImageOnly ? (
                            <ImageOnlyCard
                                url={card.image?.url || ""}
                                alt={
                                    card.image?.alternativeText ||
                                    "Alternative Text not provided"
                                }
                                key={card.id}
                            />
                        ) : (
                            <Card {...card} key={card.id} />
                        )
                    )}
            </div>
        </section>
    );
};

export default WhyUsSection;

function Card({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: MediaProps | null;
}) {
    return (
        <div className="rounded-xl space-y-4 bg-[#F5F1E3]/60 p-6">
            <StrapiImage
                // src={icon?.url || ""}
                src="http://localhost:3000/images/icons/map-pin.webp"
                alt={icon?.alternativeText || ""}
                width={40}
                height={40}
            />
            <h6 className="text-2xl font-bold font-manrope">{title}</h6>
            <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
        </div>
    );
}

function ImageOnlyCard({ url, alt }: { url: string; alt: string }) {
    return (
        <div className="rounded-xl overflow-hidden aspect-video">
            <StrapiImage
                // src={url}
                src="http://localhost:3000/images/others/pp.webp"
                alt={alt}
                width={150}
                height={100}
                className="w-full object-cover object-center"
            />
        </div>
    );
}
