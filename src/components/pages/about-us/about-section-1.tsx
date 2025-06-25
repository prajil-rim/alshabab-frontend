import { StrapiImage } from "@/components/common/strapi-image";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Button } from "@/components/ui/button";
import { LinkProps, MediaProps } from "@/types";
import Link from "next/link";

interface AboutSection1Props {
    title: string;
    subtitle: string;
    description: string;
    image_1: MediaProps;
    image_2: MediaProps;
    cta: LinkProps;
    info_card: {
        id: number;
        label: string;
        value: string;
    }[];
}

const AboutSection1 = ({
    title,
    subtitle,
    description,
    image_1,
    image_2,
    cta,
    info_card,
}: Readonly<AboutSection1Props>) => {
    if (!title || !image_1 || !image_2) return null;
    return (
        <section className="py-10 lg:py-20 px-3 bg-[#F5F1E3] lg:bg-white">
            <div className="max-w-[1824px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-3">
                <div className="row-span-2 rounded-xl overflow-hidden hidden lg:block">
                    <StrapiImage
                        src={image_1?.url || process.env.PLACEHOLDER_IMAGE!}
                        alt={
                            image_1?.alternativeText ||
                            "Alternative Text not provided"
                        }
                        width={200}
                        height={200}
                        className="size-full object-cover"
                    />
                </div>
                <div className="rounded-xl overflow-hidden order-1 lg:order-none">
                    <StrapiImage
                        src={image_2?.url || process.env.PLACEHOLDER_IMAGE!}
                        alt={
                            image_2?.alternativeText ||
                            "Alternative Text not provided"
                        }
                        width={150}
                        height={150}
                        className="w-full aspect-[1/1.3] object-cover object-top"
                    />
                </div>
                <div className="lg:col-span-2 lg:bg-[#F5F1E3] rounded-xl space-y-6 lg:p-6 flex flex-col justify-center">
                    <div className="space-y-3">
                        <h2 className="capitalize font-manrope text-xl font-medium">
                            {subtitle}
                        </h2>
                        <h1 className="font-semibold text-4xl">{title}</h1>
                    </div>
                    <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:7] [-webkit-box-orient:vertical]">
                        {description}
                    </p>
                    <Link
                        href={cta.href}
                        target={cta.isExternal ? "_blank" : "_self"}
                    >
                        <Button
                            className="capitalize font-manrope bg-transparent rounded-full border-primary text-primary hover:bg-primary hover:text-white cursor-pointer w-fit"
                            variant={"outline"}
                        >
                            {cta.text} <ArrowRightUp color="red" />
                        </Button>
                    </Link>
                </div>
                <div className="p-6 order-2 lg:order-none bg-[#202020] rounded-xl text-white font-manrope flex flex-col justify-center items-center">
                    <div className="flex gap-2 items-center text-3xl font-medium">
                        <NumberTicker
                            value={Number(info_card[0].value) || 0}
                            className="whitespace-pre-wrap tracking-tighter text-white"
                        />
                        <span>+</span>
                    </div>
                    <span className="font-light">{info_card[0].label}</span>
                </div>
                <div className="p-6 order-3 lg:order-none bg-[#202020] rounded-xl text-white font-manrope flex flex-col justify-center items-center">
                    <div className="flex gap-2 items-center text-3xl font-medium">
                        <NumberTicker
                            value={Number(info_card[1].value) || 0}
                            className="whitespace-pre-wrap tracking-tighter text-white"
                        />
                        <span>+</span>
                    </div>
                    <span className="font-light">{info_card[1].label}</span>
                </div>
                <div className="p-6 order-4 lg:order-none bg-[#202020] rounded-xl text-white font-manrope flex flex-col justify-center items-center">
                    <div className="flex gap-2 items-center text-3xl font-medium">
                        <NumberTicker
                            value={Number(info_card[2].value) || 0}
                            className="whitespace-pre-wrap tracking-tighter text-white"
                        />
                        <span>+</span>
                    </div>
                    <span className="font-light">{info_card[2].label}</span>
                </div>
            </div>
        </section>
    );
};

export default AboutSection1;
