import { StrapiImage } from "@/components/common/strapi-image";
import { RouteProps } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const RouteCard = ({
    title,
    description,
    icon,
    google_map_link,
}: Readonly<RouteProps>) => {
    return (
        <div className="rounded-xl border-2 border-primary lg:border-[#666666]/20 px-3 py-8 font-manrope text-center relative space-y-3.5 group hover:border-primary hover:shadow-xl transition-colors duration-200 active:border-primary">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white p-1">
                <StrapiImage
                    src={icon?.image?.url || process.env.PLACEHOLDER_IMAGE!}
                    alt={icon?.image?.alternativeText || ""}
                    className="group-hover:filter-[sepia(1)_hue-rotate(-50deg)_saturate(3.6)] filter-[sepia(1)_hue-rotate(-50deg)_saturate(3.6)] lg:[filter:none] transition-all duration-200"
                    width={40}
                    height={40}
                />
            </div>
            <h6 className="font-semibold text-sm md:text-base max-w-[12rem] mx-auto">
                {title}
            </h6>
            <p className="font-light text-xs lg:text-sm">{description}</p>
            <div className="flex justify-end">
                <Link
                    href={google_map_link.href}
                    target={google_map_link.isExternal ? "_blank" : "_self"}
                    className="font-semibold text-xs lg:text-sm text-[#666666] flex items-center underline gap-0.5"
                >
                    Get Direction <ArrowUpRight size={15} />
                </Link>
            </div>
        </div>
    );
};

export default RouteCard;
