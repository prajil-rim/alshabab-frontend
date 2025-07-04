import BlogSection from "@/components/common/blog-section/blog-section";
import FAQSection from "@/components/common/faq/faq-section";
import FormSection from "@/components/common/form-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import ImageHero from "@/components/hero/image-hero";
import FooterCTA from "@/components/layout/footer-cta";
import PackageIncludesSection from "@/components/pages/packages/package-includes-section";
import TripDetailsSection from "@/components/pages/packages/trip-details-section";
import {
    getDestinationsList,
    getPackage,
    getPackagesList,
} from "@/data/loaders";
import { routing } from "@/i18n/routing";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

let packageDataPromise: ReturnType<typeof getPackage> | null = null;
let localeCache: string | null = null;

function getPackageDataOnce(slug: string, locale: string) {
    if (!packageDataPromise || localeCache !== locale) {
        packageDataPromise = getPackage(slug, locale);
        localeCache = locale;
    }
    return packageDataPromise;
}

async function loader(slug: string, locale: string) {
    const [pageData, packages, destinations] = await Promise.all([
        getPackageDataOnce(slug, locale),
        getPackagesList(),
        getDestinationsList(),
    ]);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
        packages: packages.data,
        destinations: destinations.data,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
    const { slug, locale } = await params;
    const { data } = await getPackageDataOnce(slug, locale);

    return returnMetadata(data);
}

const PackagePage = async ({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}) => {
    const { slug, locale } = await params;
    if (!slug) return notFound();

    const { pageData, packages, destinations } = await loader(
        slug as string,
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
                title={pageData.hero.title}
                cta_button={pageData.hero.cta_button}
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
                        href: "/packages",
                    },
                    {
                        text: pageData.package,
                    },
                ]}
            />
            <FormSection {...pageData.form_section} packages={packages} />
            <PackageIncludesSection {...pageData.package_includes_section} />
            <TripDetailsSection {...pageData.trip_details} />
            <div className="pt-10 lg:pt-20"></div>
            <Testimonials {...pageData?.testimonials} />
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

export default PackagePage;
