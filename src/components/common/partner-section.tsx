import { LogoProps } from "@/types";
import { StrapiImage } from "./strapi-image";
import Leaf from "../icons/leaf";

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
    return (
        <section className="max-w-6xl mx-auto py-10 space-y-6">
            <div className="relative">
                <h1 className="text-4xl font-semibold text-center">{title}</h1>
                {showLeaf && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-7 gap-3">
                {partner_logo.map((logo) => (
                    <StrapiImage
                        // src={logo.image.url}
                        src="http://localhost:3000/images/logo/partners/qatar.webp"
                        alt={logo.image.alternativeText || logo.logoText}
                        key={logo.id}
                        width={100}
                        height={100}
                        className="w-full aspect-3/2 object-contain grayscale hover:grayscale-0 transform-all duration-300"
                    />
                ))}
            </div>
        </section>
    );
};

export default PartnerSection;
