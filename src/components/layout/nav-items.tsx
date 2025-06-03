"use client";

import Link from "next/link";
import Destinations from "../dropdown/destinations";
import Packages from "../dropdown/packages";
import { DestinationListProps, PackageListProps } from "@/types";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavItems = ({
    destinations,
    packages,
}: {
    destinations: DestinationListProps[];
    packages: PackageListProps[];
}) => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    function activeStyle(path: string, style?: string) {
        return clsx(
            { "bg-white/20 font-semibold": isActive(path) },
            "px-3 py-1 bg-transparent rounded-full",
            style
        );
    }

    return (
        <ul className="flex text-white font-normal text-sm gap-5">
            <li className={activeStyle("/")}>
                <Link href={"/"}>Home</Link>
            </li>
            <li className={activeStyle("/about-us")}>
                <Link href={"/about-us"}>About Us</Link>
            </li>
            <li
                className={activeStyle(
                    "/destinations",
                    "flex items-center gap-1 cursor-pointer"
                )}
            >
                <Link href={"/destinations"}>Destinations </Link>
                <Destinations destinations={destinations || []} />
            </li>
            <li
                className={activeStyle(
                    "/packages",
                    "flex items-center gap-1 cursor-pointer"
                )}
            >
                <Link href={"/packages"}>Packages </Link>
                <Packages packages={packages || []} />
            </li>
            <li className={activeStyle("/blogs")}>
                <Link href={"/blogs"}>Insights</Link>
            </li>
            <li className={activeStyle("/contact-us")}>
                <Link href={"/contact-us"}>Contact Us</Link>
            </li>
        </ul>
    );
};

export default NavItems;
