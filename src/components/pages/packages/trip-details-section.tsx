import InfoBlock from "@/components/common/info-block";
import { InfoBlockProps } from "@/types";

interface PackageIncludesProps {
    title: string;
    description: string;
    details: InfoBlockProps[];
}

const TripDetailsSection = ({
    title,
    description,
    details,
}: Readonly<PackageIncludesProps>) => {
    if (!details || details.length === 0 || !title) return null;

    return (
        <section className="bg-[#F5F5F5]">
            <div className="max-w-6xl mx-auto py-20 space-y-6">
                <h1 className="text-4xl font-semibold text-center">{title}</h1>
                <p className="font-manrope max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical] text-center">
                    {description}
                </p>
                <div>
                    {details.map((values, i) => (
                        <InfoBlock key={values.id + i} {...values} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TripDetailsSection;
