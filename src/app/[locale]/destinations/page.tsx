import BlogSection from "@/components/common/blog-section/blog-section";
import FAQSection from "@/components/common/faq/faq-section";
import FormSectionWithPoints from "@/components/common/form-section-with-points";
import PDListSection from "@/components/common/pd-list-section/pd-list-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import PDListingHero from "@/components/hero/pd-listing-hero";
import FooterCTA from "@/components/layout/footer-cta";
import PopularPD from "@/components/common/pd-packages";
import {
    getDestinationsList,
    getDestinationsPage,
    getPackagesList,
    getTestimonials,
} from "@/data/loaders";
import { notFound } from "next/navigation";
import React from "react";
import GlobalToursSection from "@/components/common/global-tours-section";
import { Metadata } from "next";
import { returnMetadata } from "@/lib/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

let destinationsPageDataPromise: ReturnType<typeof getDestinationsPage> | null =
    null;
let localeCache: string | null = null;

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

function getDestinationsPageOnce(locale: string) {
    if (!destinationsPageDataPromise || localeCache !== locale) {
        destinationsPageDataPromise = getDestinationsPage(locale);
        localeCache = locale;
    }
    return destinationsPageDataPromise;
}

async function loader(locale: string) {
    const [pageData, testimonials, destinations, packages] = await Promise.all([
        getDestinationsPageOnce(locale),
        getTestimonials(locale),
        getDestinationsList(),
        getPackagesList(),
    ]);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
        testimonials: testimonials.data,
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
    const { data } = await getDestinationsPageOnce(locale);

    return returnMetadata(data);
}

const DestinationListingPage = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const locale = (await params).locale;
    const { pageData, testimonials, destinations, packages } = await loader(
        locale
    );

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations("homePage.header.navItems");

    return (
        <main>
            <PDListingHero
                hero={pageData.hero}
                breadcrumbs={[
                    {
                        text: t("home"),
                        href: "/",
                    },
                    {
                        text: t("destinations"),
                    },
                ]}
            />
            <PDListSection {...pageData.destinations} />
            <FormSectionWithPoints
                {...pageData.form_section}
                packages={packages}
                destinations={destinations}
                pointer={true}
            />
            <PopularPD {...pageData.popular_destinations} locale={locale} />
            <GlobalToursSection {...pageData.global_tour_section} />
            <Testimonials {...testimonials} />
            <BlogSection {...pageData.blog_section} />
            <FAQSection
                title={pageData?.faq_section?.title}
                description={pageData?.faq_section?.description}
                faqs={pageData?.faq_section?.faqs}
            />
            <FooterCTA {...pageData.footer_cta_section} />
        </main>
    );
};

export default DestinationListingPage;
