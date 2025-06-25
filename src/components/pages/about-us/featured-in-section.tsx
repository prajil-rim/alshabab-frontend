import { LinkProps, LogoProps } from "@/types";
import FeaturedInCard from "./featured-in-card";
import FeaturedInCarousel from "@/components/carousels/featured-in-carousel";

interface FeaturedInSectionProps {
    title: string;
    description: string;
    featured: {
        id: number;
        description: string;
        name: string;
        url: LinkProps;
        logo: LogoProps;
    }[];
}

const FeaturedInSection = ({
    title,
    description,
    featured,
}: Readonly<FeaturedInSectionProps>) => {
    if (!title || !featured || featured.length === 0) return null;
    return (
        <section className="max-w-7xl mx-auto py-10 space-y-3 lg:space-y-6 px-3">
            <h1 className="text-2xl lg:text-4xl font-semibold text-center">
                {title}
            </h1>
            <p className="font-manrope text-center max-w-4xl mx-auto">
                {description}
            </p>
            <div className="grid-cols-4 gap-3 hidden lg:grid">
                {featured.map((data) => (
                    <FeaturedInCard data={data} key={data.id} />
                ))}
            </div>
            <FeaturedInCarousel data={featured} />
        </section>
    );
};

export default FeaturedInSection;
