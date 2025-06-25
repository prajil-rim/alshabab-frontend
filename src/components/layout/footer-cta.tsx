import { FooterCTAProps } from "@/types";
import { StrapiImage } from "../common/strapi-image";
import Call from "../icons/call";
import Whatsapp from "../icons/whatsapp";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FooterCTA = ({
    title,
    description,
    image,
    background,
    cta_call,
    cta_chat,
    text_align,
}: Readonly<FooterCTAProps>) => {
    return (
        <section
            className={cn(
                "bg-gradient-to-t from-[#202020] to-secondary min-h-96 2xl:min-h-[26rem] bg-cover bg-center flex items-center relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-[#202020] after:via-[#202020]/50 after:to-transparent px-3",
                text_align === "center" ? "" : "after:hidden"
            )}
            style={
                text_align === "center"
                    ? {
                          backgroundImage: `url(${background?.url})`,
                      }
                    : {}
            }
        >
            <div
                className={cn(
                    "max-w-[1824px] mx-auto relative z-10 pt-10 lg:pt-0",
                    text_align === "center"
                        ? "flex flex-col justify-center items-center"
                        : "grid grid-cols-1 lg:grid-cols-2"
                )}
            >
                <div
                    className={cn(
                        "text-white my-auto h-fit space-y-4 lg:space-y-8",
                        text_align === "center"
                            ? "text-center"
                            : "w-full text-center lg:text-left"
                    )}
                >
                    <h1
                        className={cn(
                            "text-2xl lg:text-4xl font-black w-fit",
                            text_align === "center" && "mx-auto"
                        )}
                    >
                        {title}
                    </h1>
                    <p
                        className={cn(
                            "font-manrope font-medium text-sm lg:text-base mx-auto lg:mx-0",
                            text_align === "center"
                                ? "max-w-[59rem]"
                                : "max-w-[22rem]"
                        )}
                    >
                        {description}
                    </p>
                    <div
                        className={cn(
                            "flex flex-col lg:flex-row gap-3 lg:gap-6 font-manrope",
                            text_align === "center"
                                ? "justify-center"
                                : "justify-start"
                        )}
                    >
                        <Link
                            href={cta_call?.href || ""}
                            target={cta_call.isExternal ? "_blank" : "_self"}
                        >
                            <Button
                                className="bg-transparent rounded-full cursor-pointer hover:text-black hover:bg-white"
                                variant={"outline"}
                            >
                                <div className="bg-primary rounded-full size-5 shrink-0 flex justify-center items-center">
                                    <Call />
                                </div>
                                {cta_call?.text}
                            </Button>
                        </Link>
                        <Link
                            href={cta_chat?.href || ""}
                            target={cta_chat?.isExternal ? "_blank" : "_self"}
                        >
                            <Button className="bg-[#FFE9EC] rounded-full text-black hover:text-white cursor-pointer">
                                <Whatsapp />
                                {cta_chat?.text}
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="size-full">
                    {image && (
                        <StrapiImage
                            alt={
                                image.alternativeText ||
                                "Alternative text not provided"
                            }
                            src={image?.url || process.env.PLACEHOLDER_IMAGE!}
                            width={760}
                            height={500}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default FooterCTA;
