import { StrapiImage } from "@/components/common/strapi-image";
import IndiaMappin from "@/components/icons/india-mappin";
import JourneyLine from "@/components/icons/journey-line";
import UAEMappin from "@/components/icons/uae-mappin";
import { cn, getImage } from "@/lib/utils";
import { MediaProps } from "@/types";
import Markdown from "react-markdown";

interface OurJourneySectionProps {
    title: string;
    description: string;
    journey_details: {
        id: number;
        year: string;
        title: string;
        description: string;
        image: MediaProps;
    }[];
}

const OurJourneySection = ({
    title,
    description,
    journey_details,
}: Readonly<OurJourneySectionProps>) => {
    if (!title || !journey_details || journey_details.length === 0) return null;

    return (
        <section className="bg-[#ECF4FF]">
            <div className="max-w-6xl mx-auto py-10 space-y-3 lg:space-y-6 px-3 lg:px-6 2xl:px-0">
                <h1 className="font-semibold text-4xl text-center">{title}</h1>
                <div className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    <Markdown>{description}</Markdown>
                </div>

                {/* For Large Screen */}
                <div className="relative justify-center items-center hidden lg:flex">
                    <JourneyLine />
                    <div className="absolute inset-0 size-full py-28">
                        {journey_details.map((journey, i) => (
                            <div
                                className={cn(
                                    "h-1/4 flex items-center justify-end gap-12",
                                    i % 2 ? "flex-row-reverse" : ""
                                )}
                                key={journey.id}
                            >
                                <span className="font-extrabold text-4xl font-manrope me-5">
                                    {journey.year}
                                </span>
                                <StrapiImage
                                    src={getImage({
                                        local: process.env.PLACEHOLDER_IMAGE!,
                                        prod: journey.image?.url,
                                    })}
                                    alt={
                                        journey.image?.alternativeText ||
                                        "Alternative Text not provided"
                                    }
                                    width={200}
                                    height={200}
                                    className={cn(
                                        "rounded-xl aspect-[1.2/1] w-72 [box-shadow:-25px_25px_0px_0px_rgba(0,0,0,0.13)] object-cover object-center",
                                        i % 2 ? "rotate-6" : "-rotate-6"
                                    )}
                                />
                                <div className="space-y-5">
                                    <h3 className="text-3xl font-semibold">
                                        {journey.title}
                                    </h3>
                                    <p className="font-manrope max-w-sm overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:6] [-webkit-box-orient:vertical]">
                                        {journey.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* For Small Screen */}
                <div className="relative py-20 lg:hidden">
                    <ul className="relative z-10 space-y-8">
                        {journey_details.map((journey) => (
                            <li className="flex gap-4" key={journey.id}>
                                <div className="size-4 rounded-full bg-[#C8CFD8] border-4 border-secondary shrink-0 ms-2 mt-2"></div>
                                <div className="space-y-2">
                                    <span className="font-extrabold text-2xl font-manrope block">
                                        {journey.year}
                                    </span>
                                    <h1 className="text-xl font-semibold">
                                        {journey.title}
                                    </h1>
                                    <p className="font-manrope">
                                        {journey.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="absolute w-1 h-full border-2 border-dashed border-[#C8CFD8] left-0 top-0 ms-3.5"></div>
                    <span className="absolute top-0 -left-1.5 bg-[#ECF4FF]">
                        <UAEMappin />
                    </span>
                    <span className="absolute bottom-0 -left-1.5 bg-[#ECF4FF]">
                        <IndiaMappin />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default OurJourneySection;
