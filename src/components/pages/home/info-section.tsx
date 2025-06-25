import { StrapiImage } from "@/components/common/strapi-image";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import Leaf from "@/components/icons/leaf";
import { Button } from "@/components/ui/button";
import { LinkProps, MediaProps } from "@/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Markdown from "react-markdown";

interface InfoSectionProps {
    heading: string;
    heading_2: string;
    description: string;
    smallImage: MediaProps;
    largeImage: MediaProps;
    success_trips: number;
    happy_clients: number;
    cta: LinkProps;
}

const InfoSection = ({
    heading,
    heading_2,
    description,
    smallImage,
    largeImage,
    success_trips,
    happy_clients,
    cta,
}: Readonly<InfoSectionProps>) => {
    const t = useTranslations("homePage.searchSection");
    return (
        <div className="flex items-center my-20 flex-row-reverse flex-wrap-reverse lg:flex-nowrap gap-10 lg:gap-0">
            <div className="shrink-0 w-[90%] md:w-3/5 lg:w-1/2 md:mx-auto">
                <div className="relative flex justify-end w-fit ms-auto">
                    <StrapiImage
                        alt={
                            largeImage.alternativeText ||
                            "Alternative Text not provided"
                        }
                        src={largeImage.url || process.env.PLACEHOLDER_IMAGE!}
                        width={430}
                        height={300}
                        className="rounded-lg h-80 object-cover"
                    />
                    <StrapiImage
                        alt={
                            smallImage.alternativeText ||
                            "Alternative Text not provided"
                        }
                        src={smallImage.url || process.env.PLACEHOLDER_IMAGE!}
                        className="absolute -bottom-1/4 rounded-lg border-2 border-white h-52 -left-[12%] rtl:-right-[12%] md:-left-1/5 rtl:md:-right-1/5 object-cover"
                        width={250}
                        height={200}
                    />
                </div>
            </div>
            <div className="space-y-2.5 lg:space-y-5">
                <div className="relative w-fit">
                    <h3 className="text-2xl lg:text-3xl font-semibold">
                        {heading}
                    </h3>
                    <div className="absolute left-full -translate-x-[40%] bottom-0 origin-top-left z-10 pointer-events-none hidden md:block">
                        <Leaf />
                    </div>
                </div>
                <div className="text-lg lg:text-xl font-manrope">
                    <Markdown>{heading_2}</Markdown>
                </div>
                <p className="font-manrope">{description}</p>
                <div className="flex items-center gap-9 font-manrope py-3 lg:py-0">
                    <div className="flex flex-col">
                        <span className="font-bold text-3xl">
                            {success_trips}
                        </span>
                        <span className="text-sm">{t("successTrips")}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-3xl">
                            {happy_clients}
                        </span>
                        <span className="text-sm">{t("happyClients")}</span>
                    </div>
                </div>
                <Link
                    href={cta?.href}
                    target={cta?.isExternal ? "_blank" : "_self"}
                >
                    <Button
                        variant={"outline"}
                        className="border-primary text-primary rounded-full bg-transparent font-manrope cursor-pointer hover:bg-primary hover:text-white"
                    >
                        {cta?.text} <ArrowRightUp color="red" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default InfoSection;
