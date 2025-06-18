import ArrowRightUp from "@/components/icons/arrow-right-up";
import { Button } from "@/components/ui/button";
import { CardProps } from "@/types";
import Link from "next/link";

const PDListCard = ({ card }: { card: CardProps }) => {
    return (
        <div
            className="rounded-xl aspect-[1/1.5] bg-cover bg-center flex items-end relative after:absolute after:h-3/4 after:w-full after:bg-gradient-to-t after:from-black after:to-transparent overflow-hidden"
            style={{
                backgroundImage: `url(${card.image?.url})`,
            }}
            key={card.id}
        >
            <div className="text-white relative z-10 p-5 space-y-3">
                <div className="text-xl font-medium">{card.title}</div>
                <p className="text-sm text-[#F5F5F5] font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    {card.description}
                </p>
                <Link
                    href={card.cta?.href || "/"}
                    target={card.cta?.isExternal ? "_blank" : "_self"}
                >
                    <Button className="rounded-full text-xs bg-white border border-primary text-primary font-manrope hover:bg-white/90 cursor-pointer">
                        {card.cta?.text}
                        <ArrowRightUp color="red" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default PDListCard;
