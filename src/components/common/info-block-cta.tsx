import { cn } from "@/lib/utils";
import { StrapiImage } from "./strapi-image";
import { InfoBlockProps } from "@/types";
import { Button } from "../ui/button";
import Whatsapp from "../icons/whatsapp";

const InfoBlockCta = ({
    title,
    description,
    smallImage,
    largeImage,
    reversed,
}: Readonly<InfoBlockProps>) => {
    return (
        <div
            className={cn(
                "flex items-center my-10 lg:my-20 flex-wrap lg:flex-nowrap",
                reversed && "flex-row-reverse"
            )}
        >
            <div
                className={cn(
                    "shrink-0 w-[85%] lg:w-1/2 mb-20 lg:mb-0",
                    reversed && "ms-auto"
                )}
            >
                <div className="relative w-fit mx-auto lg:mx-0">
                    <StrapiImage
                        alt={
                            largeImage?.alternativeText ||
                            "Alternative Text not provided"
                        }
                        src={largeImage?.url || process.env.PLACEHOLDER_IMAGE!}
                        width={430}
                        height={300}
                        className="rounded-lg h-60 lg:h-80 object-cover"
                    />
                    <StrapiImage
                        alt={
                            smallImage?.alternativeText ||
                            "Alternative Text not provided"
                        }
                        src={smallImage?.url || process.env.PLACEHOLDER_IMAGE!}
                        className={cn(
                            "absolute -bottom-1/4 rounded-lg border-2 border-white w-1/2 h-36 lg:h-52",
                            reversed ? "lg:-left-1/6 -left-1/6" : "-right-1/6"
                        )}
                        width={250}
                        height={200}
                    />
                </div>
            </div>
            <div className="space-y-5">
                <h3 className="text-2xl lg:text-3xl font-semibold">{title}</h3>
                <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:7] [-webkit-box-orient:vertical]">
                    {description}
                </p>
                <Button
                    variant={"outline"}
                    className="border-primary text-primary rounded-full bg-transparent font-manrope cursor-pointer hover:bg-primary hover:text-white"
                >
                    Know More <Whatsapp />
                </Button>
            </div>
        </div>
    );
};

export default InfoBlockCta;
