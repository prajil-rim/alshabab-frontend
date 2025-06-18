import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import {
    Ellipsis,
    FileMusic,
    Heart,
    MessageCircle,
    Music,
    Send,
} from "lucide-react";
import Image from "next/image";

interface ReelProps {
    url: string;
    isActive: boolean;
    selectedIndex: number;
    index: number;
    arrayLength: number;
    videoRefs: React.MutableRefObject<HTMLVideoElement[]>;
}

const Reel = ({
    url,
    isActive,
    selectedIndex,
    index,
    arrayLength,
    videoRefs,
}: Readonly<ReelProps>) => {
    const breakpoint = useMediaQuery("(max-width: 768px)");
    if (!url) return null;
    return (
        <div
            className={
                breakpoint
                    ? isActive
                        ? "scale-110 transition-transform duration-500"
                        : ""
                    : cn(
                          "transition-transform duration-500 relative after:absolute after:inset-0 after:rounded-xl after:transition-colors after:duration-500",
                          isActive && "scale-110",
                          selectedIndex + 2 < arrayLength
                              ? selectedIndex + 2 == index &&
                                    "after:bg-black/40"
                              : selectedIndex - 3 === index &&
                                    "after:bg-black/40",
                          selectedIndex + 3 < arrayLength
                              ? selectedIndex + 3 == index &&
                                    "after:bg-gradient-to-l after:from-black/90 after:to-black/40"
                              : selectedIndex - 2 === index &&
                                    "after:bg-gradient-to-l after:from-black/90 after:to-black/40",
                          selectedIndex === index &&
                              "after:bg-gradient-to-r after:from-black/90 after:to-black/40"
                      )
            }
        >
            <div className="relative flex rounded-xl aspect-[1/1.6] items-center justify-center overflow-hidden">
                <video
                    ref={(el) => {
                        if (el) videoRefs.current[index] = el;
                    }}
                    src={url}
                    className="w-full pointer-events-none"
                    muted
                    loop
                    playsInline
                    controls={false}
                />
                <div className="flex flex-col gap-2 absolute right-0 bottom-0 p-2 items-center">
                    <div className="flex flex-col items-center">
                        <Heart
                            className="stroke-red-500 fill-red-500"
                            size={17}
                        />
                        <span className="font-manrope text-[0.5rem]">
                            Likes
                        </span>
                    </div>
                    <MessageCircle className="stroke-1 -rotate-90" size={17} />
                    <Send className="stroke-1" size={17} />
                    <Ellipsis className="stroke-1 fill-white" size={17} />
                    <FileMusic size={20} className="stroke-1" />
                </div>
                <div className="absolute bottom-0 left-0 p-2 font-manrope flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                        <div className="bg-white rounded-full size-6 flex items-center justify-center">
                            <Image
                                src="/images/logo/form_logo.webp"
                                alt=""
                                className="w-4.5"
                                width={18}
                                height={18}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[0.6rem]">
                                alshababtourism
                            </span>
                            <span className="flex items-center gap-0.5 text-[0.4rem]">
                                <Music size={10} />
                                Original audio
                            </span>
                        </div>
                    </div>
                    <span className="text-[0.45rem]">
                        Blessed are those get to witness the ...
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Reel;
