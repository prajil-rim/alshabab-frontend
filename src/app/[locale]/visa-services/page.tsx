import FAQSection from "@/components/common/faq/faq-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import ImageHero from "@/components/hero/image-hero";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import InternalLinks from "@/components/layout/internal-links";
import TeamProfile from "@/components/pages/visa/team-profile";
import { Button } from "@/components/ui/button";
import { getVisaListing } from "@/data/loaders";
import { routing } from "@/i18n/routing";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

let visaListingPagePromise: ReturnType<typeof getVisaListing> | null = null;
let localeCache: string | null = null;

function getVisaListingDataOnce(locale: string) {
    if (!visaListingPagePromise || localeCache !== locale) {
        visaListingPagePromise = getVisaListing(locale);
        localeCache = locale;
    }
    return visaListingPagePromise;
}

async function loader(locale: string) {
    const pageData = await getVisaListingDataOnce(locale);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const locale = (await params).locale;
    const { data } = await getVisaListingDataOnce(locale);

    return returnMetadata(data);
}

const VisaServicesPage = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const locale = (await params).locale;
    const { pageData } = await loader(locale);

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <main>
            <ImageHero
                background={pageData.hero.background}
                description={pageData.hero.description}
                title={pageData.hero.title}
                locale={locale}
                cta_whatsapp={pageData.hero.cta_whatsapp}
                cta_button={pageData.hero.cta_button}
            />
            <div className="py-10 max-w-7xl mx-auto px-3 lg:px-6 2xl:px-0 space-y-2 font-manrope text-center">
                <h2 className="text-2xl md:text-4xl font-playfair-display font-bold">
                    {pageData.core_services_section.heading}
                </h2>
                <p className="mb-8">
                    {pageData.core_services_section.description}
                </p>
                <div
                    className="mx-auto w-fit"
                    dangerouslySetInnerHTML={{
                        __html: pageData.core_services_section
                            .core_services_table,
                    }}
                ></div>
                {pageData.core_services_section.cta_button && (
                    <Link
                        href={pageData.core_services_section.cta_button.href}
                        target={
                            pageData.core_services_section.cta_button.isExternal
                                ? "_blank"
                                : "_self"
                        }
                    >
                        <Button className="mt-5 bg-transparent rounded-full cursor-pointer border border-primary text-primary hover:bg-primary hover:text-white">
                            {pageData.core_services_section.cta_button.text}
                            <ArrowRightUp color="white" />
                        </Button>
                    </Link>
                )}
            </div>

            <div className="pb-10 max-w-7xl mx-auto px-3 lg:px-6 2xl:px-0 space-y-2 font-manrope">
                <div
                    dangerouslySetInnerHTML={{
                        __html: pageData.contents,
                    }}
                ></div>
            </div>
            <Testimonials {...pageData.testimonials} />
            <TeamProfile {...pageData.team_section} />
            <FAQSection {...pageData.faq_section} />
            <InternalLinks internal_links={pageData.internal_links || []} />
        </main>
    );
};

export default VisaServicesPage;
