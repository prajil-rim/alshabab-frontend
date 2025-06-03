import CardWithAnimatedParagraph from "@/components/common/card";
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
}

const ExperiencesSection = ({
    title,
    description,
    hover_card,
}: Readonly<ExperiencesSectionProps>) => {
    const cardsArray = chunkArray(hover_card);

    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <h1 className="text-4xl font-semibold text-center">{title}</h1>
            <p className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid grid-cols-3 gap-4 pt-5">
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
        </section>
    );
};

export default ExperiencesSection;
