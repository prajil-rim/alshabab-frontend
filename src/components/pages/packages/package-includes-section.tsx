import { CardProps } from "@/types";
import Card from "./card";
import PackageIncludesCarousel from "@/components/carousels/package-includes-carousel";

interface PackageIncludesProps {
    title: string;
    description: string;
    package_includes: CardProps[];
}

const PackageIncludesSection = ({
    title,
    description,
    package_includes,
}: Readonly<PackageIncludesProps>) => {
    if (!package_includes || package_includes.length === 0 || !title)
        return null;
    return (
        <section className="max-w-6xl mx-auto pt-20 pb-24 space-y-6 px-3 lg:px-2">
            <h2 className="text-2xl lg:text-4xl font-semibold">{title}</h2>
            <p className="font-manrope max-w-5xl overflow-hidden text-ellipsis [display:-webkit-box] lg:[-webkit-line-clamp:3] [-webkit-line-clamp:7] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-7 hidden sm:grid">
                {package_includes.map((card) => (
                    <Card key={card.id} {...card} />
                ))}
            </div>
            <PackageIncludesCarousel
                package_includes={package_includes || []}
            />
        </section>
    );
};

export default PackageIncludesSection;
