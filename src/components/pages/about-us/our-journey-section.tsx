import { StrapiImage } from "@/components/common/strapi-image";
import JourneyLine from "@/components/icons/journey-line";
import { cn } from "@/lib/utils";
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
    return (
        <section className="bg-[#ECF4FF]">
            <div className="max-w-6xl mx-auto py-20 space-y-6">
                <h1 className="font-semibold text-4xl text-center">{title}</h1>
                <div className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    <Markdown>{description}</Markdown>
                </div>
                <div className="relative flex justify-center items-center">
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
                                    // src={journey.image.url}
                                    src="http://localhost:3000/images/others/table.webp"
                                    alt={
                                        journey.image.alternativeText ||
                                        journey.image.url
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
            </div>
        </section>
    );
};

export default OurJourneySection;
