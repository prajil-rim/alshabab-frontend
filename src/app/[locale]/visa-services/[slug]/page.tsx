import FAQSection from "@/components/common/faq/faq-section";
import ImageHero from "@/components/hero/image-hero";
import FooterCTA from "@/components/layout/footer-cta";
import InternalLinks from "@/components/layout/internal-links";
import TeamProfile from "@/components/pages/visa/team-profile";
import { getVisa } from "@/data/loaders";
import { routing } from "@/i18n/routing";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

let visaDataPromise: ReturnType<typeof getVisa> | null = null;
let localeCache: string | null = null;

function getVisaDataOnce(slug: string, locale: string) {
    if (!visaDataPromise || localeCache !== locale) {
        visaDataPromise = getVisa(slug, locale);
        localeCache = locale;
    }
    return visaDataPromise;
}

async function loader(slug: string, locale: string) {
    const pageData = await getVisaDataOnce(slug, locale);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
    const { slug, locale } = await params;
    const { data } = await getVisaDataOnce(slug, locale);

    return returnMetadata(data);
}

const VisaPage = async ({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}) => {
    const { slug, locale } = await params;
    if (!slug) return notFound();

    const { pageData } = await loader(slug as string, locale);

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <main>
            <ImageHero
                background={pageData.hero.background}
                description={pageData.hero.description}
                title={pageData.hero.title}
                locale={locale}
                cta_whatsapp={pageData.hero.button}
            />
            <div className="py-10">
                <div
                    className="prose max-w-[90%] md:max-w-[80%] mx-auto font-manrope mb-10"
                    dangerouslySetInnerHTML={{ __html: pageData.contents }}
                ></div>
            </div>
            <TeamProfile {...pageData.team_profile_section} />
            <FAQSection {...pageData.faq_section} />
            <FooterCTA {...pageData.footer_cta_section} />
            <div className="py-10 max-w-7xl mx-auto px-3 lg:px-6 2xl:px-0 space-y-2">
                <h3 className="text-2xl font-semibold">Disclaimer</h3>
                <p className="font-manrope">{pageData.disclaimer}</p>
            </div>
            <InternalLinks internal_links={pageData.internal_links || []} />
        </main>
    );
};

export default VisaPage;
