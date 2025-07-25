import { LinkProps, LogoProps, SocialsProps } from "@/types";
import { StrapiImage } from "../common/strapi-image";
import Link from "next/link";
import Image from "next/image";
import Mail from "../icons/mail";
import MapPin from "../icons/map-pin";
import Call from "../icons/call";
import { useTranslations } from "next-intl";
import { getImage } from "@/lib/utils";

interface FooterProps {
    description: string;
    logo: LogoProps;
    quick_links: LinkProps[];
    support: LinkProps[];
    privacy_policy: LinkProps;
    terms: LinkProps;
    cookies: LinkProps;
    sitemap: LinkProps;
    copy: string;
    socials: SocialsProps[];
    contact_info: {
        id: number;
        contact: string;
        contact_details: string;
    }[];
}

type ContactType = "phone" | "email" | "location";

const contactIcons = {
    phone: <Call />,
    email: <Mail />,
    location: <MapPin />,
};

const contactLink = {
    phone: "tel:",
    email: "mailto:",
    location: "https://www.google.com/maps/search/",
};

const Footer = ({
    cookies,
    copy,
    description,
    logo,
    quick_links,
    support,
    privacy_policy,
    terms,
    sitemap,
    socials,
    contact_info,
}: Readonly<FooterProps>) => {
    const t = useTranslations("footer");
    return (
        <footer className="bg-off-black text-primary-foreground font-manrope">
            <div className="max-w-7xl mx-auto px-3 py-8 lg:px-6 2xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-5 py-10 space-y-8 lg:space-y-0">
                    <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
                        <StrapiImage
                            src={getImage({
                                local: process.env.PLACEHOLDER_IMAGE!,
                                prod: logo.image.url,
                            })}
                            alt={logo.image.alternativeText || logo.logoText}
                            width={200}
                            height={150}
                            className="mx-auto lg:mx-0"
                        />
                        <p className="max-w-sm mx-auto lg:mx-0">
                            {description}
                        </p>
                    </div>
                    <div className="space-y-5 lg:space-y-6 text-center lg:text-left">
                        <div className="text-xl font-bold">
                            {t("quickLinks")}
                        </div>
                        <ul className="space-y-3.5">
                            {quick_links?.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        href={link.href}
                                        target={
                                            link.isExternal ? "_blank" : "_self"
                                        }
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <div className="text-xl font-bold text-center lg:text-left">
                            {t("support")}
                        </div>
                        <ul className="space-y-3.5 text-center lg:text-left">
                            {support?.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={link.href}
                                        target={
                                            link.isExternal ? "_blank" : "_self"
                                        }
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <div className="text-xl font-bold text-center lg:text-left">
                            {t("stayConnected")}
                        </div>
                        <div className="space-y-5">
                            <ul className="flex items-center gap-3.5 justify-center lg:justify-start">
                                {socials?.map((social, i) => (
                                    <li key={i}>
                                        <Link href={"/"}>
                                            <StrapiImage
                                                alt={
                                                    social.icon
                                                        .alternativeText ||
                                                    "Alternative text not provided"
                                                }
                                                src={getImage({
                                                    local: process.env
                                                        .PLACEHOLDER_IMAGE!,
                                                    prod: social.icon?.url,
                                                })}
                                                width={25}
                                                height={25}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-3 flex flex-col justify-center items-center lg:items-start">
                                {contact_info?.map((contact) => (
                                    <li
                                        key={contact.id}
                                        className="flex items-center gap-1"
                                        dir="ltr"
                                    >
                                        {
                                            contactIcons[
                                                contact.contact as ContactType
                                            ]
                                        }
                                        <Link
                                            href={
                                                contactLink[
                                                    contact.contact as ContactType
                                                ] + contact.contact_details
                                            }
                                        >
                                            {contact.contact_details}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-7 border-[#646D79]" />
                <div className="flex flex-wrap items-center gap-2 lg:gap-5 justify-center">
                    <span>
                        &copy; {new Date().getFullYear()} {copy}. {t("copy")}.
                    </span>
                    <Link
                        href={privacy_policy?.href}
                        target={privacy_policy?.isExternal ? "_blank" : "_self"}
                    >
                        {privacy_policy?.text}
                    </Link>
                    <span>|</span>
                    <Link
                        href={terms?.href}
                        target={terms?.isExternal ? "_blank" : "_self"}
                    >
                        {terms?.text}
                    </Link>
                    <span>|</span>
                    <Link
                        href={sitemap?.href}
                        target={sitemap?.isExternal ? "_blank" : "_self"}
                    >
                        {sitemap?.text}
                    </Link>
                    <span className="hidden lg:block">|</span>
                    <Link
                        href={cookies?.href}
                        target={cookies?.isExternal ? "_blank" : "_self"}
                    >
                        {cookies?.text}
                    </Link>
                </div>
            </div>
            <Image
                src={"/images/logo/footer_banner.webp"}
                alt={"footer"}
                width={1500}
                height={500}
                className="w-full"
            />
        </footer>
    );
};

export default Footer;
