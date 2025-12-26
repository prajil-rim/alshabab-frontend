import { Link } from "@/i18n/navigation";
import { getImage } from "@/lib/utils";
import { PackageBannerProps } from "@/types";
import Image from "next/image";

const Banner = ({ data }: { data: PackageBannerProps }) => {
    if (!data || !data.image || !data.button) return null;
    return (
        <Link
            href={data.button.href}
            target={data.button.isExternal ? "_blank" : "_self"}
            className="md:col-span-2 w-full"
        >
            <div className="w-full rounded-xl hidden lg:block h-53">
                <Image
                    src={getImage({
                        local: "/local/bottom-banner.webp",
                        prod: data.image.url,
                    })}
                    alt={data.image.alternativeText || ""}
                    width={700}
                    height={200}
                    className="w-full object-cover"
                />
            </div>
        </Link>
    );
};

export default Banner;
