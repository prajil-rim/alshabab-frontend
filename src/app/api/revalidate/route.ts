import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const StaticModelMap = {
    "blog-page": "/blogs",
    "destination-listing-page": "/destinations",
    "package-listing-page": "/packages",
    "about-us-page": "/about-us",
    "home-page": "/",
    "contact-us-page": "/contact-us",
    "international-package-listing-page":
        "/packages/international-tour-packages",
    "visa-listing-page": "/visa-services",
    "term-of-service": "/terms-of-service",
    "privacy-policy": "/privacy-policy",
};

const DynamicModelMap = {
    blog: "/blogs/",
    destination: "/destinations/",
    package: "/packages/",
    "parent-package": "/packages/international-tour-packages",
    "visa-page": "/visa-services/",
};

export async function POST(request: NextRequest) {
    const secret = request.headers.get("Authorization")?.split(" ")[1];
    const body = await request.json();

    if (secret !== process.env.REVALIDATE_SECRET) {
        return new NextResponse("Invalid token", { status: 401 });
    }

    if (!body.model || !body.entry) {
        return new NextResponse("Invalid request", { status: 400 });
    }

    if (Object.keys(StaticModelMap).includes(body.model)) {
        // Revalidate the specific blog path
        const path = StaticModelMap[body.model as keyof typeof StaticModelMap];
        revalidatePath("/" + body.entry.locale + path);
        console.log("Revalidated " + path);
    } else if (Object.keys(DynamicModelMap).includes(body.model)) {
        // Revalidate the specific path
        const path =
            DynamicModelMap[body.model as keyof typeof DynamicModelMap];
        const actualPath = body.entry.parentPackage?.package_slug
            ? path +
              body.entry.parentPackage?.package_slug +
              "/" +
              (body.entry.slug ?? body.entry.package_slug)
            : path + "/" + (body.entry.slug ?? body.entry.package_slug);
        revalidatePath("/" + body.entry.locale + actualPath);

        // Revalidate tags
        if (path.includes("destinations")) {
            revalidateTag("destinationList");
        } else if (path.includes("packages")) {
            revalidateTag("packageList");
        } else if (path.includes("international-tour-packages")) {
            revalidateTag("parentPackageList");
        } else if (path.includes("blog")) {
            revalidateTag("blogList");
        }

        revalidateTag("sitemap"); // Revalidate sitemap after every blog, destination, or package update or creation
        console.log("Revalidated " + actualPath);
    } else if (
        body.model === "global" ||
        body.model === "testimonial" ||
        body.model === "partner-section" ||
        body.model === "package-category"
    ) {
        revalidateTag(body.model);
        console.log(`Revalidated pages using ${body.model} tag`);
    } else {
        console.log("Not Revalidated any path");
    }

    return new NextResponse("Revalidated successfully");
}
