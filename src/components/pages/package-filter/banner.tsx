import Call from "@/components/icons/call";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getImage } from "@/lib/utils";
import { PackageBannerProps } from "@/types";
import Image from "next/image";

const Banner = ({ data }: { data: PackageBannerProps }) => {
    if (!data || !data.image || !data.title || !data.button) return null;
    return (
        <div className="w-full rounded-xl md:col-span-2 grid-cols-2 overflow-hidden hidden lg:grid">
            <div className="bg-[#333333] p-6 h-52 flex flex-col justify-center gap-3">
                <h6 className="text-white font-playfair-display text-2xl max-w-[15rem]">
                    {data?.title}
                </h6>
                <Link
                    href={data?.button.href}
                    target={data?.button.isExternal ? "_blank" : "_self"}
                >
                    <Button className="w-fit rounded-full bg-transparent border-white border hover:bg-white hover:text-primary cursor-pointer">
                        <div className="rounded-full bg-primary p-1">
                            <Call />
                        </div>
                        {data?.button.text}
                    </Button>
                </Link>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#333333] to-transparent z-10"></div>
                <Image
                    src={getImage({
                        local: "/local/image3.webp",
                        prod: data?.image.url,
                    })}
                    alt={data?.image.alternativeText || "image"}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default Banner;
