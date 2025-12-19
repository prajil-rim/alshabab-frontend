import ImageHero from "@/components/hero/image-hero";
import { getPolicyPage } from "@/data/loaders";
import { routing } from "@/i18n/routing";
import { returnMetadata } from "@/lib/utils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

let policyPageDataPromise: ReturnType<typeof getPolicyPage> | null = null;
let localeCache: string | null = null;

function getPolicyPageOnce(locale: string) {
    if (!policyPageDataPromise || localeCache !== locale) {
        policyPageDataPromise = getPolicyPage(locale);
        localeCache = locale;
    }
    return policyPageDataPromise;
}

async function loader(locale: string) {
    const pageData = await getPolicyPageOnce(locale);

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
    const { data } = await getPolicyPageOnce(locale || "en");

    return returnMetadata(data);
}

const PolicyPage = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const locale = (await params).locale;
    const { pageData } = await loader(locale || "en");

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <>
            <ImageHero
                background={pageData.background}
                description={""}
                title={pageData.title || "--:--"}
                locale={locale}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "Privacy Policy",
                    },
                ]}
            />
            <main className="container-padding-x pb-10 md:pb-20 md:pt-10">
                <div className="max-w-3xl mx-auto">
                    <div className="max-w-3xl prose lg:prose-lg mx-auto real_table">
                        <BlocksRenderer content={pageData.policy || []} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default PolicyPage;
