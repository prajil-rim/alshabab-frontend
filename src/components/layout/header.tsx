import { DestinationListProps, LogoProps, PackageListProps } from "@/types";
import { StrapiImage } from "../common/strapi-image";
import ContactFormModal from "../modal/contact-form-modal";
import NavItems from "./nav-items";
import Link from "next/link";
import Sidenav from "../sheet/sidenav";
import ContactFormSmModal from "../modal/contact-form-sm-modal";
import LocaleSwitcher from "./language-switcher";

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
                    src={logo.image?.url || process.env.PLACEHOLDER_IMAGE!}
                    alt={logo.image.alternativeText || logo.logoText}
                    width={70}
                    height={40}
                    priority
                />
            </Link>
            <div className="hidden lg:block">
                <NavItems destinations={destinations} packages={packages} />
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden lg:block">
                    <ContactFormModal
                        cta={cta}
                        destinations={destinations}
                        packages={packages}
                        locale={locale}
                    />
                </div>
                <div className="lg:hidden">
                    <ContactFormSmModal
                        cta={cta}
                        destinations={destinations}
                        packages={packages}
                    />
                </div>
                <Sidenav
                    logo={logo}
                    destinations={destinations}
                    packages={packages}
                />
                <div className="hidden lg:block">
                    <LocaleSwitcher />
                </div>
            </div>
        </header>
    );
}
