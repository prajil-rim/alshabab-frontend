import { LinkProps, LogoProps } from "@/types";
import { StrapiImage } from "../common/strapi-image";
import Link from "next/link";
import Image from "next/image";
import Mail from "../icons/mail";
import MapPin from "../icons/map-pin";
import Call from "../icons/call";

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
    socials: LinkProps[];
    contact_info: {
        id: number;
        contact: string;
        contact_details: string;
    }[];
}

type ContactType = "phone" | "email" | "location";

const devSocials = [
    "http://localhost:3000/images/icons/instagram.svg",
    "http://localhost:3000/images/icons/whatsapp.svg",
    "http://localhost:3000/images/icons/facebook.svg",
    "http://localhost:3000/images/icons/youtube.svg",
];

const contactIcons = {
    phone: <Call />,
    email: <Mail />,
    location: <MapPin />,
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
    return (
        <footer className="bg-off-black text-primary-foreground font-manrope">
            <div className="max-w-6xl mx-auto px-2 py-8">
                <div className="grid grid-cols-5 py-10">
                    <div className="col-span-2 space-y-4">
                        <StrapiImage
                            // src={logo.image.url}
                            src="http://localhost:3000/images/logo/footer_logo.webp"
                            alt={logo.image.alternativeText || logo.logoText}
                            width={200}
                            height={150}
                        />
                        <p className="max-w-sm">{description}</p>
                    </div>
                    <div className="space-y-6">
                        <div className="text-xl font-bold">Quick Links</div>
                        <ul className="space-y-3.5">
                            {quick_links.map((link) => (
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
                        <div className="text-xl font-bold">Support</div>
                        <ul className="space-y-3.5">
                            {support.map((link) => (
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
                        <div className="text-xl font-bold">Stay Connected</div>
                        <div className="space-y-5">
                            <ul className="flex items-center gap-3.5">
                                {devSocials.map((social, i) => (
                                    <li key={i}>
                                        <Link href={"/"}>
                                            <StrapiImage
                                                alt={"youtube"}
                                                // src={social.icon.url}
                                                src={social}
                                                width={25}
                                                height={25}
                                            />
                                        </Link>
                                    </li>
                                ))}
                                {/* {socials.map((social, i) => (
                                <li key={social.id + i}>
                                    <StrapiImage
                                        alt={social.text}
                                        // src={social.icon.url}
                                        src="http://localhost:3000/images/icons/youtube.svg"
                                        width={25}
                                        height={25}
                                    />
                                    <Link
                                        href={social.href}
                                        target={
                                            social.isExternal
                                                ? "_blank"
                                                : "_self"
                                        }
                                    >
                                        {social.text}
                                    </Link>
                                </li>
                            ))} */}
                            </ul>
                            <ul className="space-y-3">
                                {contact_info.map((contact) => (
                                    <li
                                        key={contact.id}
                                        className="flex items-center gap-1"
                                    >
                                        {
                                            contactIcons[
                                                contact.contact as ContactType
                                            ]
                                        }
                                        <Link href="mailto:hello@rankin.to">
                                            {contact.contact_details}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-7 border-[#646D79]" />
                <div className="flex items-center gap-5 justify-center">
                    <span>
                        &copy; {new Date().getFullYear()} {copy}. All rights
                        reserved.
                    </span>
                    <Link
                        href={privacy_policy.href}
                        target={privacy_policy.isExternal ? "_blank" : "_self"}
                    >
                        {privacy_policy.text}
                    </Link>
                    |
                    <Link
                        href={terms.href}
                        target={terms.isExternal ? "_blank" : "_self"}
                    >
                        {terms.text}
                    </Link>
                    |
                    <Link
                        href={sitemap.href}
                        target={sitemap.isExternal ? "_blank" : "_self"}
                    >
                        {sitemap.text}
                    </Link>
                    |
                    <Link
                        href={cookies.href}
                        target={cookies.isExternal ? "_blank" : "_self"}
                    >
                        {cookies.text}
                    </Link>
                </div>
            </div>
            <Image
                src={"/images/logo/footer_banner.webp"}
                alt={"footer"}
                width={1500}
                height={500}
            />
        </footer>
    );
};

export default Footer;
