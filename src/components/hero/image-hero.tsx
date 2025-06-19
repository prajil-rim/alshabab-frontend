import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ImageHeroProps } from "@/types";
import { Fragment } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ArrowRightUp from "../icons/arrow-right-up";
import Whatsapp from "../icons/whatsapp";

const ImageHero = ({
    title,
    description,
    background,
    breadcrumbs,
    cta,
    cta_whatsapp,
    style,
}: Readonly<
    Pick<
        ImageHeroProps,
        | "title"
        | "description"
        | "background"
        | "breadcrumbs"
        | "cta"
        | "cta_whatsapp"
    > & { style?: React.CSSProperties }
>) => {
    return (
        <section
            className="relative flex flex-col justify-end items-center h-[40rem] lg:h-[35rem] bg-no-repeat bg-center bg-cover after:inset-0 after:bg-black/50 after:absolute gap-40 lg:gap-20 pb-10"
            style={{
                backgroundImage: `url(${background.url})`,
                ...style,
            }}
        >
            <div className="space-y-5 flex flex-col justify-center items-center text-white relative z-10 px-3 lg:px-2">
                <h1 className="text-2xl lg:text-5xl font-bold overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-[44rem] text-center leading-tight">
                    {title}
                </h1>
                <p className="font-manrope lg:text-lg max-w-2xl text-center">
                    {description}
                </p>
                {cta && (
                    <div className="font-manrope flex flex-col gap-3 lg:flex-row items-center">
                        <Link
                            href={cta?.href}
                            target={cta.isExternal ? "_blank" : "_self"}
                        >
                            <Button className="bg-transparent rounded-full cursor-pointer border border-[#F5F1E3] hover:bg-white hover:text-black">
                                {cta.text} <ArrowRightUp color="red" />
                            </Button>
                        </Link>
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
                )}
            </div>
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
