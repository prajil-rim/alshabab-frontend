import ArrowRightUp from "@/components/icons/arrow-right-up";
import Tags from "@/components/icons/tags";
import { DealsProps } from "@/types";
import Link from "next/link";
import { Fragment } from "react";

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
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <h1 className="text-4xl font-semibold text-center">{title}</h1>
            <p className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid grid-cols-5 gap-3">
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
                            <div
                                className="h-80 rounded-xl bg-cover bg-center relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:to-transparent overflow-hidden"
                                style={{
                                    // backgroundImage: `url(${package_.hero.background.url})`,
                                    backgroundImage: `url(/images/hero/blog_listing_hero.webp)`,
                                }}
                            >
                                <div className="flex flex-col justify-between text-white relative z-10 h-full p-6">
                                    <ul className="flex items-center gap-1 font-manrope text-xs font-semibold bg-white px-3 py-1 rounded-full text-black w-fit ms-auto">
                                        {package_.packages_for.map(
                                            (value, i) => (
                                                <Fragment key={value.id}>
                                                    <li>{value.label}</li>
                                                    {i !==
                                                    package_.packages_for
                                                        .length -
                                                        1 ? (
                                                        <span>•</span>
                                                    ) : null}
                                                </Fragment>
                                            )
                                        )}
                                    </ul>
                                    <div className="space-y-3">
                                        <h6 className="font-semibold text-3xl">
                                            {package_.package}
                                        </h6>
                                        <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                                            {package_.summary}
                                        </p>
                                        <div className="flex items-center justify-between font-manrope">
                                            <span className="flex items-center text-lg gap-2 font-bold lowercase">
                                                <Tags /> ₹ {package_.price}/
                                                {package_.price_per}
                                            </span>
                                            <ArrowRightUp />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default DealsSection;
