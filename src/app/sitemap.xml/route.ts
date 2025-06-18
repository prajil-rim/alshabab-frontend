import {
    getDestinationsList,
    getLatestBlogs,
    getPackagesList,
} from "@/data/loaders";
import { BlogCardProps, DestinationListProps, PackageListProps } from "@/types";

export const dynamic = "force-dynamic"; // Required for ISR with tags

export const fetchCache = "force-cache"; // Enables caching with tags

export async function GET() {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

    const { destinations, packages, blogs } = await loader();

    const destinationUrls = destinations
        .map(
            (destination: DestinationListProps) => `
    <url>
      <loc>${baseUrl}/destinations/${destination.slug}</loc>
      <lastmod>${destination.updatedAt || new Date()}</lastmod>
    </url>
  `
        )
        .join("");

    const packageUrls = packages
        .map(
            (package_: PackageListProps) => `
    <url>
      <loc>${baseUrl}/packages/${package_.slug}</loc>
      <lastmod>${package_.updatedAt || new Date()}</lastmod>
    </url>
  `
        )
        .join("");

    const blogUrls = blogs
        .map(
            (blog: BlogCardProps) => `
    <url>
      <loc>${baseUrl}/blogs/${blog.slug}</loc>
      <lastmod>${new Date()}</lastmod>
    </url>
  `
        )
        .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <priority>1</priority>
    </url>
    <url>
      <loc>${baseUrl}/about-us</loc>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${baseUrl}/contact-us</loc>
      <priority>1</priority>
    </url>
    <url>
      <loc>${baseUrl}/destinations</loc>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${baseUrl}/packages</loc>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${baseUrl}/blogs</loc>
      <priority>0.7</priority>
    </url>
    ${destinationUrls + packageUrls + blogUrls}
  </urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=31536000, stale-while-revalidate", // Long cache
            "x-next-cache-tags": "sitemap", // Tag for on-demand revalidation
        },
    });
}

async function loader() {
    const [destinations, packages, blogs] = await Promise.all([
        getDestinationsList(),
        getPackagesList(),
        getLatestBlogs(),
    ]);

    return {
        destinations: destinations.data,
        packages: packages.data,
        blogs: blogs.data,
    };
}
