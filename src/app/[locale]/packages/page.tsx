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
    getPackagesList,
    getPackagesPage,
    getTestimonials,
} from "@/data/loaders";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { returnMetadata } from "@/lib/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

let packagesPageDataPromise: ReturnType<typeof getPackagesPage> | null = null;
let localeCache: string | null = null;

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

function getPackagesPageOnce(locale: string) {
    if (!packagesPageDataPromise || localeCache !== locale) {
        packagesPageDataPromise = getPackagesPage(locale);
        localeCache = locale;
    }
    return packagesPageDataPromise;
}

async function loader(locale: string) {
    const [pageData, testimonials, destinations, packages] = await Promise.all([
        getPackagesPageOnce(locale),
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
    const { data } = await getPackagesPageOnce(locale);

    return returnMetadata(data);
}

const PackageListingPage = async ({
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
                destinations={destinations}
                packages={packages}
                locale={locale}
                breadcrumbs={[
                    {
                        text: t("home"),
                        href: "/",
                    },
                    {
                        text: t("packages"),
                    },
                ]}
            />
            <PDListSection {...pageData.packages} />
            <FormSectionWithPoints
                {...pageData.form_section}
                packages={packages}
                destinations={destinations}
            />
            <PopularPD {...pageData.popular_packages} locale={locale} />
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

export default PackageListingPage;
