import BlogHero from "@/components/hero/blog-hero";
import FooterCTA from "@/components/layout/footer-cta";
import BlogListSection from "@/components/pages/blogs/blog-list-section";
import { getAllBlogs, getLatestBlogs } from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader() {
    const [data, blogs] = await Promise.all([getAllBlogs(), getLatestBlogs()]);
    if (!data && data.data) notFound();

    return { pageData: data.data, blogData: blogs.data };
}

const BlogListingPage = async () => {
    const { pageData, blogData } = await loader();

    return (
        <main>
            <BlogHero
                {...pageData.hero}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "Insights",
                    },
                ]}
            />
            <BlogListSection
                blog_list={pageData.blog_list_section}
                all_blogs={blogData}
            />
            <FooterCTA {...pageData.footer_cta_section} />
        </main>
    );
};

export default BlogListingPage;
