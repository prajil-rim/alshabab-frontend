import BlogSection from "@/components/common/blog-section/blog-section";
import FAQSection from "@/components/common/faq/faq-section";
import FormSection from "@/components/common/form-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import ImageHero from "@/components/hero/image-hero";
import FooterCTA from "@/components/layout/footer-cta";
import PackageIncludesSection from "@/components/pages/packages/package-includes-section";
import TripDetailsSection from "@/components/pages/packages/trip-details-section";
import {
    getFaqs,
    getPackage,
    getPackagesList,
    getTestimonials,
} from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader(id: string) {
    const [pageData, faqs, testimonials, packages] = await Promise.all([
        getPackage(id),
        getFaqs(),
        getTestimonials(),
        getPackagesList(),
    ]);
    if (!pageData && pageData.data) notFound();
    return {
        pageData: pageData.data,
        faqs: faqs.data,
        testimonials: testimonials.data,
        packages: packages.data,
    };
}

const PackagePage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { id } = await searchParams;
    if (!id) return notFound();

    const { pageData, faqs, testimonials, packages } = await loader(
        id as string
    );

    return (
        <main>
            <ImageHero
                background={pageData.hero.background}
                description={pageData.hero.description}
                title={pageData.hero.title}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "Packages",
                        href: "/packages",
                    },
                    {
                        text: pageData.package,
                    },
                ]}
                cta={pageData.hero.cta}
            />
            <FormSection {...pageData.form_section} packages={packages} />
            <PackageIncludesSection {...pageData.package_includes_section} />
            <TripDetailsSection {...pageData.trip_details} />
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

export default PackagePage;
