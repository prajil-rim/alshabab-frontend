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
    filterPackageResultsQuery,
    globalSettingQuery,
    homePageQuery,
    maxPaginationQuery,
    packageListingPageQuery,
    packageListQuery,
    packageQuery,
    parentPackageListQuery,
    parentPackageQuery,
    partnerSectionQuery,
    termsPolicyPageQuery,
    testimonialQuery,
    visaListingQuery,
    visaQuery,
} from "./queries";
import { z } from "zod";
import {
    consultationSchema,
    contactUsSchema,
    packageConsultationSchema,
    packageFormSchema,
} from "@/lib/zod";

const BASE_URL = getStrapiURL();

export async function getHomePage(locale: string) {
    const path = "/api/home-page";
    const url = new URL(path, BASE_URL);
    url.search = homePageQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getAboutUsPage(locale: string) {
    const path = "/api/about-us-page";
    const url = new URL(path, BASE_URL);
    url.search = aboutUsPageQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getGlobalSettings(locale: string) {
    const path = "/api/global";
    const url = new URL(path, BASE_URL);
    url.search = globalSettingQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, {
        method: "GET",
        next: { tags: ["global"] },
    });
}

export async function getContactUsPage(locale: string) {
    const path = "/api/contact-us-page";
    const url = new URL(path, BASE_URL);
    url.search = contactUsPageQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getDestinationsList() {
    const path = "/api/destinations";
    const url = new URL(path, BASE_URL);
    url.search = maxPaginationQuery;
    return fetchAPI(url.href, {
        method: "GET",
        next: { tags: ["destinationList"] },
    });
}

export async function getDestination(slug: string, locale: string) {
    const path = `/api/destinations/${slug}`;
    const url = new URL(path, BASE_URL);
    url.search = destinationQuery;
    url.searchParams.set("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getDestinationsPage(locale: string) {
    const path = `/api/destination-listing-page`;
    const url = new URL(path, BASE_URL);
    url.search = destinationListingPageQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getPackagesList() {
    const path = "/api/packages";
    const url = new URL(path, BASE_URL);
    url.search = packageListQuery;
    return fetchAPI(url.href, {
        method: "GET",
        next: { tags: ["packageList"] },
    });
}

export async function getParentPackagesList() {
    const path = "/api/parent-packages";
    const url = new URL(path, BASE_URL);
    url.search = parentPackageListQuery;
    return fetchAPI(url.href, {
        method: "GET",
        next: { tags: ["parentPackageList"] },
    });
}

export async function getPackage(slug: string, locale: string) {
    const path = `/api/packages/${slug}`;
    const url = new URL(path, BASE_URL);
    url.search = packageQuery;
    url.searchParams.set("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getParentPackage(
    parentPackage: string,
    locale: string,
    query = parentPackageQuery
) {
    const path = `/api/parent-packages/${parentPackage}`;
    const url = new URL(path, BASE_URL);
    url.search = query;
    url.searchParams.set("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getAllPackageCategories() {
    const path = "/api/package-categories";
    const url = new URL(path, BASE_URL);
    return fetchAPI(url.href, {
        method: "GET",
        next: { tags: ["package-category"] },
    });
}

export async function getPackagesPage(locale: string) {
    const path = `/api/package-listing-page`;
    const url = new URL(path, BASE_URL);
    url.search = packageListingPageQuery;
    url.searchParams.set("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getPackageResults(
    package_: string,
    category: string,
    locale: string
) {
    const path = `/api/packages/filter`;
    const url = new URL(path, BASE_URL);
    url.search = filterPackageResultsQuery;
    url.searchParams.set("parentPackage", package_);
    url.searchParams.set("packageCategories", category);
    url.searchParams.set("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getIntlPackagesPage(locale: string) {
    const path = `/api/international-package-listing-page`;
    const url = new URL(path, BASE_URL);
    url.search = packageListingPageQuery;
    url.searchParams.set("locale", locale);
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

export async function packageForm(data: z.infer<typeof packageFormSchema>) {
    const path = "/api/package-forms";
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

export async function getAllBlogs(locale: string) {
    const path = "/api/blog-page";
    const url = new URL(path, BASE_URL);
    url.search = blogListPageQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getLatestBlogs() {
    const path = "/api/blogs";
    const url = new URL(path, BASE_URL);
    url.search = blogListQuery;
    return fetchAPI(url.href, { method: "GET", next: { tags: ["blogList"] } });
}

export async function getTestimonials(locale: string) {
    const path = "/api/testimonial";
    const url = new URL(path, BASE_URL);
    url.search = testimonialQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, {
        method: "GET",
        next: { tags: ["testimonial"] },
    });
}

export async function getBlog(slug: string, locale: string) {
    const path = `/api/blogs/${slug}`;
    const url = new URL(path, BASE_URL);
    url.search = blogQuery;
    url.searchParams.set("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getPartners(locale: string) {
    const path = `/api/partner-section`;
    const url = new URL(path, BASE_URL);
    url.search = partnerSectionQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, {
        method: "GET",
        next: { tags: ["partner-section"] },
    });
}

export async function getVisa(slug: string, locale: string) {
    const path = `/api/visa-pages/${slug}`;
    const url = new URL(path, BASE_URL);
    url.search = visaQuery;
    url.searchParams.set("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getVisaListing(locale: string) {
    const path = "/api/visa-listing-page";
    const url = new URL(path, BASE_URL);
    url.search = visaListingQuery;
    url.searchParams.set("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getPolicyPage(locale: string) {
    const path = "/api/privacy-policy";
    const url = new URL(path, BASE_URL);
    url.search = termsPolicyPageQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}

export async function getTermsPage(locale: string) {
    const path = "/api/term-of-service";
    const url = new URL(path, BASE_URL);
    url.search = termsPolicyPageQuery;
    url.searchParams.append("locale", locale);
    return fetchAPI(url.href, { method: "GET" });
}
