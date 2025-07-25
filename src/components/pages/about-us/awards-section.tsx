import AwardsCarousel from "@/components/carousels/awards-carousel";
import { StrapiImage } from "@/components/common/strapi-image";
import { getImage } from "@/lib/utils";
import { LogoProps } from "@/types";
import Link from "next/link";

interface AwardsSectionProps {
    title: string;
    description: string;
    awards: {
        id: number;
        title: string;
        year: string;
        url: string;
        logo: LogoProps;
    }[];
}

const AwardsSection = ({
    title,
    description,
    awards,
}: Readonly<AwardsSectionProps>) => {
    if (!title || !awards || awards.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto py-10 space-y-3 lg:space-y-6 px-3 lg:px-6 2xl:px-0">
            <h1 className="text-2xl lg:text-4xl font-semibold text-center">
                {title}
            </h1>
            <p className="font-manrope text-center max-w-4xl mx-auto">
                {description}
            </p>
            <div className="grid-cols-4 gap-3 hidden lg:grid">
                {awards.map((award) => (
                    <Link
                        href={award.url}
                        target="_blank"
                        className="aspect-square group rounded-xl border-2 border-[#BDBDBD80] flex flex-col justify-center items-center p-6 hover:border-primary hover:shadow-xl"
                        key={award.id}
                    >
                        <StrapiImage
                            src={getImage({
                                local: process.env.PLACEHOLDER_IMAGE!,
                                prod: award.logo?.image?.url,
                            })}
                            alt={
                                award.logo.image.alternativeText ||
                                award.logo.logoText
                            }
                            width={100}
                            height={100}
                            className="w-4/5 aspect-3/2 object-contain grayscale group-hover:grayscale-0 transform-all duration-300"
                        />
                        <span className="text-xl font-semibold font-manrope text-center max-w-[15rem] mb-3 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                            {award.title}
                        </span>
                        <span className="font-manrope text-lg text-[#767676] font-medium group-hover:text-primary">
                            {award.year}
                        </span>
                    </Link>
                ))}
            </div>

            <AwardsCarousel awards={awards || []} />
        </section>
    );
};

export default AwardsSection;
