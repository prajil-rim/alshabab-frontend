import { Link } from "@/i18n/navigation";
import { LinkProps } from "@/types";

type InternalLinksProps = {
    id: number;
    title: string;
    links: LinkProps[];
};

const InternalLinks = ({
    internal_links,
}: {
    internal_links: InternalLinksProps[];
}) => {
    if (!internal_links || internal_links.length === 0) return null;
    return (
        <div className="bg-off-black text-primary-foreground font-manrope">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-3 py-8 lg:px-6 2xl:px-0">
                {internal_links.map((i_link) => (
                    <div
                        className="space-y-5 lg:space-y-6 text-center lg:text-left"
                        key={i_link.id}
                    >
                        <div className="text-xl font-bold font-playfair-display">
                            {i_link.title}
                        </div>
                        <ul className="space-y-3.5">
                            {i_link.links.map((link) => (
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
                ))}
            </div>
        </div>
    );
};

export default InternalLinks;
