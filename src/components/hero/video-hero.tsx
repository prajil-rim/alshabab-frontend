import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
    DestinationListProps,
    ImageHeroProps,
    MediaProps,
    PackageListProps,
} from "@/types";
import Link from "next/link";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import Whatsapp from "../icons/whatsapp";
import ContactFormModal from "../modal/contact-form-modal";
import ContactFormSmModal from "../modal/contact-form-sm-modal";
import { getImage } from "@/lib/utils";

type VideoHeroProps = Pick<
    ImageHeroProps,
    "title" | "description" | "breadcrumbs" | "cta_button" | "cta_whatsapp"
> & {
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    locale: string;
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
    cta_button,
    cta_whatsapp,
    background,
    destinations,
    packages,
    locale,
}: Readonly<VideoHeroProps>) => {
    const heading = title.split("\\n");

    return (
        <section
            className="h-screen w-full relative flex flex-col justify-end items-center bg-no-repeat bg-center bg-cover px-3"
            style={
                background.type === "image"
                    ? {
                          backgroundImage: `url(${getImage({
                              local: process.env.PLACEHOLDER_IMAGE!,
                              prod: background.background?.url,
                          })})`,
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
                {cta_button && (
                    <div className="font-manrope flex flex-col lg:flex-row justify-center items-center gap-4">
                        <div className="hidden lg:block">
                            <ContactFormModal
                                destinations={destinations || []}
                                packages={packages || []}
                                locale={locale}
                            >
                                <Button className="bg-transparent rounded-full cursor-pointer border border-[#F5F1E3] hover:bg-white hover:text-black">
                                    {cta_button} <ArrowRightUp color="red" />
                                </Button>
                            </ContactFormModal>
                        </div>
                        <div className="lg:hidden">
                            <ContactFormSmModal
                                destinations={destinations || []}
                                packages={packages || []}
                                locale={locale}
                            >
                                <Button className="bg-transparent rounded-full cursor-pointer border border-[#F5F1E3] hover:bg-white hover:text-black">
                                    {cta_button} <ArrowRightUp color="red" />
                                </Button>
                            </ContactFormSmModal>
                        </div>
                        {cta_whatsapp && (
                            <Link
                                href={cta_whatsapp?.href}
                                target={
                                    cta_whatsapp?.isExternal
                                        ? "_blank"
                                        : "_self"
                                }
                            >
                                <Button className="rounded-full bg-[#FFE9EC] text-black hover:text-white cursor-pointer">
                                    {cta_whatsapp?.text} <Whatsapp />
                                </Button>
                            </Link>
                        )}
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
