import { CardProps } from "@/types";
import Attractions from "./attractions";
import AttractionsCarousel from "@/components/carousels/attractions-carousel";

interface AttractionsSectionProps {
    title: string;
    description: string;
    cards: CardProps[];
}

export default function AttractionsSection({
    title,
    description,
    cards,
}: Readonly<AttractionsSectionProps>) {
    return (
        <section className="max-w-[1824px] mx-auto py-10 flex flex-col gap-4 px-3">
            <div className="space-y-3 lg:space-y-6 py-6">
                <h3 className="font-semibold text-2xl lg:text-4xl text-center">
                    {title}
                </h3>
                <p className="font-manrope text-center max-w-3xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                    {description}
                </p>
            </div>
            <div className="hidden lg:block">
                <Attractions cards={cards} />
            </div>
            <AttractionsCarousel cards={cards} />
        </section>
    );
}
