"use client";

import { cn, getImage } from "@/lib/utils";
import { CardProps } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ArrowRightUp from "../icons/arrow-right-up";

const CardWithAnimatedParagraph = ({ card }: { card: CardProps }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                "group w-full aspect-square lg:aspect-auto flex-1 flex justify-center items-end rounded-xl hover:flex-1/12 transition-all duration-500 bg-center bg-cover overflow-hidden relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:to-transparent"
            )}
            style={{
                backgroundImage: `url(${getImage({
                    local: process.env.PLACEHOLDER_IMAGE!,
                    prod: card.image?.url,
                })})`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {card.label && (
                <span className="font-manrope font-semibold absolute top-0 left-0 bg-white px-3 py-1 text-xs rounded-full m-3">
                    {card.label}
                </span>
            )}
            <div className="relative z-10 text-white p-6 text-center space-y-2">
                <h6 className="font-semibold text-2xl">{card.title}</h6>

                {/* Framer Motion div to control height */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{
                        height: isHovered ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden space-y-2"
                >
                    <p className="font-manrope text-sm">{card.description}</p>
                    {card.cta && (
                        <Link
                            href={card.cta.href}
                            target={card.cta.isExternal ? "_blank" : "_self"}
                        >
                            <Button
                                variant={"outline"}
                                className="bg-transparent rounded-full font-manrope cursor-pointer"
                            >
                                {card.cta.text} <ArrowRightUp color="red" />
                            </Button>
                        </Link>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default CardWithAnimatedParagraph;
