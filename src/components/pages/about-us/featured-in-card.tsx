import { StrapiImage } from "@/components/common/strapi-image";
import { LinkProps, LogoProps } from "@/types";
import Link from "next/link";
import Markdown from "react-markdown";

const FeaturedInCard = ({
    data,
}: {
    data: {
        id: number;
        description: string;
        name: string;
        url: LinkProps;
        logo: LogoProps;
    };
}) => {
    return (
        <Link
            href={data.url.href}
            target={data.url.isExternal ? "_blank" : "_self"}
            className="h-full group rounded-xl border-2 border-primary lg:border-[#BDBDBD80] flex flex-col justify-center items-center p-2 lg:p-4 hover:border-primary hover:shadow-xl"
            key={data.id}
        >
            <StrapiImage
                src={data.logo?.image?.url || process.env.PLACEHOLDER_IMAGE!}
                alt={data.logo.image.alternativeText || data.logo.logoText}
                width={100}
                height={100}
                className="w-4/5 aspect-3/2 object-contain lg:grayscale group-hover:grayscale-0 transform-all duration-300"
            />
            <span className="text-sm lg:text-lg mb-1 font-semibold font-manrope text-center max-w-[15rem]">
                <Markdown>{data.description}</Markdown>
            </span>
            <div className="h-fit overflow-hidden">
                <span className="font-manrope text-[#767676] font-medium group-hover:text-primary translate-y-5 block group-hover:translate-y-0 transition-transform duration-300">
                    {data.url.text}
                </span>
            </div>
        </Link>
    );
};

export default FeaturedInCard;
