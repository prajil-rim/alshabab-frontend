"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { StrapiImage } from "../common/strapi-image";
import NavItems from "../layout/nav-items";
import { DestinationListProps, LogoProps, PackageListProps } from "@/types";
import { useState } from "react";
import LocaleSwitcher from "../layout/language-switcher";

interface SidenavProps {
    logo: LogoProps;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
}

const Sidenav = ({ logo, destinations, packages }: Readonly<SidenavProps>) => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Menu className="text-white stroke-3 lg:hidden" />
            </SheetTrigger>
            <SheetContent className="py-6 px-3 space-y-4">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex justify-between items-center px-3">
                    <StrapiImage
                        src={logo.image.url || process.env.PLACEHOLDER_IMAGE!}
                        alt={logo.image.alternativeText || logo.logoText}
                        className="brightness-0"
                        width={70}
                        height={40}
                    />
                    <SheetClose>
                        <Menu className="stroke-3" />
                    </SheetClose>
                </div>
                <NavItems
                    destinations={destinations}
                    packages={packages}
                    isMobile
                    setOpen={setOpen}
                />
                <LocaleSwitcher />
            </SheetContent>
        </Sheet>
    );
};

export default Sidenav;
