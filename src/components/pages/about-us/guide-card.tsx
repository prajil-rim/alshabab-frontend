import { StrapiImage } from "@/components/common/strapi-image";
import { getImage } from "@/lib/utils";
import { GuideProps } from "@/types";
import { Globe, Star } from "lucide-react";
import Link from "next/link";

const GuideCard = ({ guide }: { guide: GuideProps }) => {
    return (
        <div
            className="rounded-xl bg-cover bg-center aspect-[1/1.3] lg:aspect-auto lg:h-96 relative overflow-hidden group"
            style={{
                backgroundImage: `url(${getImage({
                    local: process.env.PLACEHOLDER_IMAGE!,
                    prod: guide.image?.url,
                })})`,
            }}
            key={guide.id}
        >
            {/* Overlay */}
            <div className="absolute opacity-50 lg:opacity-100 inset-0 bg-gradient-to-t from-black/50 to-black/20 group-hover:opacity-50 transition-opacity duration-300"></div>

            <div className="flex flex-col justify-between relative h-full z-10">
                <div className="flex items-center m-5 gap-1 bg-[#FFFFEF] rounded-full px-3 py-1 w-fit">
                    <Star size={15} className="text-yellow-500" />
                    <span className="font-manrope text-xs font-semibold">
                        {guide.label}
                    </span>
                </div>
                <div className="space-y-2 p-4 relative">
                    {/* Overlay */}
                    <div className="absolute !mb-0 inset-0 bg-gradient-to-t from-black to-transparent lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="flex relative z-10 justify-between items-center lg:bg-white/27 rounded-full px-3 py-1 lg:backdrop-blur-md text-white lg:translate-y-[150%] group-hover:translate-y-0 group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-300">
                        <h4 className="text-2xl lg:text-xl font-semibold">
                            {guide.name}
                        </h4>
                        <div className="flex gap-1 items-center">
                            {/* socials */}
                            {guide.socials?.map((social) => (
                                <Link
                                    href={social.href}
                                    key={social.id}
                                    target={
                                        social.isExternal ? "_blank" : "_self"
                                    }
                                    className="shrink-0"
                                >
                                    <StrapiImage
                                        src={getImage({
                                            local: process.env
                                                .PLACEHOLDER_IMAGE!,
                                            prod: social.icon?.url,
                                        })}
                                        alt={""}
                                        width={20}
                                        height={20}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="lg:translate-y-[150%] relative z-10 space-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <div className="flex items-center lg:items-start gap-1 text-white font-manrope px-3">
                            <Globe size={15} className="shrink-0" />
                            <ul className="flex items-center flex-wrap gap-0.5 text-sm lg:text-xs font-light">
                                {guide.languages.map((language) => (
                                    <li key={language.id}>{language.label},</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center lg:items-start gap-1 text-white font-manrope px-3">
                            <Star size={15} className="shrink-0" />
                            <ul className="flex items-center gap-0.5 text-sm lg:text-xs font-light flex-wrap">
                                {guide.expertise.map((expertise) => (
                                    <li
                                        className="whitespace-nowrap"
                                        key={expertise.id}
                                    >
                                        {expertise.label},
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideCard;
