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
import ArrowRightUp from "../icons/arrow-right-up";
import ContactFormModal from "../modal/contact-form-modal";
import ContactFormSmModal from "../modal/contact-form-sm-modal";
import { getImage } from "@/lib/utils";
import { Badge } from "../ui/badge";

const PackageFilterHero = ({
    title,
    description,
    background,
    breadcrumbs,
    cta_button,
    style,
    destinations,
    packages,
    locale,
}: Readonly<
    Pick<
        ImageHeroProps,
        "title" | "description" | "background" | "breadcrumbs"
    > & {
        style?: React.CSSProperties;
        destinations?: DestinationListProps[];
        packages?: ParentPackageListProps[];
        cta_button?: string;
        locale: string;
    }
>) => {
    if (!title || !description || !background) return null;
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
                <Badge className="bg-white rounded-full px-3 py-1 text-black font-manrope">
                    Destination Guide
                </Badge>
                <h1 className="text-2xl lg:text-5xl font-bold overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-[44rem] text-center leading-tight">
                    {title}
                </h1>
                <p className="font-manrope lg:text-lg max-w-2xl text-center">
                    {description}
                </p>
                {cta_button && (
                    <div className="font-manrope flex flex-col gap-3 lg:flex-row items-center">
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

export default PackageFilterHero;
