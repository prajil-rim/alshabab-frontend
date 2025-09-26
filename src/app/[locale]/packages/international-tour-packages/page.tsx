import BlogSection from "@/components/common/blog-section/blog-section";
import FAQSection from "@/components/common/faq/faq-section";
import FormSectionWithPoints from "@/components/common/form-section-with-points";
import PDListSection from "@/components/common/pd-list-section/pd-list-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import FooterCTA from "@/components/layout/footer-cta";
import PopularPD from "@/components/common/pd-packages";
import {
    getDestinationsList,
    getPackagesList,
    getIntlPackagesPage,
    getTestimonials,
} from "@/data/loaders";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { returnMetadata } from "@/lib/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ImageHero from "@/components/hero/image-hero";
import InternalLinks from "@/components/layout/internal-links";

let packagesPageDataPromise: ReturnType<typeof getIntlPackagesPage> | null =
    null;
let localeCache: string | null = null;

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

function getIntlPackagesPageOnce(locale: string) {
    if (!packagesPageDataPromise || localeCache !== locale) {
        packagesPageDataPromise = getIntlPackagesPage(locale);
        localeCache = locale;
    }
    return packagesPageDataPromise;
}

async function loader(locale: string) {
    const [pageData, testimonials, destinations, packages] = await Promise.all([
        getIntlPackagesPageOnce(locale),
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
    const { data } = await getIntlPackagesPageOnce(locale);

    return returnMetadata(data);
}

const InternationalPackageListingPage = async ({
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
            <ImageHero
                background={pageData.hero.background}
                description={pageData.hero.description}
                locale={locale}
                title={pageData.hero.title}
                breadcrumbs={[{ text: t("home"), href: "/" }]}
                cta_button={pageData.hero.cta_button}
                cta_whatsapp={pageData.hero.cta_whatsapp}
                destinations={destinations}
                packages={packages}
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
            <InternalLinks internal_links={pageData.internal_links || []} />
        </main>
    );
};

export default InternationalPackageListingPage;
