import { CardProps } from "@/types";
import Card from "./card";

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
        <section className="max-w-6xl mx-auto pt-20 pb-24 space-y-6">
            <h2 className="text-4xl font-semibold">{title}</h2>
            <p className="font-manrope max-w-5xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid grid-cols-4 gap-4 pt-7">
                {package_includes.map((card, i) => (
                    <Card key={card.id} {...card} delete_index={i} />
                ))}
            </div>
        </section>
    );
};

export default PackageIncludesSection;
