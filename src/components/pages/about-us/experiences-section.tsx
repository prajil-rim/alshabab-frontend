import ExperiencesCarousel from "@/components/carousels/experiences-carousel";
import CardWithAnimatedParagraph from "@/components/common/card";
import Leaf from "@/components/icons/leaf";
import { CardProps } from "@/types";

function splitIntoThreeParts(n: number): number[] {
    const base = Math.floor(n / 3);
    const remainder = n % 3;

    const result = [base, base, base];
    for (let i = 0; i < remainder; i++) {
        result[i] += 1;
    }

    return result;
}

function chunkArray<T>(arr: T[]): T[][] {
    const sizes = splitIntoThreeParts(arr.length);
    const result: T[][] = [];

    let index = 0;
    for (const size of sizes) {
        result.push(arr.slice(index, index + size));
        index += size;
    }

    return result;
}

interface ExperiencesSectionProps {
    title: string;
    description: string;
    hover_card: CardProps[];
    showLeaf?: boolean;
}

const ExperiencesSection = ({
    title,
    description,
    hover_card,
    showLeaf = false,
}: Readonly<ExperiencesSectionProps>) => {
    if (!title || !hover_card || hover_card.length === 0) return null;

    const cardsArray = chunkArray(hover_card);

    return (
        <section className="max-w-[1824px] mx-auto py-16 space-y-3 md:space-y-6 px-3 lg:px-2">
            <div className="relative">
                <h1 className="text-2xl lg:text-4xl font-semibold text-center">
                    {title}
                </h1>
                {showLeaf && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                )}
            </div>
            <p className="font-manrope text-center max-w-4xl mx-auto">
                {description}
            </p>

            <div className="grid-cols-3 gap-4 pt-5 hidden lg:grid">
                {cardsArray.map((cards, index) => (
                    <div
                        className={`flex flex-col gap-2`}
                        key={index}
                        style={{ aspectRatio: `1 / ${cards.length}` }}
                    >
                        {cards.map((card) => (
                            <CardWithAnimatedParagraph
                                card={card}
                                key={card.id}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <ExperiencesCarousel hover_card={hover_card} />
        </section>
    );
};

export default ExperiencesSection;
