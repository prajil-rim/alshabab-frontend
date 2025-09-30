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
import {
    DestinationListProps,
    LogoProps,
    ParentPackageListProps,
} from "@/types";
import { useState } from "react";
import LocaleSwitcher from "../layout/language-switcher";
import { getImage } from "@/lib/utils";

interface SidenavProps {
    logo: LogoProps;
    destinations: DestinationListProps[];
    packages: ParentPackageListProps[];
    locale: string;
}

const Sidenav = ({
    logo,
    destinations,
    packages,
    locale,
}: Readonly<SidenavProps>) => {
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
                        src={getImage({
                            local: process.env.PLACEHOLDER_IMAGE!,
                            prod: logo.image?.url,
                        })}
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
                    locale={locale}
                />
                <LocaleSwitcher />
            </SheetContent>
        </Sheet>
    );
};

export default Sidenav;
