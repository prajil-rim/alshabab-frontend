import { LogoProps } from "@/types";
import { StrapiImage } from "./strapi-image";
import Leaf from "../icons/leaf";
import { Marquee } from "../magicui/marquee";

interface PartnerSectionProps {
    title: string;
    partner_logo: LogoProps[];
    showLeaf?: boolean;
}

const PartnerSection = ({
    title,
    partner_logo,
    showLeaf = false,
}: Readonly<PartnerSectionProps>) => {
    if (partner_logo && partner_logo.length < 0) {
        return null;
    }

    return (
        <section className="max-w-7xl mx-auto py-10 space-y-6">
            <div className="relative">
                <h1 className="text-2xl lg:text-4xl font-semibold text-center">
                    {title}
                </h1>
                {showLeaf && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                )}
            </div>

            <Marquee pauseOnHover className="[--duration:20s]">
                {partner_logo.map((partner) => (
                    <StrapiImage
                        src={
                            partner.image?.url ||
                            "http://localhost:3000/images/partner-logo.png"
                        }
                        alt={partner.image?.alternativeText || partner.logoText}
                        key={partner.id}
                        width={100}
                        height={100}
                        className="w-full aspect-3/2 object-contain grayscale hover:grayscale-0 transform-all duration-300"
                    />
                ))}
            </Marquee>
        </section>
    );
};

export default PartnerSection;
