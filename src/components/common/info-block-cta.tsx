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
                "flex items-center my-20",
                reversed && "flex-row-reverse"
            )}
        >
            <div className="shrink-0 w-1/2">
                <div className="relative">
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
                        className={cn(
                            "absolute -bottom-1/4 rounded-lg border-2 border-white h-52",
                            reversed ? "-left-1/6" : "right-1/12"
                        )}
                        width={250}
                        height={200}
                    />
                </div>
            </div>
            <div className="space-y-5">
                <h3 className="text-3xl font-semibold">{title}</h3>
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
