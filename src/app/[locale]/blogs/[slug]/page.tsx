import BlogHero from "@/components/hero/blog-hero";
import FooterCTA from "@/components/layout/footer-cta";
import InternalLinks from "@/components/layout/internal-links";
import Blog from "@/components/pages/blogs/blog";
import { getBlog } from "@/data/loaders";
import { routing } from "@/i18n/routing";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

let blogDataPromise: ReturnType<typeof getBlog> | null = null;
let localeCache: string | null = null;

function getBlogDataOnce(slug: string, locale: string) {
    if (!blogDataPromise || localeCache !== locale) {
        blogDataPromise = getBlog(slug, locale);
        localeCache = locale;
    }
    return blogDataPromise;
}

async function loader(slug: string, locale: string) {
    const [pageData] = await Promise.all([getBlogDataOnce(slug, locale)]);
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
    const { data } = await getBlogDataOnce(slug, locale);

    return returnMetadata(data);
}

const BlogPage = async ({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}) => {
    const { slug, locale } = await params;
    if (!slug) return notFound();

    const { pageData } = await loader(slug as string, locale);

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations("homePage.header.navItems");

    return (
        <main>
            <BlogHero
                {...pageData.hero}
                category={pageData.blog_category.category}
                breadcrumbs={[
                    {
                        text: t("home"),
                        href: "/",
                    },
                    {
                        text: t("insights"),
                        href: "/blogs",
                    },
                    {
                        text: pageData.blog_title,
                    },
                ]}
            />
            <Blog
                author={pageData.author}
                description={pageData.description}
                image={pageData.image}
                quote={pageData.quote}
                profession={pageData.profession}
                socials={pageData.socials}
                share_socials={pageData.share_socials}
                blog={pageData.blog}
                recommendedBlogs={pageData.recommended_blogs}
            />
            <FooterCTA {...pageData.footer_cta_section} />
            <InternalLinks internal_links={pageData.internal_links || []} />
        </main>
    );
};

export default BlogPage;
