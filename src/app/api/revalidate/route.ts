import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const StaticModelMap = {
    "blog-page": "/blogs",
    "destination-listing-page": "/destinations",
    "package-listing-page": "/packages",
    "about-us-page": "/about-us",
    "home-page": "/",
    "contact-us-page": "/contact-us",
};

const DynamicModelMap = {
    blog: "/blogs/",
    destination: "/destinations/",
    package: "/packages/",
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
        revalidatePath("/en" + path);
        revalidatePath("/ar" + path);
        console.log("Revalidated " + path);
    } else if (Object.keys(DynamicModelMap).includes(body.model)) {
        // Revalidate the specific blog path
        const path =
            DynamicModelMap[body.model as keyof typeof DynamicModelMap] +
            body.entry.slug;
        revalidatePath("/en" + path);
        revalidatePath("/ar" + path);
        revalidateTag("sitemap"); // Revalidate sitemap after every blog, destination, or package update or creation
        console.log("Revalidated " + path);
    } else {
        console.log("Not Revalidated any path");
    }

    return new NextResponse("Revalidated successfully");
}
