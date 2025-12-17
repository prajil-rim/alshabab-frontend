import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DestinationListProps,
    ImageHeroProps,
    ParentPackageListProps,
} from "@/types";
import { Fragment } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ArrowRightUp from "../icons/arrow-right-up";
import Whatsapp from "../icons/whatsapp";
import ContactFormModal from "../modal/contact-form-modal";
import ContactFormSmModal from "../modal/contact-form-sm-modal";
import { getImage } from "@/lib/utils";
import { Badge } from "../ui/badge";

const ImageHero = ({
    title,
    description,
    background,
    breadcrumbs,
    cta_button,
    cta_whatsapp,
    style,
    destinations,
    packages,
    locale,
    showPrice = false,
    showBadge = false,
    base_price_per_adult,
    offer_price_per_adult,
}: Readonly<
    Pick<
        ImageHeroProps,
        "title" | "description" | "background" | "breadcrumbs" | "cta_whatsapp"
    > & {
        style?: React.CSSProperties;
        destinations?: DestinationListProps[];
        packages?: ParentPackageListProps[];
        cta_button?: string;
        showPrice?: boolean;
        showBadge?: boolean;
        locale: string;
        base_price_per_adult?: number;
        offer_price_per_adult?: number;
    }
>) => {
    if (!background) return null;
    return (
        <section
            className="relative flex flex-col justify-center items-center h-screen bg-no-repeat bg-center bg-cover after:inset-0 after:bg-black/50 after:absolute pb-10"
            style={{
                backgroundImage: `url(${getImage({
                    local: process.env.PLACEHOLDER_IMAGE!,
                    prod: background?.url,
                })})`,
                ...style,
            }}
        >
            <div className="space-y-5 flex flex-1 flex-col justify-center items-center text-white relative z-10 px-3">
                <h1 className="text-2xl lg:text-5xl font-bold overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-[44rem] text-center leading-tight">
                    {title}
                </h1>
                <p className="font-manrope lg:text-lg max-w-2xl text-center">
                    {description}
                </p>
                <div className="font-manrope flex flex-col gap-3 lg:flex-row items-center">
                    {cta_button && (
                        <>
                            <div className="hidden lg:block">
                                <ContactFormModal
                                    destinations={destinations || []}
                                    packages={packages || []}
                                    locale={locale}
                                >
                                    <Button className="bg-transparent rounded-full cursor-pointer border border-[#F5F1E3] hover:bg-white hover:text-black">
                                        {cta_button}{" "}
                                        <ArrowRightUp color="red" />
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
                                        {cta_button}{" "}
                                        <ArrowRightUp color="red" />
                                    </Button>
                                </ContactFormSmModal>
                            </div>
                        </>
                    )}
                    {cta_whatsapp && (
                        <Link
                            href={cta_whatsapp?.href}
                            target={
                                cta_whatsapp.isExternal ? "_blank" : "_self"
                            }
                        >
                            <Button className="rounded-full bg-[#FFE9EC] text-black hover:text-white cursor-pointer">
                                {cta_whatsapp?.text} <Whatsapp />
                            </Button>
                        </Link>
                    )}
                </div>
                {showBadge && (
                    <div className="flex gap-2 font-manrope">
                        <Badge className="rounded-full bg-white text-black px-3 py-1">
                            Family with kids
                        </Badge>
                        <Badge className="rounded-full bg-white text-black px-3 py-1">
                            Family
                        </Badge>
                    </div>
                )}

                {showPrice && (
                    <div className="lg:hidden relative font-manrope text-white max-w-7xl w-full">
                        <div className="text-center lg:text-right flex flex-col gap-1">
                            <span>Starting Price Per Adult</span>
                            <span className="line-through font-semibold text-white/50">
                                AED {base_price_per_adult}
                            </span>
                            <span className="text-lg font-bold">
                                AED {offer_price_per_adult}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            {showPrice && (
                <div className="hidden lg:block relative font-manrope text-white max-w-7xl w-full">
                    <div className="absolute bottom-10 right-10 text-right flex flex-col gap-1 z-10">
                        <span className="text-lg font-medium">
                            Starting Price Per Adult
                        </span>
                        <span className="line-through text-xl font-semibold">
                            AED {base_price_per_adult}
                        </span>
                        <span className="text-2xl font-bold">
                            AED {offer_price_per_adult}
                        </span>
                    </div>
                </div>
            )}
            <Breadcrumb className="relative z-10">
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

export default ImageHero;
