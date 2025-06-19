import BlogSection from "@/components/common/blog-section/blog-section";
import FAQSection from "@/components/common/faq/faq-section";
import FormSection from "@/components/common/form-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import ImageHero from "@/components/hero/image-hero";
import FooterCTA from "@/components/layout/footer-cta";
import PackageIncludesSection from "@/components/pages/packages/package-includes-section";
import TripDetailsSection from "@/components/pages/packages/trip-details-section";
import { getPackage, getPackagesList } from "@/data/loaders";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return [];
}

let packageDataPromise: ReturnType<typeof getPackage> | null = null;

function getPackageDataOnce(slug: string) {
    if (!packageDataPromise) {
        packageDataPromise = getPackage(slug);
    }
    return packageDataPromise;
}

async function loader(slug: string) {
    const [pageData, packages] = await Promise.all([
        getPackageDataOnce(slug),
        getPackagesList(),
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
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { data } = await getPackageDataOnce(slug);

    return returnMetadata(data);
}

const PackagePage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    if (!slug) return notFound();

    const { pageData, packages } = await loader(slug as string);

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
