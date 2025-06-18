import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { ImageHeroProps, MediaProps } from "@/types";
import Link from "next/link";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import Whatsapp from "../icons/whatsapp";

type VideoHeroProps = Pick<
    ImageHeroProps,
    "title" | "description" | "breadcrumbs" | "cta"
> & {
    background: {
        id: number;
        type: "image" | "video";
        background: MediaProps;
    };
};

const VideoHero = ({
    title,
    description,
    breadcrumbs,
    cta,
    background,
}: Readonly<VideoHeroProps>) => {
    const heading = title.split("\\n");

    return (
        <section
            className="h-[40rem] w-full relative flex flex-col justify-end items-center bg-no-repeat bg-center bg-cover px-3 lg:px-2"
            style={
                background.type === "image"
                    ? {
                          backgroundImage: `url(${background.background.url})`,
                      }
                    : {}
            }
        >
            {background.type === "video" && (
                <video
                    src={background.background?.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    className="absolute inset-0 size-full object-cover pointer-events-none"
                ></video>
            )}
            <div className="absolute inset-0 size-full bg-black/40"></div>

            <div className="space-y-5 flex flex-col flex-1 justify-center items-center text-white relative z-10">
                <h1 className="text-2xl lg:text-5xl font-bold max-w-[44rem] text-center leading-tight">
                    {heading[0]}
                    {heading.length > 0 && <br />}
                    {heading.length > 0 && heading[1]}
                </h1>
                <p className="font-manrope lg:text-lg max-w-2xl text-center">
                    {description}
                </p>
                {cta && (
                    <div className="font-manrope flex flex-col lg:flex-row justify-center items-center gap-4">
                        <Link
                            href={cta.href}
                            target={cta.isExternal ? "_blank" : "_self"}
                        >
                            <Button className="bg-transparent rounded-full cursor-pointer border border-[#F5F1E3] hover:bg-white hover:text-black">
                                {cta.text} <ArrowRightUp color="red" />
                            </Button>
                        </Link>
                        <Button className="rounded-full bg-[#FFE9EC] text-black hover:text-white cursor-pointer">
                            Get Free Consultation <Whatsapp />
                        </Button>
                    </div>
                )}
            </div>
            <Breadcrumb className="relative z-10 pb-10">
                <BreadcrumbList className="font-manrope text-white">
                    {breadcrumbs?.slice(0, -1).map(({ text, href }, i) => (
                        <Fragment key={i}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={href}
                                    className="hover:text-white"
                                >
                                    {text}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white font-bold">
                            {breadcrumbs?.at(-1)?.text}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </section>
    );
};

export default VideoHero;
