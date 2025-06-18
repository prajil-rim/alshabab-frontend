import BlogHero from "@/components/hero/blog-hero";
import FooterCTA from "@/components/layout/footer-cta";
import Blog from "@/components/pages/blogs/blog";
import { getBlog } from "@/data/loaders";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return [];
}

let blogDataPromise: ReturnType<typeof getBlog> | null = null;

function getBlogDataOnce(slug: string) {
    if (!blogDataPromise) {
        blogDataPromise = getBlog(slug);
    }
    return blogDataPromise;
}

async function loader(slug: string) {
    const [pageData] = await Promise.all([getBlogDataOnce(slug)]);
    if (!pageData || !pageData.data) notFound();
    return {
        pageData: pageData.data,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { data } = await getBlogDataOnce(slug);

    return returnMetadata(data);
}

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    if (!slug) return notFound();

    const { pageData } = await loader(slug as string);

    return (
        <main>
            <BlogHero
                {...pageData.hero}
                category={pageData.blog_category.category}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "Insights",
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
        </main>
    );
};

export default BlogPage;
