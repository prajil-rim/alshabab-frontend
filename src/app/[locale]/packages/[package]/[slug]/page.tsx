import BlogSection from "@/components/common/blog-section/blog-section";
import FAQSection from "@/components/common/faq/faq-section";
import FormSection from "@/components/common/form-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import CarouselHero from "@/components/hero/carousel-hero";
import FooterCTA from "@/components/layout/footer-cta";
import InternalLinks from "@/components/layout/internal-links";
import PackageDetailsSection from "@/components/pages/packages/package-details";
import PackageIncludesSection from "@/components/pages/packages/package-includes-section";
import TripDetailsSection from "@/components/pages/packages/trip-details-section";
import { getPackage, getParentPackagesList } from "@/data/loaders";
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
let slugCache: string | null = null;

function getPackageDataOnce(slug: string, locale: string) {
    if (!packageDataPromise || localeCache !== locale || slugCache !== slug) {
        packageDataPromise = getPackage(slug, locale);
        localeCache = locale;
        slugCache = slug;
    }
    return packageDataPromise;
}

async function loader(slug: string, locale: string) {
    const [pageData, packages] = await Promise.all([
        getPackageDataOnce(slug, locale),
        getParentPackagesList(),
    ]);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
        packages: packages.data,
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
    params: Promise<{ package: string; slug: string; locale: string }>;
}) => {
    const { package: package_, slug, locale } = await params;
    if (!slug) return notFound();

    const { pageData, packages } = await loader(slug as string, locale);

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations("homePage.header.navItems");

    const breadcrumbs = [
        {
            text: t("home"),
            href: "/",
        },
        {
            text: t("packages"),
            href: "/packages",
        },
        {
            text: packages.find(
                (p: { package_slug: string }) => p.package_slug === package_
            )?.package,
            href: `/packages/${package_}`,
        },
        {
            text: pageData.package,
        },
    ];

    return (
        <main className="black-nav-section">
            <CarouselHero
                breadcrumbs={breadcrumbs}
                hero={pageData.hero}
                price={pageData.price}
                number_of_days={
                    pageData.package_general_info?.duration?.number_of_days
                }
                number_of_nights={
                    pageData.package_general_info?.duration?.number_of_nights
                }
                package_={pageData.package}
            />
            <FormSection {...pageData.form_section} packages={packages} />
            {pageData.package_general_info && (
                <PackageDetailsSection
                    package_general_info={pageData.package_general_info}
                    package_itinerary={pageData.package_itinerary}
                    package_day_chart={pageData.package_day_chart}
                    package_inc_and_exc={pageData.package_inc_and_exc}
                    package_policies={pageData.package_policies}
                    packages={packages}
                    locale={locale}
                />
            )}
            <PackageIncludesSection {...pageData.trip_highlights_section} />
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
            <InternalLinks internal_links={pageData.internal_links || []} />
        </main>
    );
};

export default PackagePage;
