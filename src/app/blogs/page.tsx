import BlogHero from "@/components/hero/blog-hero";
import FooterCTA from "@/components/layout/footer-cta";
import BlogListSection from "@/components/pages/blogs/blog-list-section";
import { getAllBlogs, getLatestBlogs } from "@/data/loaders";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const runtime = "edge";

let allBlogsPromise: ReturnType<typeof getAllBlogs> | null = null;

function getAllBlogsOnce() {
    if (!allBlogsPromise) {
        allBlogsPromise = getAllBlogs();
    }
    return allBlogsPromise;
}

async function loader() {
    const [data, blogs] = await Promise.all([
        getAllBlogsOnce(),
        getLatestBlogs(),
    ]);
    if (!data || !data.data) notFound();

    return { pageData: data.data, blogData: blogs.data };
}

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await getAllBlogsOnce();

    return returnMetadata(data);
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
