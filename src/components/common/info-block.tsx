import { cn } from "@/lib/utils";
import { StrapiImage } from "./strapi-image";
import { InfoBlockProps } from "@/types";

const InfoBlock = ({
    title,
    description,
    smallImage,
    largeImage,
    reversed,
}: Readonly<InfoBlockProps>) => {
    return (
        <div
            className={cn(
                "flex items-center gap-26 my-20",
                reversed && "flex-row-reverse"
            )}
        >
            <div className="shrink-0 w-1/4">
                <div className="relative">
                    <StrapiImage
                        alt={
                            largeImage?.alternativeText ||
                            "Alternative Text not provided"
                        }
                        // src={largeImage.url}
                        src="http://localhost:3000/images/others/info_block_1.webp"
                        width={350}
                        height={300}
                        className="rounded-lg h-56 object-cover"
                    />
                    <StrapiImage
                        alt={
                            smallImage?.alternativeText ||
                            "Alternative Text not provided"
                        }
                        // src={smallImage.url}
                        src="http://localhost:3000/images/others/info_block_2.webp"
                        className={cn(
                            "absolute -bottom-1/4 rounded-lg border-2 border-white h-36",
                            reversed ? "-left-1/6" : "-right-1/6"
                        )}
                        width={200}
                        height={200}
                    />
                </div>
            </div>
            <div className="space-y-5">
                <h3 className="text-3xl font-semibold">{title}</h3>
                <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:7] [-webkit-box-orient:vertical]">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default InfoBlock;
