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
import { returnMetadata } from "@/lib/utils";
import { InfoBlockProps } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

let aboutUsPageDataPromise: ReturnType<typeof getAboutUsPage> | null = null;

function getAboutUsPageOnce() {
    if (!aboutUsPageDataPromise) {
        aboutUsPageDataPromise = getAboutUsPage();
    }
    return aboutUsPageDataPromise;
}

async function loader() {
    const [pageData, testimonials, partners] = await Promise.all([
        getAboutUsPageOnce(),
        getTestimonials(),
        getPartners(),
    ]);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
        testimonials: testimonials.data,
        partners: partners.data,
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await getAboutUsPageOnce();

    return returnMetadata(data);
}

export default async function AboutUsPage() {
    const { pageData, testimonials, partners } = await loader();

    return (
        <>
            <ImageHero
                {...pageData.hero}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "About Us",
                    },
                ]}
            />
            <AboutSection1 {...pageData.section_1} />
            <section className="max-w-6xl mx-auto py-10 space-y-6 px-3 lg:px-2">
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
