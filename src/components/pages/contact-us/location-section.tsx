"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OfficesProps } from "@/types";
import Image from "next/image";
import { useState } from "react";

const LocationSection = ({ offices, title }: Readonly<OfficesProps>) => {
    const [map, setMap] = useState(offices[0].url);
    const [active, setActive] = useState(0);
    return (
        <section className="text-center py-10 space-y-5 lg:space-y-12">
            <div className="space-y-3 lg:space-y-6">
                <h2 className="font-semibold text-2xl lg:text-4xl">{title}</h2>
                <div className="space-x-3 lg:space-x-6">
                    {offices.map((office, i) => (
                        <Button
                            key={office.id}
                            className={cn(
                                "bg-white text-black rounded-full font-semibold !px-5 !py-2.5 cursor-pointer border border-[#D7CFCF] shadow-none font-manrope hover:bg-[#ECF4FF]",
                                active === i &&
                                    "bg-[#ECF4FF] text-secondary border-0 hover:bg-[#ECF4FF]"
                            )}
                            onClick={() => {
                                setMap(office.url);
                                setActive(i);
                            }}
                        >
                            <Image
                                src={
                                    office.icon?.url ||
                                    process.env.PLACEHOLDER_IMAGE!
                                }
                                alt={office.icon?.alternativeText || ""}
                                className="w-5 h-3.5"
                                width={20}
                                height={14}
                            />
                            {office.location}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="relative after:hidden lg:after:block after:absolute after:w-full after:h-80 after:bg-gradient-to-t after:from-white after:to-transparent after:bottom-0 after:left-0">
                <iframe
                    src={map}
                    width="100%"
                    height="600"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-[94%] mx-auto rounded-xl lg:w-full lg:mx-0 lg:rounded-none"
                ></iframe>
            </div>
        </section>
    );
};

export default LocationSection;
