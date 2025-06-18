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
    getFaqs,
    getPackagesList,
    getTestimonials,
} from "@/data/loaders";
import { notFound } from "next/navigation";
import { ReelsSection } from "@/components/common/reels-section/reels-section";
import VideoHero from "@/components/hero/video-hero";
import StaysSection from "@/components/pages/destinations/stays-section";
import AttractionsSection from "@/components/pages/destinations/attractions-section";
import DealsSection from "@/components/pages/destinations/deals-section";
import { Metadata } from "next";
import { returnMetadata } from "@/lib/utils";

export async function generateStaticParams() {
    return [];
}

let destinationDataPromise: ReturnType<typeof getDestination> | null = null;

function getDestinationDataOnce(slug: string) {
    if (!destinationDataPromise) {
        destinationDataPromise = getDestination(slug);
    }
    return destinationDataPromise;
}

async function loader(slug: string) {
    const [pageData, faqs, testimonials, destinations, packages] =
        await Promise.all([
            getDestinationDataOnce(slug),
            getFaqs(),
            getTestimonials(),
            getDestinationsList(),
            getPackagesList(),
        ]);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
        faqs: faqs.data,
        testimonials: testimonials.data,
        packages: packages.data,
        destinations: destinations.data,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { data } = await getDestinationDataOnce(slug);

    return returnMetadata(data);
}

const DestinationPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    if (!slug) return notFound();

    const { pageData, faqs, testimonials, destinations, packages } =
        await loader(slug as string);

    return (
        <main>
            <VideoHero
                {...pageData.hero}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "Destination",
                        href: "/destinations",
                    },
                    {
                        text: pageData.destination,
                    },
                ]}
            />
            <section className="bg-gradient-to-t from-transparent via-[#F5F1E3] to-[#448CD9]/80">
                <div className="max-w-6xl mx-auto py-5 lg:py-10 px-3 lg:px-2">
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
            <ReelsSection {...pageData.reels_section} />
            <AttractionsSection {...pageData.attractions_section} />
            <StaysSection {...pageData.stays_section} />
            <TripDetailsSection {...pageData.experience_section} />
            <GallerySection {...pageData.gallery_section} />
            <DealsSection {...pageData.deals_section} />
            <RouteSection {...pageData.route_section} />
            <Testimonials {...testimonials} />
            <FAQSection
                title={faqs?.title}
                description={faqs?.description}
                faqs={faqs?.faqs}
            />
            <FooterCTA {...pageData.footer_cta_section} />
        </main>
    );
};

export default DestinationPage;
