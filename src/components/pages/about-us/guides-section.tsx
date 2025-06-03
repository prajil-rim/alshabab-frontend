import { StrapiImage } from "@/components/common/strapi-image";
import { MediaProps } from "@/types";
import { Globe, Star } from "lucide-react";
import Link from "next/link";

interface GuidesSectionProps {
    title: string;
    description: string;
    guides_list: {
        id: number;
        name: string;
        label: string;
        image: MediaProps;
        languages: {
            id: number;
            label: string;
        }[];
        expertise: {
            id: number;
            label: string;
        }[];
        socials: {
            id: number;
            href: string;
            isExternal: boolean;
            label: string;
            icon: MediaProps;
        }[];
    }[];
}

const GuidesSection = ({
    title,
    description,
    guides_list,
}: Readonly<GuidesSectionProps>) => {
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <p className="font-manrope max-w-3xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid grid-cols-4 gap-3 pt-5">
                {guides_list.map((guide) => (
                    <div
                        className="rounded-xl bg-cover bg-center h-96 relative overflow-hidden group"
                        style={{
                            // backgroundImage: `url(${guide.image.url})`,
                            backgroundImage:
                                "url('/images/others/avatar.webp')",
                        }}
                        key={guide.id}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20 group-hover:opacity-50 transition-opacity duration-300"></div>

                        <div className="flex flex-col justify-between relative h-full z-10">
                            <div className="flex items-center m-5 gap-1 bg-[#FFFFEF] rounded-full px-3 py-1 w-fit">
                                <Star size={15} className="text-yellow-500" />
                                <span className="font-manrope text-xs font-semibold">
                                    {guide.label}
                                </span>
                            </div>
                            <div className="space-y-2 p-4 relative">
                                {/* Overlay */}
                                <div className="absolute !mb-0 inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="flex justify-between items-center bg-white/27 rounded-full px-3 py-1 backdrop-blur-md text-white translate-y-[150%] group-hover:translate-y-0 group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-300">
                                    <h4 className="text-xl font-semibold">
                                        {guide.name}
                                    </h4>
                                    <div className="flex gap-1 items-center">
                                        {/* socials */}
                                        {guide.socials.map((social) => (
                                            <Link
                                                href={social.href}
                                                key={social.id}
                                                target={
                                                    social.isExternal
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                                className="shrink-0"
                                            >
                                                <StrapiImage
                                                    // src={social.icon.url}
                                                    src="http://localhost:3000/images/icons/instagram.svg"
                                                    alt={
                                                        social.icon
                                                            .alternativeText ||
                                                        "Alternative Text not provided"
                                                    }
                                                    width={20}
                                                    height={20}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="translate-y-[150%] space-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="flex items-start gap-1 text-white font-manrope px-3">
                                        <Globe size={15} className="shrink-0" />
                                        <ul className="flex items-center flex-wrap gap-0.5 text-xs font-light">
                                            {guide.languages.map((language) => (
                                                <li key={language.id}>
                                                    {language.label},
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex items-start gap-1 text-white font-manrope px-3">
                                        <Star size={15} className="shrink-0" />
                                        <ul className="flex items-center gap-0.5 text-xs font-light flex-wrap">
                                            {guide.expertise.map(
                                                (expertise) => (
                                                    <li
                                                        className="whitespace-nowrap"
                                                        key={expertise.id}
                                                    >
                                                        {expertise.label},
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GuidesSection;
