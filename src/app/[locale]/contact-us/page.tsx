import ImageHero from "@/components/hero/image-hero";
import FooterCTA from "@/components/layout/footer-cta";
import InternalLinks from "@/components/layout/internal-links";
import FormSection from "@/components/pages/contact-us/form-section";
import LocationSection from "@/components/pages/contact-us/location-section";
import {
    getContactUsPage,
    getDestinationsList,
    getParentPackagesList,
} from "@/data/loaders";
import { routing } from "@/i18n/routing";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

let contactUsPageDataPromise: ReturnType<typeof getContactUsPage> | null = null;
let localeCache: string | null = null;

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

function getContactUsPageOnce(locale: string) {
    if (!contactUsPageDataPromise || localeCache !== locale) {
        contactUsPageDataPromise = getContactUsPage(locale);
        localeCache = locale;
    }
    return contactUsPageDataPromise;
}

async function loader(locale: string) {
    const [data, destinations, packages] = await Promise.all([
        getContactUsPageOnce(locale),
        getDestinationsList(),
        getParentPackagesList(),
    ]);
    if (!data || !data.data) notFound();
    return {
        data: data.data,
        destinations: destinations.data,
        packages: packages.data,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const locale = (await params).locale;
    const { data } = await getContactUsPageOnce(locale);

    return returnMetadata(data);
}

const ContactPage = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const locale = (await params).locale;
    const { data, destinations, packages } = await loader(locale);

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <>
            <ImageHero
                background={data.hero?.background}
                description={data.hero?.description}
                title={data.hero?.title}
                locale={locale}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "Contact Us",
                    },
                ]}
                packages={packages}
            />
            <FormSection
                contact_info={data.contact_info || []}
                contact_title={data.contact_title}
                destinations={destinations || []}
                packages={packages || []}
            />
            <LocationSection {...data.offices_section} />
            <FooterCTA {...data.footer_cta_section} />
            <InternalLinks internal_links={data.internal_links || []} />
        </>
    );
};

export default ContactPage;
