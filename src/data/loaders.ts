import { getStrapiURL } from "@/lib/get-strapi-url";
import { fetchAPI } from "@/lib/fetch-api";
import {
    aboutUsPageQuery,
    blogListPageQuery,
    blogListQuery,
    blogQuery,
    contactUsPageQuery,
    destinationListingPageQuery,
    destinationQuery,
    globalSettingQuery,
    homePageQuery,
    maxPaginationQuery,
    packageListingPageQuery,
    packageListQuery,
    packageQuery,
    partnerSectionQuery,
    testimonialQuery,
} from "./queries";
import { z } from "zod";
import {
    consultationSchema,
    contactUsSchema,
    packageConsultationSchema,
} from "@/lib/zod";

const BASE_URL = getStrapiURL();

export async function getHomePage() {
    const path = "/api/home-page";
    const url = new URL(path, BASE_URL);
    url.search = homePageQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getAboutUsPage() {
    const path = "/api/about-us-page";
    const url = new URL(path, BASE_URL);
    url.search = aboutUsPageQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getGlobalSettings() {
    const path = "/api/global";
    const url = new URL(path, BASE_URL);
    url.search = globalSettingQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getContactUsPage() {
    const path = "/api/contact-us-page";
    const url = new URL(path, BASE_URL);
    url.search = contactUsPageQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getDestinationsList() {
    const path = "/api/destinations";
    const url = new URL(path, BASE_URL);
    url.search = maxPaginationQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getDestination(slug: string) {
    const path = `/api/destinations/${slug}`;
    const url = new URL(path, BASE_URL);
    url.search = destinationQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getDestinationsPage() {
    const path = `/api/destination-listing-page`;
    const url = new URL(path, BASE_URL);
    url.search = destinationListingPageQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getPackagesList() {
    const path = "/api/packages";
    const url = new URL(path, BASE_URL);
    url.search = packageListQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getPackage(slug: string) {
    const path = `/api/packages/${slug}`;
    const url = new URL(path, BASE_URL);
    url.search = packageQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getPackagesPage() {
    const path = `/api/package-listing-page`;
    const url = new URL(path, BASE_URL);
    url.search = packageListingPageQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function submitContactUsForm(
    data: z.infer<typeof contactUsSchema>
) {
    const path = "/api/contact-forms";
    const url = new URL(path, BASE_URL);
    return fetchAPI(url.href, {
        method: "POST",
        body: { data },
    });
}

export async function submitPackageConsultationForm(
    data: z.infer<typeof packageConsultationSchema>
) {
    const path = "/api/package-consultation-forms";
    const url = new URL(path, BASE_URL);
    return fetchAPI(url.href, {
        method: "POST",
        body: { data },
    });
}

export async function submitConsultationForm(
    data: z.infer<typeof consultationSchema>
) {
    const path = "/api/consultation-forms";
    const url = new URL(path, BASE_URL);
    return fetchAPI(url.href, {
        method: "POST",
        body: { data },
    });
}

export async function getAllBlogs() {
    const path = "/api/blog-page";
    const url = new URL(path, BASE_URL);
    url.search = blogListPageQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getLatestBlogs() {
    const path = "/api/blogs";
    const url = new URL(path, BASE_URL);
    url.search = blogListQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getTestimonials() {
    const path = "/api/testimonial";
    const url = new URL(path, BASE_URL);
    url.search = testimonialQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getBlog(slug: string) {
    const path = `/api/blogs/${slug}`;
    const url = new URL(path, BASE_URL);
    url.search = blogQuery;
    return fetchAPI(url.href, { method: "GET" });
}

export async function getPartners() {
    const path = `/api/partner-section`;
    const url = new URL(path, BASE_URL);
    url.search = partnerSectionQuery;
    return fetchAPI(url.href, { method: "GET" });
}
