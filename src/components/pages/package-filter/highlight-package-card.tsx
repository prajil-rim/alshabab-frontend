import ArrowRightUp from "@/components/icons/arrow-right-up";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getImage } from "@/lib/utils";
import { LinkProps, MediaProps } from "@/types";

const HighlightPackageCard = ({
    image,
    title,
    button,
}: {
    image: MediaProps;
    title: string;
    button: LinkProps;
}) => {
    return (
        <div
            className="h-[350px] rounded-lg mt-10 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-black/0 overflow-hidden"
            style={{
                backgroundImage: getImage({
                    local: `url(/local/image1.webp)`,
                    prod: image.url,
                }),
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="relative z-10 flex flex-col justify-end items-center h-full p-4 gap-2">
                <h3 className="text-white font-semibold text-center mb-2 font-playfair-display text-xl leading-tight">
                    {title}
                </h3>
                <Link href={button.href}>
                    <Button className="bg-white text-black hover:bg-gray-100 rounded-full text-xs font-semibold cursor-pointer">
                        {button.text}
                        <ArrowRightUp color="red" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HighlightPackageCard;
