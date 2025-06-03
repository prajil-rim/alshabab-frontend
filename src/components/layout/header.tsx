import { DestinationListProps, LogoProps, PackageListProps } from "@/types";
import { StrapiImage } from "../common/strapi-image";
import ContactFormModal from "../modal/contact-form-modal";
import NavItems from "./nav-items";
import Link from "next/link";

interface HeaderProps {
    cta: string;
    logo: LogoProps;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
}

export function Header({
    cta,
    logo,
    destinations,
    packages,
}: Readonly<HeaderProps>) {
    if (!cta || !logo) return null;

    return (
        <header className="absolute z-50 w-full flex justify-between items-center p-4 max-w-6xl left-1/2 -translate-x-1/2 font-manrope">
            <Link href={"/"}>
                <StrapiImage
                    // src={logo.image.url}
                    src="http://localhost:3000/images/logo/logo.webp"
                    alt={logo.image.alternativeText || logo.logoText}
                    width={70}
                    height={40}
                />
            </Link>
            <NavItems destinations={destinations} packages={packages} />
            <ContactFormModal
                cta={cta}
                destinations={destinations}
                packages={packages}
            />
        </header>
    );
}
