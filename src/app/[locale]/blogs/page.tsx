import BlogHero from "@/components/hero/blog-hero";
import FooterCTA from "@/components/layout/footer-cta";
import BlogListSection from "@/components/pages/blogs/blog-list-section";
import { getAllBlogs, getLatestBlogs } from "@/data/loaders";
import { routing } from "@/i18n/routing";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

let allBlogsPromise: ReturnType<typeof getAllBlogs> | null = null;
let localeCache: string | null = null;

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

function getAllBlogsOnce(locale: string) {
    if (!allBlogsPromise || localeCache !== locale) {
        allBlogsPromise = getAllBlogs(locale);
        localeCache = locale;
    }
    return allBlogsPromise;
}

async function loader(locale: string) {
    const [data, blogs] = await Promise.all([
        getAllBlogsOnce(locale),
        getLatestBlogs(),
    ]);
    if (!data || !data.data) notFound();

    return { pageData: data.data, blogData: blogs.data };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const locale = (await params).locale;
    const { data } = await getAllBlogsOnce(locale);

    return returnMetadata(data);
}

const BlogListingPage = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const locale = (await params).locale;
    const { pageData, blogData } = await loader(locale);

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations("homePage.header.navItems");

    return (
        <main>
            <BlogHero
                {...pageData.hero}
                breadcrumbs={[
                    {
                        text: t("home"),
                        href: "/",
                    },
                    {
                        text: t("insights"),
                    },
                ]}
            />
            <BlogListSection
                blog_list={pageData.blog_list_section}
                all_blogs={blogData}
                locale={locale}
            />
            <FooterCTA {...pageData.footer_cta_section} />
        </main>
    );
};

export default BlogListingPage;
