import { DestinationListProps, LogoProps, PackageListProps } from "@/types";
import { StrapiImage } from "../common/strapi-image";
import ContactFormModal from "../modal/contact-form-modal";
import NavItems from "./nav-items";
import Link from "next/link";
import Sidenav from "../sheet/sidenav";
import ContactFormSmModal from "../modal/contact-form-sm-modal";
import LocaleSwitcher from "./language-switcher";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import { getImage } from "@/lib/utils";

interface HeaderProps {
    cta: string;
    logo: LogoProps;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    locale: string;
}

export function Header({
    cta,
    logo,
    destinations,
    packages,
    locale,
}: Readonly<HeaderProps>) {
    if (!cta || !logo) return null;

    return (
        <header className="absolute z-50 w-full flex justify-between items-center p-4 max-w-7xl lg:px-6 2xl:px-4 left-1/2 -translate-x-1/2 font-manrope">
            <Link href={"/"}>
                <StrapiImage
                    src={getImage({
                        local: process.env.PLACEHOLDER_IMAGE!,
                        prod: logo.image?.url,
                    })}
                    alt={logo.image.alternativeText || logo.logoText}
                    width={70}
                    height={40}
                    priority
                />
            </Link>
            <div className="hidden lg:block">
                <NavItems
                    destinations={destinations}
                    packages={packages}
                    locale={locale}
                />
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden lg:block">
                    <ContactFormModal
                        destinations={destinations}
                        packages={packages}
                        locale={locale}
                    >
                        <Button className="bg-white text-black rounded-full font-semibold lg:!px-5 lg:!py-2.5 cursor-pointer hover:bg-white">
                            {cta}
                            <ArrowRightUp color="red" />
                        </Button>
                    </ContactFormModal>
                </div>
                <div className="lg:hidden">
                    <ContactFormSmModal
                        destinations={destinations}
                        packages={packages}
                        locale={locale}
                    >
                        <Button className="rounded-full font-semibold lg:!px-5 lg:!py-2.5 cursor-pointer hover:bg-white bg-white text-black">
                            {cta}
                            <ArrowRightUp color="red" />
                        </Button>
                    </ContactFormSmModal>
                </div>
                <Sidenav
                    logo={logo}
                    destinations={destinations}
                    packages={packages}
                    locale={locale}
                />
                <div className="hidden lg:block">
                    <LocaleSwitcher />
                </div>
            </div>
        </header>
    );
}
