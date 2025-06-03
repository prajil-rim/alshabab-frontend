import { StrapiImage } from "@/components/common/strapi-image";
import { LinkProps, LogoProps } from "@/types";
import Link from "next/link";
import Markdown from "react-markdown";

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
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <h1 className="text-4xl font-semibold text-center">{title}</h1>
            <p className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid grid-cols-4 gap-3">
                {featured.map((data) => (
                    <Link
                        href={data.url.href}
                        target={data.url.isExternal ? "_blank" : "_self"}
                        className="aspect-square group rounded-xl border-2 border-[#BDBDBD80] flex flex-col justify-center items-center p-4 hover:border-primary hover:shadow-xl"
                        key={data.id}
                    >
                        <StrapiImage
                            // src={data.logo.image.url}
                            src="http://localhost:3000/images/logo/featured/travelbiz.webp"
                            alt={
                                data.logo.image.alternativeText ||
                                data.logo.logoText
                            }
                            width={100}
                            height={100}
                            className="w-4/5 aspect-3/2 object-contain grayscale group-hover:grayscale-0 transform-all duration-300"
                        />
                        <span className="text-lg mb-1 font-semibold font-manrope text-center max-w-[15rem] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                            <Markdown>{data.description}</Markdown>
                        </span>
                        <div className="h-fit overflow-hidden">
                            <span className="font-manrope text-[#767676] font-medium group-hover:text-primary translate-y-5 block group-hover:translate-y-0 transition-transform duration-300">
                                {data.url.text}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeaturedInSection;
