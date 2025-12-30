"use client";

import PackageHeroCarousel from "@/components/carousels/package-hero-carousel";
import { StrapiImage } from "@/components/common/strapi-image";
import ImagePlus from "@/components/icons/image-plus";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getImage } from "@/lib/utils";
import { MediaProps } from "@/types";
import { Moon, Sun } from "lucide-react";
import { Fragment, useState } from "react";

const CarouselHero = ({
    breadcrumbs,
    hero,
    package_,
    number_of_nights,
    number_of_days,
    price,
}: {
    breadcrumbs: {
        text: string;
        href?: string;
    }[];
    hero: MediaProps[];
    package_: string;
    number_of_nights: number;
    number_of_days: number;
    price: number;
}) => {
    const [open, setOpen] = useState(false);
    if (!hero || hero.length === 0) return null;
    return (
        <section className="max-w-7xl mx-auto pt-32 pb-24 space-y-6 px-3 lg:px-6 2xl:px-0">
            <Breadcrumb className="relative z-10">
                <BreadcrumbList className="font-manrope text-black">
                    {...breadcrumbs.slice(0, -1).map(({ text, href }, i) => (
                        <Fragment key={i}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={href}
                                    className="hover:text-black hover:underline"
                                >
                                    {text}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-black font-bold">
                            {breadcrumbs?.at(-1)?.text}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-4 gap-3 h-[25rem]">
                <div className="rounded-xl overflow-hidden col-span-4 md:col-span-2 md:row-span-2">
                    <StrapiImage
                        src={getImage({
                            local: "http://localhost:3000/local/new-hero.jpg",
                            prod: hero[0]?.url,
                        })}
                        alt={hero[0]?.alternativeText || ""}
                        className="size-full object-cover"
                        width={600}
                        height={300}
                    />
                </div>
                {hero[1] && (
                    <div className="rounded-xl overflow-hidden">
                        <StrapiImage
                            src={getImage({
                                local: "http://localhost:3000/local/new-hero.jpg",
                                prod: hero[1]?.url,
                            })}
                            alt={hero[1]?.alternativeText || ""}
                            className="size-full object-cover"
                            width={400}
                            height={200}
                        />
                    </div>
                )}
                {hero[2] && (
                    <div className="rounded-xl overflow-hidden">
                        <StrapiImage
                            src={getImage({
                                local: "http://localhost:3000/local/new-hero.jpg",
                                prod: hero[2]?.url,
                            })}
                            alt={hero[2]?.alternativeText || ""}
                            className="size-full object-cover"
                            width={400}
                            height={200}
                        />
                    </div>
                )}
                {hero[3] && (
                    <div className="rounded-xl overflow-hidden">
                        <StrapiImage
                            src={getImage({
                                local: "http://localhost:3000/local/new-hero.jpg",
                                prod: hero[3]?.url,
                            })}
                            alt={hero[3]?.alternativeText || ""}
                            className="size-full object-cover"
                            width={400}
                            height={200}
                        />
                    </div>
                )}
                <PackageHeroCarousel
                    images={hero}
                    onClose={() => setOpen(false)}
                    open={open}
                />
                {hero[4] && (
                    <div
                        className="rounded-xl relative overflow-hidden cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <StrapiImage
                            src={getImage({
                                local: "http://localhost:3000/local/new-hero.jpg",
                                prod: hero[4]?.url,
                            })}
                            alt={hero[4]?.alternativeText || ""}
                            className="size-full object-cover"
                            width={400}
                            height={200}
                        />
                        <div className="inset-0 absolute bg-black/40 flex flex-col justify-center items-center font-manrope text-white">
                            <ImagePlus />
                            <span className="text-sm">See more</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center pt-2 gap-3">
                <div className="font-bold space-y-2">
                    <h1 className="text-2xl md:text-3xl">{package_}</h1>
                    <div className="flex gap-4 items-center font-manrope">
                        <span className="flex items-center gap-2">
                            <Moon size={16} fill="black" /> {number_of_nights}{" "}
                            Nights
                        </span>
                        <span className="flex items-center gap-2">
                            <Sun size={16} fill="black" /> {number_of_days} Days
                        </span>
                    </div>
                </div>

                <div className="rounded-lg shadow-lg px-3 py-2 flex justify-between items-center gap-3 font-manrope font-bold">
                    <span>Price start from</span>
                    <span className="bg-primary px-3 py-1.5 rounded-md text-white">
                        AED {price ?? "--:--"}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default CarouselHero;
