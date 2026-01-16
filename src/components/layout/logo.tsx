"use client";

import { getImage } from "@/lib/utils";
import { LogoProps } from "@/types";
import { useBlackNavOnScroll } from "@/hooks/use-black-nav-on-scroll";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const Logo = ({ logo }: { logo: LogoProps }) => {
    const isBlack = useBlackNavOnScroll();

    return (
        <Link href={"/"}>
            <Image
                src={getImage({
                    local: "/images/logo/form_logo.webp",
                    prod: isBlack
                        ? "/images/logo/form_logo.webp"
                        : logo.image?.url,
                })}
                alt={logo.image.alternativeText || logo.logoText}
                width={70}
                height={40}
                priority
            />
        </Link>
    );
};

export default Logo;
