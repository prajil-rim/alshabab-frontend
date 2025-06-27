import FAQSection from "@/components/common/faq/faq-section";
import FormSection from "@/components/common/form-section";
import InfoBlockCta from "@/components/common/info-block-cta";
import Testimonials from "@/components/common/testimonials/testimonials";
import FooterCTA from "@/components/layout/footer-cta";
import GallerySection from "@/components/pages/destinations/gallery-section";
import RouteSection from "@/components/pages/destinations/route-section";
import TripDetailsSection from "@/components/pages/packages/trip-details-section";
import {
    getDestination,
    getDestinationsList,
    getPackagesList,
} from "@/data/loaders";
import { notFound } from "next/navigation";
import { ReelsSection } from "@/components/common/reels-section/reels-section";
import VideoHero from "@/components/hero/video-hero";
import StaysSection from "@/components/pages/destinations/stays-section";
import AttractionsSection from "@/components/pages/destinations/attractions-section";
import DealsSection from "@/components/pages/destinations/deals-section";
import { Metadata } from "next";
import { returnMetadata } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

let destinationDataPromise: ReturnType<typeof getDestination> | null = null;
let localeCache: string | null = null;

function getDestinationDataOnce(slug: string, locale: string) {
    if (!destinationDataPromise || localeCache !== locale) {
        destinationDataPromise = getDestination(slug, locale);
        localeCache = locale;
    }
    return destinationDataPromise;
}

async function loader(slug: string, locale: string) {
    const [pageData, destinations, packages] = await Promise.all([
        getDestinationDataOnce(slug, locale),
        getDestinationsList(),
        getPackagesList(),
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
    const { data } = await getDestinationDataOnce(slug, locale);

    return returnMetadata(data);
}

const DestinationPage = async ({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}) => {
    const { slug, locale } = await params;
    if (!slug) return notFound();

    const { pageData, destinations, packages } = await loader(
        slug as string,
        locale
    );

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations("homePage.header.navItems");

    return (
        <main>
            <VideoHero
                {...pageData.hero}
                breadcrumbs={[
                    {
                        text: t("home"),
                        href: "/",
                    },
                    {
                        text: t("destinations"),
                        href: "/destinations",
                    },
                    {
                        text: pageData.destination,
                    },
                ]}
            />
            <section className="bg-gradient-to-t from-transparent via-[#F5F1E3] to-[#448CD9]/80">
                <div className="max-w-7xl mx-auto py-5 lg:py-10 px-3 lg:px-6 2xl:px-0">
                    <InfoBlockCta {...pageData.info_section} />
                </div>
            </section>
            <FormSection
                {...pageData.form_section}
                packages={packages}
                destinations={destinations}
                packageForm={false}
                className="from-[#ECF4FF] to-white"
            />
            <ReelsSection {...pageData.reels_section} locale={locale} />
            <AttractionsSection {...pageData.attractions_section} />
            <StaysSection {...pageData.stays_section} />
            <TripDetailsSection {...pageData.experience_section} />
            <GallerySection {...pageData.gallery_section} />
            <DealsSection {...pageData.deals_section} />
            <RouteSection {...pageData.route_section} />
            <Testimonials {...pageData.testimonials} />
            <FAQSection
                title={pageData?.faq_section?.title}
                description={pageData?.faq_section?.description}
                faqs={pageData?.faq_section?.faqs}
            />
            <FooterCTA {...pageData.footer_cta_section} />
        </main>
    );
};

export default DestinationPage;
