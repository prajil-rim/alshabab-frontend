"use client";

import Link from "next/link";
import Destinations from "../dropdown/destinations";
import Packages from "../dropdown/packages";
import { DestinationListProps, PackageListProps } from "@/types";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion as m } from "framer-motion";
import ContactFormSmModal from "../modal/contact-form-sm-modal";
import { useTranslations } from "next-intl";

const NavItems = ({
    destinations,
    packages,
    isMobile = false,
    setOpen,
}: {
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    isMobile?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [dOpen, setDOpen] = useState(false);
    const [pOpen, setPOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations("homePage.header.navItems");
    const isActive = (path: string) => pathname === path;

    function activeStyle(path: string, style?: string) {
        return clsx(
            { "bg-white/20 font-semibold": isActive(path) },
            "px-3 py-1 bg-transparent rounded-full",
            style
        );
    }

    function closeMenu() {
        if (!isMobile || !setOpen) return;
        setOpen(false);
    }

    return (
        <ul
            className={cn(
                "flex text-white font-normal text-sm gap-5",
                isMobile
                    ? "flex-col font-manrope gap-3 text-[#202020] font-medium"
                    : "flex-row"
            )}
        >
            <li className={activeStyle("/")}>
                <Link href={"/"} onClick={closeMenu}>
                    {t("home")}
                </Link>
            </li>
            <li className={activeStyle("/about-us")}>
                <Link href={"/about-us"} onClick={closeMenu}>
                    {t("aboutUs")}
                </Link>
            </li>
            {!isMobile && (
                <li
                    className={activeStyle(
                        "/destinations",
                        "flex items-center gap-1 cursor-pointer"
                    )}
                >
                    <Link href={"/destinations"}>{t("destinations")} </Link>
                    <Destinations destinations={destinations || []} />
                </li>
            )}
            {isMobile && (
                <li className={activeStyle("/destinations")}>
                    <button
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => setDOpen((prev) => !prev)}
                    >
                        <span>{t("destinations")}</span>
                        <m.span
                            animate={{ rotate: dOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ChevronDown size={20} />
                        </m.span>
                    </button>
                    <AnimatePresence initial={false}>
                        {dOpen && (
                            <m.ul
                                key="content"
                                initial={{ opacity: 0, maxHeight: 0 }}
                                animate={{ opacity: 1, maxHeight: 500 }}
                                exit={{ opacity: 0, maxHeight: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                className="overflow-hidden px-0 py-2 space-y-2"
                            >
                                {destinations.map((destination) => (
                                    <Link
                                        href={
                                            "/destinations/" + destination.slug
                                        }
                                        onClick={closeMenu}
                                        key={destination.documentId}
                                    >
                                        <li>{destination.destination}</li>
                                    </Link>
                                ))}
                            </m.ul>
                        )}
                    </AnimatePresence>
                </li>
            )}
            {!isMobile && (
                <li
                    className={activeStyle(
                        "/packages",
                        "flex items-center gap-1 cursor-pointer"
                    )}
                >
                    <Link href={"/packages"}>{t("packages")} </Link>
                    <Packages packages={packages || []} />
                </li>
            )}
            {isMobile && (
                <li className={activeStyle("/packages")}>
                    <button
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => setPOpen((prev) => !prev)}
                    >
                        <span>{t("packages")}</span>
                        <m.span
                            animate={{ rotate: pOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ChevronDown size={20} />
                        </m.span>
                    </button>
                    <AnimatePresence initial={false}>
                        {pOpen && (
                            <m.ul
                                key="content"
                                initial={{ opacity: 0, maxHeight: 0 }}
                                animate={{ opacity: 1, maxHeight: 500 }}
                                exit={{ opacity: 0, maxHeight: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                className="overflow-hidden px-0 py-2 space-y-2"
                            >
                                {packages.map((package_) => (
                                    <Link
                                        href={"/packages/" + package_.slug}
                                        onClick={closeMenu}
                                        key={package_.documentId}
                                    >
                                        <li>{package_.package}</li>
                                    </Link>
                                ))}
                            </m.ul>
                        )}
                    </AnimatePresence>
                </li>
            )}
            <li className={activeStyle("/blogs")}>
                <Link href={"/blogs"} onClick={closeMenu}>
                    {t("insights")}
                </Link>
            </li>
            <li className={activeStyle("/contact-us")}>
                <Link href={"/contact-us"} onClick={closeMenu}>
                    {t("contactUs")}
                </Link>
            </li>
            <li className="lg:hidden">
                <ContactFormSmModal
                    cta={t("cta")}
                    destinations={destinations}
                    packages={packages}
                    bg="black"
                />
            </li>
        </ul>
    );
};

export default NavItems;
