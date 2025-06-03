import BlogSection from "@/components/common/blog-section/blog-section";
import FAQSection from "@/components/common/faq/faq-section";
import FormSectionWithPoints from "@/components/common/form-section-with-points";
import PDListSection from "@/components/common/pd-list-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import PDListingHero from "@/components/hero/pd-listing-hero";
import FooterCTA from "@/components/layout/footer-cta";
import PopularPD from "@/components/common/pd-packages";
import {
    getDestinationsList,
    getFaqs,
    getPackagesList,
    getPackagesPage,
    getTestimonials,
} from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader() {
    const [pageData, faqs, testimonials, destinations, packages] =
        await Promise.all([
            getPackagesPage(),
            getFaqs(),
            getTestimonials(),
            getDestinationsList(),
            getPackagesList(),
        ]);
    if (!pageData && pageData.data) notFound();
    return {
        pageData: pageData.data,
        faqs: faqs.data,
        testimonials: testimonials.data,
        destinations: destinations.data,
        packages: packages.data,
    };
}

const PackageListingPage = async () => {
    const { pageData, faqs, testimonials, destinations, packages } =
        await loader();

    return (
        <main>
            <PDListingHero
                cta={{
                    text: "Get Free Consultation",
                    href: "/contact-us",
                    isExternal: false,
                }}
                hero={pageData.hero}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "Packages",
                    },
                ]}
            />
            <PDListSection {...pageData.packages} />
            <FormSectionWithPoints
                {...pageData.form_section}
                packages={packages}
                destinations={destinations}
            />
            <PopularPD {...pageData.popular_packages} />
            <Testimonials {...testimonials} />
            <BlogSection {...pageData.blog_section} />
            <FAQSection
                title={faqs?.title}
                description={faqs?.description}
                faqs={faqs?.faqs}
            />
            <FooterCTA {...pageData.footer_cta_section} />
        </main>
    );
};

export default PackageListingPage;
