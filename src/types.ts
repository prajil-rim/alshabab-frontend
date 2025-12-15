export interface LinkProps {
    id: number;
    text: string;
    href: string;
    isExternal: boolean;
}

export interface LabelProps {
    id: number;
    label: string;
}

export interface MediaProps {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
}

export interface LogoProps {
    id: number;
    logoText: string;
    image: MediaProps;
}

interface Base {
    id: number;
    documentId: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
}

export interface ReelsSectionProps {
    id: number;
    title: string;
    description: string;
    button: LinkProps;
    background: MediaProps;
    reels: MediaProps[];
}

export interface ImageHeroProps {
    id: number;
    title: string;
    description: string;
    background: MediaProps;
    cta_button: string;
    cta_whatsapp?: LinkProps;
    breadcrumbs?: {
        text: string;
        href?: string;
    }[];
}

export interface ContactInfoProps {
    id: number;
    contact: "phone" | "email" | "location";
    contact_details: string;
}

export interface DestinationListProps extends Base {
    destination: string;
    slug: string;
}

export interface PackageListProps extends Base {
    package: string;
    slug: string;
    destination: {
        documentId: string;
    };
}

export interface ParentPackageListProps extends Base {
    destination: {
        documentId: string;
    };
    package: string;
    package_slug: string;
}

export interface FooterCTAProps {
    id: number;
    title: string;
    description: string;
    text_align: "left" | "center";
    image: MediaProps | null;
    background: MediaProps | null;
    cta_call: LinkProps;
    cta_chat: LinkProps;
}

export interface OfficesProps {
    id: number;
    title: string;
    offices: {
        id: number;
        location: string;
        url: string;
        icon: MediaProps;
    }[];
}

export interface BlogCardProps {
    id: number;
    documentId: string;
    slug: string;
    blog_title: string;
    hero: {
        id: number;
        title: string;
        read_time: string;
        date: string;
        cover: MediaProps;
    };
    blog_category: {
        id: number;
        documentId: string;
        slug: string;
        category: string;
    };
}

export interface TestimonialProps {
    id: number;
    testimonial: string;
    user: string;
    location: string;
    image: MediaProps;
}

export interface CardProps {
    id: number;
    title: string;
    description: string;
    label: string | null;
    image: MediaProps;
    cta: LinkProps | null;
}

export interface InfoBlockProps {
    id: number;
    reversed: boolean;
    title: string;
    description: string;
    smallImage: MediaProps;
    largeImage: MediaProps;
    button: LinkProps | null;
}

export interface SocialsProps {
    id: number;
    href: string;
    isExternal: boolean;
    label: string;
    icon: MediaProps;
}

export interface PDHeroProps {
    id: number;
    title: string;
    description: string;
    slide_name: string;
    cta_button: string;
    cta_whatsapp: LinkProps;
    background: MediaProps;
}

export interface HomeHeroProps {
    id: number;
    title: string;
    description: string;
    destination: string;
    attraction: string;
    cta: LinkProps;
    background: {
        id: number;
        type: "image" | "video";
        background: MediaProps;
    };
}

export interface SlideProps {
    id: number;
    title: string;
    description: string;
    image: MediaProps;
    cta: LinkProps | null;
}

export interface TabProps {
    id: number;
    tab_heading: string;
    tab_value: string;
    slides: SlideProps[];
}

export interface TourProps {
    id: number;
    label: string;
    layout: "rectangle" | "square";
    image: MediaProps;
}

export interface RouteProps {
    id: number;
    title: string;
    description: string;
    icon: LogoProps;
    google_map_link: LinkProps;
}

export interface GalleryProps {
    id: number;
    label: string;
    image: MediaProps;
}

export interface DealsProps extends Base {
    package: string;
    slug: string;
    summary: string;
    price: number;
    price_per: string;
    hero: {
        background: MediaProps;
    };
    packages_for: {
        id: number;
        label: string;
    }[];
}

export interface GuideProps {
    id: number;
    name: string;
    label: string;
    image: MediaProps;
    languages: {
        id: number;
        label: string;
    }[];
    expertise: {
        id: number;
        label: string;
    }[];
    socials: {
        id: number;
        href: string;
        isExternal: boolean;
        label: string;
        icon: MediaProps;
    }[];
}

export type GroupedContactInfo = {
    [key in ContactInfoProps["contact"]]?: string[];
};

export type SeoMetadata = {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    metaRobots: string;
    canonicalUrl: string;
    openGraph: {
        ogTitle: string;
        ogDescription: string;
        ogUrl: string;
        ogType: string;
        ogImage: {
            url: string;
            alternativeText: string;
        };
    };
};

export type Policy = {
    id: number;
    title: string;
    column_1: {
        id: number;
        label: string;
    }[];
    column_2: {
        id: number;
        label: string;
    }[];
};

export type TermsAndConditionsProps = {
    id: number;
    title: string;
    description: string;
    disclaimer: string;
    terms: {
        id: number;
        title: string;
        points: LabelProps[];
    }[];
};

export type PackagePriceDetails = {
    base_price_per_adult: string;
    offer_price_per_adult: string;
    price_per_room: string;
    discount_percentage: number;
};

export type PackageGeneralInfo = {
    from_city: string;
    price_category: string;
    flights: "With Flight" | "Without Flight";
    more_about_trip: {
        id: number;
        title: string;
        description: string;
    };
    whatsapp: string;
    call_us_on: string;
    timing: string;
    price_details: PackagePriceDetails;
    duration: {
        number_of_nights: number;
        number_of_days: number;
    };
    location_details: {
        from_location: string;
        to_location: string;
    };
    package_includes: {
        id: number;
        label: string;
        icon: MediaProps;
    }[];
    package_categories: {
        slug: string;
        category: string;
    }[];
    pay_with: {
        id: number;
        tabby: boolean;
        tamara: boolean;
    };
    form_modal_title: string;
    form_modal_phone: string;
};

export type PackageCardProps = {
    id: number;
    package: string;
    slug: string;
    hero: {
        background: MediaProps;
    };
    package_general_info: PackageGeneralInfo;
};

export type PackageBannerProps = {
    id: number;
    title: string;
    image: MediaProps;
    button: LinkProps;
};

export type TeamProfileCardProps = {
    id: number;
    image: MediaProps;
    name: string;
    role: string;
    social_links: {
        id: number;
        href: string;
        isExternal: boolean;
        label: string;
        icon: MediaProps;
    }[];
    bio: string;
    experience: string;
    specialization?: string;
    button: LinkProps;
};
