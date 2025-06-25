import Leaf from "@/components/icons/leaf";
import FaqAccordion from "./faq-accordion";

interface FAQProps {
    title: string;
    description: string;
    faqs: {
        id: number;
        question: string;
        answer: string;
    }[];
    showLeaf?: boolean;
}

const FAQSection = ({
    title,
    description,
    faqs,
    showLeaf = false,
}: Readonly<FAQProps>) => {
    if (!faqs || faqs.length === 0 || !title || !description) return null;

    // Split FAQs into two columns
    const mid = Math.ceil(faqs.length / 2);
    const firstHalf = faqs.slice(0, mid);
    const secondHalf = faqs.slice(mid);

    return (
        <section className="max-w-[1824px] mx-auto py-10 lg:py-24 text-center space-y-6 px-3 lg:px-2">
            <div className="relative">
                <h1 className="text-2xl lg:text-4xl font-semibold">{title}</h1>
                {showLeaf && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                )}
            </div>
            <p className="font-manrope max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:7] [-webkit-box-orient:vertical]">
                {description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-10 mb-10 lg:mb-0">
                <div className="space-y-3">
                    {firstHalf.map((faq) => (
                        <FaqAccordion
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
                <div className="space-y-3">
                    {secondHalf.map((faq) => (
                        <FaqAccordion
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
