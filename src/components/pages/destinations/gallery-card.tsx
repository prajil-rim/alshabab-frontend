import Instagram from "@/components/icons/instagram";
import { GalleryProps } from "@/types";

const GalleryCard = ({ label, image }: GalleryProps) => {
    return (
        <div
            className="rounded-xl bg-cover bg-center aspect-[1/1.1] flex items-end p-4 text-white font-manrope relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 after:to-transparent overflow-hidden"
            style={{
                // backgroundImage: `url(${image.url})`,
                backgroundImage: `url(/images/others/blog_card1.webp)`,
            }}
        >
            <span className="relative z-10 flex items-center gap-1">
                <Instagram />
                {label}
            </span>
        </div>
    );
};

export default GalleryCard;
