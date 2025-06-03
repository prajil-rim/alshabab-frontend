import ArrowRightUp from "@/components/icons/arrow-right-up";
import { Button } from "@/components/ui/button";
import { LinkProps, MediaProps } from "@/types";
import Link from "next/link";

interface PDListSectionProps {
    title: string;
    description: string;
    hover_card: {
        id: number;
        title: string;
        description: string;
        label: string | null;
        image: MediaProps;
        cta: LinkProps;
    }[];
}

const PDListSection = ({
    title,
    description,
    hover_card,
}: Readonly<PDListSectionProps>) => {
    if (!hover_card || hover_card.length === 0) return null;
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <div className="grid grid-cols-4 gap-4">
                {hover_card.map((package_, i) => (
                    <div
                        className="rounded-xl aspect-[1/1.5] bg-cover bg-center flex items-end relative after:absolute after:h-3/4 after:w-full after:bg-gradient-to-t after:from-black after:to-transparent overflow-hidden"
                        style={{
                            // backgroundImage: `url(${package_.image.url})`,
                            backgroundImage: `url(/images/packages/${
                                i + 1
                            }.webp)`,
                        }}
                        key={package_.id}
                    >
                        <div className="text-white relative z-10 p-5 space-y-3">
                            <div className="text-xl font-medium">
                                {package_.title}
                            </div>
                            <p className="text-sm text-[#F5F5F5] font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                                {package_.description}
                            </p>
                            <Link
                                href={package_.cta.href}
                                target={
                                    package_.cta.isExternal ? "_blank" : "_self"
                                }
                            >
                                <Button className="rounded-full text-xs bg-white border border-primary text-primary font-manrope hover:bg-white/90 cursor-pointer">
                                    {package_.cta.text}
                                    <ArrowRightUp color="red" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PDListSection;
