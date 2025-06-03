import { StrapiImage } from "@/components/common/strapi-image";
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
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <h1 className="text-4xl font-semibold text-center">{title}</h1>
            <p className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid grid-cols-4 gap-3">
                {awards.map((award) => (
                    <Link
                        href={award.url}
                        target="_blank"
                        className="aspect-square group rounded-xl border-2 border-[#BDBDBD80] flex flex-col justify-center items-center p-6 hover:border-primary hover:shadow-xl"
                        key={award.id}
                    >
                        <StrapiImage
                            // src={award.logo.image.url}
                            src="http://localhost:3000/images/logo/awards/kerala.webp"
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
        </section>
    );
};

export default AwardsSection;
