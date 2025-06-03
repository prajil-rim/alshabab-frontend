import { StrapiImage } from "@/components/common/strapi-image";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import Leaf from "@/components/icons/leaf";
import { Button } from "@/components/ui/button";
import { LinkProps, MediaProps } from "@/types";
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
    return (
        <div className="flex items-center my-20 flex-row-reverse">
            <div className="shrink-0 w-1/2">
                <div className="relative flex justify-end">
                    <StrapiImage
                        alt={
                            largeImage.alternativeText ||
                            "Alternative Text not provided"
                        }
                        // src={largeImage.url}
                        src="http://localhost:3000/images/others/info_block_1.webp"
                        width={430}
                        height={300}
                        className="rounded-lg h-80 object-cover"
                    />
                    <StrapiImage
                        alt={
                            smallImage.alternativeText ||
                            "Alternative Text not provided"
                        }
                        // src={smallImage.url}
                        src="http://localhost:3000/images/others/info_block_2.webp"
                        className="absolute -bottom-1/4 rounded-lg border-2 border-white h-52 left-0"
                        width={250}
                        height={200}
                    />
                </div>
            </div>
            <div className="space-y-5">
                <div className="relative w-fit">
                    <h3 className="text-3xl font-semibold">{heading}</h3>
                    <div className="absolute left-full -translate-x-[40%] bottom-0 origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                </div>
                <div className="text-xl font-manrope">
                    <Markdown>{heading_2}</Markdown>
                </div>
                <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:7] [-webkit-box-orient:vertical]">
                    {description}
                </p>
                <div className="flex items-center gap-9 font-manrope">
                    <div className="flex flex-col">
                        <span className="font-bold text-3xl">
                            {success_trips}
                        </span>
                        <span className="text-sm">Success Trips</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-3xl">
                            {happy_clients}
                        </span>
                        <span className="text-sm">Happy Clients</span>
                    </div>
                </div>
                <Link
                    href={cta.href}
                    target={cta.isExternal ? "_blank" : "_self"}
                >
                    <Button
                        variant={"outline"}
                        className="border-primary text-primary rounded-full bg-transparent font-manrope cursor-pointer hover:bg-primary hover:text-white"
                    >
                        {cta.text} <ArrowRightUp color="red" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default InfoSection;
