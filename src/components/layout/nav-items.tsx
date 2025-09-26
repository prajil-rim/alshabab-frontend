"use client";

import Link from "next/link";
import { DestinationListProps, PackageListProps } from "@/types";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion as m } from "framer-motion";
import ContactFormSmModal from "../modal/contact-form-sm-modal";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";

const NavItems = ({
    destinations,
    packages,
    isMobile = false,
    setOpen,
    locale,
}: {
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    isMobile?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    locale: string;
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
            {!isMobile && (
                <div
                    onMouseEnter={() => setDOpen(true)}
                    onMouseLeave={() => setDOpen(false)}
                    className={activeStyle("/destinations", "relative group")}
                >
                    {/* Link and Chevron */}
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Link href="/destinations">{t("destinations")}</Link>
                        <ChevronDown size={16} />
                    </div>

                    {/* Dropdown */}
                    {dOpen && (
                        <div className="absolute left-0 top-full z-50 w-48 bg-white shadow-lg rounded-md p-1">
                            {destinations?.map((destination) => (
                                <Link
                                    href={"/destinations/" + destination.slug}
                                    key={destination.documentId}
                                    className="block px-2 py-1.5 hover:bg-gray-100 rounded text-black"
                                >
                                    {destination.destination}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
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
                <div
                    onMouseEnter={() => setPOpen(true)}
                    onMouseLeave={() => setPOpen(false)}
                    className={activeStyle("/packages", "relative group")}
                >
                    {/* Link and Chevron */}
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Link href="/packages">{t("packages")}</Link>
                        <ChevronDown size={16} />
                    </div>

                    {/* Dropdown */}
                    {pOpen && (
                        <div className="absolute left-0 top-full z-50 w-48 bg-white shadow-lg rounded-md p-1">
                            <Link
                                href={"/packages/international-tour-packages"}
                                className="block px-2 py-1.5 hover:bg-gray-100 rounded text-black"
                            >
                                International Tour Package
                            </Link>
                            {packages?.map((package_) => (
                                <Link
                                    href={"/packages/" + package_.slug}
                                    key={package_.documentId}
                                    className="block px-2 py-1.5 hover:bg-gray-100 rounded text-black"
                                >
                                    {package_.package}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
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
                                <Link
                                    href={
                                        "/packages/international-tour-packages"
                                    }
                                    onClick={closeMenu}
                                >
                                    <li>International Tour Package</li>
                                </Link>
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
            <li className={activeStyle("/about-us")}>
                <Link href={"/about-us"} onClick={closeMenu}>
                    {t("aboutUs")}
                </Link>
            </li>
            <li className={activeStyle("/contact-us")}>
                <Link href={"/contact-us"} onClick={closeMenu}>
                    {t("contactUs")}
                </Link>
            </li>
            <li className="lg:hidden">
                <ContactFormSmModal
                    destinations={destinations}
                    packages={packages}
                    locale={locale}
                >
                    <Button className="rounded-full font-semibold lg:!px-5 lg:!py-2.5 cursor-pointer hover:bg-white bg-[#202020] text-white !px-5">
                        {t("cta")}
                        <ArrowRightUp color="red" />
                    </Button>
                </ContactFormSmModal>
            </li>
        </ul>
    );
};

export default NavItems;
