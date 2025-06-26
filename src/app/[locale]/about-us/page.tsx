import InfoBlock from "@/components/common/info-block";
import PartnerSection from "@/components/common/partner-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import ImageHero from "@/components/hero/image-hero";
import FooterCTA from "@/components/layout/footer-cta";
import AboutSection1 from "@/components/pages/about-us/about-section-1";
import AwardsSection from "@/components/pages/about-us/awards-section";
import ExperiencesSection from "@/components/pages/about-us/experiences-section";
import FeaturedInSection from "@/components/pages/about-us/featured-in-section";
import GuidesSection from "@/components/pages/about-us/guides-section";
import MapSection from "@/components/pages/about-us/map-section";
import OurJourneySection from "@/components/pages/about-us/our-journey-section";
import { getAboutUsPage, getPartners, getTestimonials } from "@/data/loaders";
import { routing } from "@/i18n/routing";
import { returnMetadata } from "@/lib/utils";
import { InfoBlockProps } from "@/types";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

let aboutUsPageDataPromise: ReturnType<typeof getAboutUsPage> | null = null;
let localeCache: string | null = null;

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

function getAboutUsPageOnce(locale: string) {
    if (!aboutUsPageDataPromise || localeCache !== locale) {
        aboutUsPageDataPromise = getAboutUsPage(locale);
        localeCache = locale;
    }
    return aboutUsPageDataPromise;
}

async function loader(locale: string) {
    const [pageData, testimonials, partners] = await Promise.all([
        getAboutUsPageOnce(locale),
        getTestimonials(locale),
        getPartners(locale),
    ]);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
        testimonials: testimonials.data,
        partners: partners.data,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const locale = (await params).locale;
    const { data } = await getAboutUsPageOnce(locale);

    return returnMetadata(data);
}

export default async function AboutUsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const locale = (await params).locale;
    const { pageData, testimonials, partners } = await loader(locale);

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations("homePage.header.navItems");

    return (
        <>
            <ImageHero
                {...pageData.hero}
                breadcrumbs={[
                    {
                        text: t("home"),
                        href: "/",
                    },
                    {
                        text: t("aboutUs"),
                    },
                ]}
            />
            <AboutSection1 {...pageData.section_1} />
            <section className="max-w-7xl mx-auto py-10 space-y-6 px-3">
                {pageData.purpose?.map((data: Readonly<InfoBlockProps>) => (
                    <InfoBlock {...data} key={data.id} />
                ))}
            </section>
            <OurJourneySection {...pageData.our_journey_section} />
            <PartnerSection {...partners} />
            <GuidesSection {...pageData.guides_section} />
            <AwardsSection {...pageData.awards_section} />
            <ExperiencesSection {...pageData.experiences_section} />
            <FeaturedInSection {...pageData.featured_in_section} />
            <Testimonials {...testimonials} />
            <MapSection {...pageData.map_section} />
            <FooterCTA {...pageData.footer_cta_section} />
        </>
    );
}
