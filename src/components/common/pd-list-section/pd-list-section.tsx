import { CardProps } from "@/types";
import PDListCarousel from "../../carousels/pd-list-carousel";
import PDListCard from "./pd-list-card";

interface PDListSectionProps {
    title: string;
    description: string;
    hover_card: CardProps[];
}

const PDListSection = ({
    title,
    description,
    hover_card,
}: Readonly<PDListSectionProps>) => {
    if (!hover_card || hover_card.length === 0) return null;
    return (
        <section className="max-w-[1824px] mx-auto py-10 space-y-3 lg:space-y-6 px-3">
            <h1 className="text-2xl lg:text-4xl font-semibold">{title}</h1>
            <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:6] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="gap-4 hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {hover_card.map((card) => (
                    <PDListCard card={card} key={card.id} />
                ))}
            </div>

            <PDListCarousel hover_card={hover_card || []} />
        </section>
    );
};

export default PDListSection;
