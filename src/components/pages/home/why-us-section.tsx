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
    if (!title || !cards || cards.length === 0) return null;

    return (
        <section className="max-w-6xl mx-auto py-10 md:pb-20 space-y-3 lg:space-y-6 px-3 lg:px-2">
            <div className="relative">
                <h1 className="text-2xl font-semibold lg:text-4xl text-center">
                    {title}
                </h1>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                    <Leaf />
                </div>
            </div>
            <p className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid lg:grid-cols-3 gap-3 pt-5 md:max-w-md mx-auto lg:max-w-full lg:mx-0">
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
                <div className="rounded-xl aspect-[1/1.3] min-[1150px]:aspect-auto row-span-2 min-[1150px]:row-span-3 overflow-hidden">
                    <video
                        src={video.url}
                        className="size-full object-center object-cover"
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
        <div className="rounded-xl space-y-2 bg-[#F5F1E3]/60 p-6">
            <StrapiImage
                src={icon?.url || process.env.PLACEHOLDER_IMAGE!}
                alt={icon?.alternativeText || "Alternative Text not provided"}
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
        <div className="rounded-xl overflow-hidden aspect-video hidden min-[1150px]:block">
            <StrapiImage
                src={url || process.env.PLACEHOLDER_IMAGE!}
                alt={alt || "Alternative Text not provided"}
                width={200}
                height={150}
                className="w-full object-cover object-center"
            />
        </div>
    );
}
