import BlogSection from "@/components/common/blog-section/blog-section";
import FAQSection from "@/components/common/faq/faq-section";
import GlobalToursSection from "@/components/common/global-tours-section";
import PartnerSection from "@/components/common/partner-section";
import PopularPD from "@/components/common/pd-packages";
import { ReelsSection } from "@/components/common/reels-section/reels-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import HomeHero from "@/components/hero/home-hero";
import FooterCTA from "@/components/layout/footer-cta";
import ExperiencesSection from "@/components/pages/about-us/experiences-section";
import FormSection from "@/components/pages/home/form-section";
import InfoSection from "@/components/pages/home/info-section";
import SearchSection from "@/components/pages/home/search-section";
import WhyUsSection from "@/components/pages/home/why-us-section";
import {
    getDestinationsList,
    getFaqs,
    getHomePage,
    getPackagesList,
    getPartners,
    getTestimonials,
} from "@/data/loaders";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const runtime = "edge";

let homePageDataPromise: ReturnType<typeof getHomePage> | null = null;

function getHomePageOnce() {
    if (!homePageDataPromise) {
        homePageDataPromise = getHomePage();
    }
    return homePageDataPromise;
}

async function loader() {
    const [pageData, faqs, testimonials, partners, destinations, packages] =
        await Promise.all([
            getHomePageOnce(),
            getFaqs(),
            getTestimonials(),
            getPartners(),
            getDestinationsList(),
            getPackagesList(),
        ]);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
        faqs: faqs.data,
        testimonials: testimonials.data,
        partners: partners.data,
        destinations: destinations.data,
        packages: packages.data,
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await getHomePageOnce();

    return returnMetadata(data);
}

export default async function HomeRoute() {
    const { pageData, faqs, testimonials, partners, destinations, packages } =
        await loader();

    return (
        <>
            <HomeHero hero={pageData.slides} />
            <section className="bg-gradient-to-t from-transparent via-[#F5F1E3] to-[#448CD9]/80">
                <div className="max-w-6xl mx-auto py-10 px-3 lg:px-2">
                    <SearchSection
                        destinations={destinations}
                        packages={packages}
                        trending_searches={pageData.trending_search}
                        price_range={pageData.price_range}
                    />
                    <InfoSection {...pageData.info_section} />
                </div>
            </section>
            <ReelsSection {...pageData.reels_section} />
            <PopularPD {...pageData.popular_destinations} showLeaf />
            <WhyUsSection {...pageData.why_us_section} />
            <FormSection destinations={destinations} packages={packages} />
            <ExperiencesSection {...pageData.package_section} showLeaf />
            <PartnerSection {...partners} showLeaf />
            <GlobalToursSection {...pageData.global_tour_section} showLeaf />
            <Testimonials {...testimonials} showLeaf />
            <div className="py-5"></div>
            <BlogSection {...pageData.blog_section} showLeaf />
            <FAQSection {...faqs} showLeaf />
            <FooterCTA {...pageData.footer_cta_section} />
        </>
    );
}
