import BlogHero from "@/components/hero/blog-hero";
import FooterCTA from "@/components/layout/footer-cta";
import Blog from "@/components/pages/blogs/blog";
import { getBlog } from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader(id: string) {
    const [pageData] = await Promise.all([getBlog(id)]);
    if (!pageData && pageData.data) notFound();
    return {
        pageData: pageData.data,
    };
}

const BlogPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { id } = await searchParams;
    if (!id) return notFound();

    const { pageData } = await loader(id as string);

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
