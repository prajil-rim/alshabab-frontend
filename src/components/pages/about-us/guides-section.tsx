import { GuideProps } from "@/types";
import GuideCard from "./guide-card";
import GuideCarousel from "@/components/carousels/guide-carousel";

interface GuidesSectionProps {
    title: string;
    description: string;
    guides_list: GuideProps[];
}

const GuidesSection = ({
    title,
    description,
    guides_list,
}: Readonly<GuidesSectionProps>) => {
    if (!title || !guides_list || guides_list.length === 0) return null;

    return (
        <section className="max-w-[1824px] mx-auto py-10 space-y-3 lg:space-y-6 px-3">
            <h1 className="text-2xl lg:text-4xl font-semibold">{title}</h1>
            <p className="font-manrope max-w-3xl">{description}</p>
            <div className="grid-cols-4 gap-3 pt-5 hidden lg:grid">
                {guides_list.map((guide) => (
                    <GuideCard guide={guide} key={guide.id} />
                ))}
            </div>
            <GuideCarousel guides={guides_list || []} />
        </section>
    );
};

export default GuidesSection;
