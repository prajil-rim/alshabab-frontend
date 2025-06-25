import DealsCarousel from "@/components/carousels/deals-carousel";
import { DealsProps } from "@/types";
import Link from "next/link";
import DealCard from "./deal-card";

interface DealsSectionProps {
    title: string;
    description: string;
    packages: DealsProps[];
}

const DealsSection = ({
    title,
    description,
    packages,
}: Readonly<DealsSectionProps>) => {
    return (
        <section className="max-w-7xl mx-auto py-10 space-y-3 lg:space-y-6 px-3">
            <h1 className="text-2xl lg:text-4xl font-semibold text-center">
                {title}
            </h1>
            <p className="font-manrope text-center max-w-4xl mx-auto">
                {description}
            </p>
            <div className="grid-cols-5 gap-3 hidden lg:grid">
                {packages.map((package_, index) => {
                    const group = Math.floor(index / 6);
                    const base = group * 6;

                    const redIndexes = [
                        base + Math.max(0, group - 1), // progressively offset by group
                        base + Math.max(0, group - 1) + 3,
                        base + Math.max(0, group - 1) + 4,
                    ];

                    const isLong = redIndexes.includes(index);
                    return (
                        <Link
                            href={"/"}
                            className={isLong ? "col-span-3" : "col-span-2"}
                            key={package_.id}
                        >
                            <DealCard package_={package_} />
                        </Link>
                    );
                })}
            </div>

            <DealsCarousel packages={packages} />
        </section>
    );
};

export default DealsSection;
