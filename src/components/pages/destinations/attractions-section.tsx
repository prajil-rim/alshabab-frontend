import { CardProps } from "@/types";
import Attractions from "./attractions";

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
        <section className="max-w-6xl mx-auto py-20 flex flex-col gap-4">
            <div className="space-y-6 py-6">
                <h3 className="font-semibold text-4xl text-center">{title}</h3>
                <p className="font-manrope text-center max-w-3xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                    {description}
                </p>
            </div>
            <Attractions cards={cards} />
        </section>
    );
}
