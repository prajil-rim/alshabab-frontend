import qs from "qs";

export const homePageQuery = qs.stringify({
    populate: {
        slides: {
            on: {
                "blocks.hero-slide": {
                    populate: {
                        cta: true,
                        background: {
                            populate: {
                                background: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                    },
                },
            },
        },
        info_section: {
            populate: {
                cta: true,
                smallImage: {
                    fields: ["url", "alternativeText"],
                },
                largeImage: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        reels_section: {
            populate: {
                button: true,
                background: {
                    fields: ["url", "alternativeText"],
                },
                reels: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        why_us_section: {
            populate: {
                cards: {
                    populate: {
                        icon: {
                            fields: ["url", "alternativeText"],
                        },
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
                video: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        popular_destinations: {
            populate: {
                tabs: {
                    populate: {
                        slides: {
                            populate: {
                                image: {
                                    fields: ["url", "alternativeText"],
                                },
                                cta: true,
                            },
                        },
                    },
                },
                button: true,
            },
        },
        package_section: {
            populate: {
                hover_card: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        cta: true,
                    },
                },
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        blog_section: {
            populate: {
                blogs: {
                    fields: ["blog_title", "slug", "blog_summary"],
                    populate: {
                        hero: {
                            populate: {
                                cover: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                            fields: ["date", "read_time"],
                        },
                    },
                },
            },
        },
        global_tour_section: {
            populate: {
                tours: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        trending_search: true,
        price_range: true,
        faq_section: {
            populate: {
                faqs: true,
            },
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const aboutUsPageQuery = qs.stringify({
    populate: {
        hero: {
            populate: {
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_whatsapp: true,
            },
        },
        section_1: {
            populate: {
                image_1: {
                    fields: ["url", "alternativeText"],
                },
                image_2: {
                    fields: ["url", "alternativeText"],
                },
                cta: true,
                info_card: true,
            },
        },
        our_journey_section: {
            populate: {
                journey_details: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        guides_section: {
            populate: {
                guides_list: {
                    populate: {
                        languages: true,
                        expertise: true,
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        socials: {
                            populate: {
                                icon: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                    },
                },
            },
        },
        awards_section: {
            populate: {
                awards: {
                    populate: {
                        logo: {
                            populate: {
                                image: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                    },
                },
            },
        },
        experiences_section: {
            populate: {
                hover_card: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        cta: true,
                    },
                },
            },
        },
        featured_in_section: {
            populate: {
                featured: {
                    populate: {
                        logo: {
                            populate: {
                                image: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                        url: true,
                    },
                },
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        purpose: {
            populate: {
                smallImage: {
                    fields: ["url", "alternativeText"],
                },
                largeImage: {
                    fields: ["url", "alternativeText"],
                },
                button: true,
            },
        },
        map_section: true,
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const globalSettingQuery = qs.stringify({
    populate: {
        header: {
            populate: {
                logo: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        footer: {
            populate: {
                logo: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
                socials: {
                    populate: {
                        icon: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
                quick_links: true,
                support: true,
                privacy_policy: true,
                contact_info: true,
                terms: true,
                cookies: true,
                sitemap: true,
            },
        },
    },
});

export const partnerSectionQuery = qs.stringify({
    populate: {
        partner_logo: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
    },
});

export const testimonialQuery = qs.stringify({
    populate: {
        testimonials: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
    },
});

export const blogQuery = qs.stringify({
    populate: {
        image: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        socials: {
            populate: {
                icon: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        share_socials: {
            populate: {
                icon: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        hero: {
            populate: {
                cover: {
                    fields: ["url", "alternativeText"],
                },
                cta: true,
            },
        },
        blog_category: true,
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        recommended_blogs: {
            populate: {
                hero: {
                    populate: {
                        cover: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                    fields: ["date", "read_time"],
                },
                blog_category: true,
            },
            fields: ["documentId", "blog_summary", "blog_title", "slug"],
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const trendingSearchQuery = qs.stringify({
    populate: {
        link: true,
    },
});

export const destinationQuery = qs.stringify({
    populate: {
        hero: {
            populate: {
                cta_whatsapp: true,
                background: {
                    populate: {
                        background: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        info_section: {
            populate: {
                smallImage: {
                    fields: ["url", "alternativeText"],
                },
                largeImage: {
                    fields: ["url", "alternativeText"],
                },
                button: true,
            },
        },
        reels_section: {
            populate: {
                button: true,
                background: {
                    fields: ["url", "alternativeText"],
                },
                reels: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        attractions_section: {
            populate: {
                cards: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        cta: true,
                    },
                },
            },
        },
        stays_section: {
            populate: {
                stays: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        cta: true,
                    },
                },
            },
        },
        experience_section: {
            populate: {
                details: {
                    populate: {
                        smallImage: {
                            fields: ["url", "alternativeText"],
                        },
                        largeImage: {
                            fields: ["url", "alternativeText"],
                        },
                        button: true,
                    },
                },
            },
        },
        gallery_section: {
            populate: {
                gallery: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        route_section: {
            populate: {
                routes: {
                    populate: {
                        icon: {
                            populate: {
                                image: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                        google_map_link: true,
                    },
                },
            },
        },
        form_section: {
            populate: {
                cta: true,
            },
        },
        deals_section: {
            populate: {
                packages: {
                    populate: {
                        hero: {
                            populate: {
                                background: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                        packages_for: true,
                    },
                    fields: [
                        "package",
                        "slug",
                        "summary",
                        "price",
                        "price_per",
                    ],
                },
            },
        },
        testimonials: {
            populate: {
                testimonials: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        faq_section: {
            populate: {
                faqs: true,
            },
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const destinationListingPageQuery = qs.stringify({
    populate: {
        hero: {
            populate: {
                cta_whatsapp: true,
                background: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        destinations: {
            populate: {
                hover_card: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        cta: true,
                    },
                },
            },
        },
        form_section: true,
        popular_destinations: {
            populate: {
                tabs: {
                    populate: {
                        slides: {
                            populate: {
                                image: {
                                    fields: ["url", "alternativeText"],
                                },
                                cta: true,
                            },
                        },
                    },
                },
                button: true,
            },
        },
        global_tour_section: {
            populate: {
                tours: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        blog_section: {
            populate: {
                blogs: {
                    populate: {
                        hero: {
                            populate: {
                                cover: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                            fields: ["date", "read_time"],
                        },
                    },
                    fields: [
                        "documentId",
                        "blog_summary",
                        "blog_title",
                        "slug",
                    ],
                },
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        faq_section: {
            populate: {
                faqs: true,
            },
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const maxPaginationQuery = qs.stringify({
    pagination: {
        pageSize: 100,
    },
});

export const packageQuery = qs.stringify({
    populate: {
        hero: {
            populate: {
                background: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        package_includes_section: {
            populate: {
                package_includes: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        cta: true,
                    },
                },
            },
        },
        trip_details: {
            populate: {
                details: {
                    populate: {
                        smallImage: {
                            fields: ["url", "alternativeText"],
                        },
                        largeImage: {
                            fields: ["url", "alternativeText"],
                        },
                        button: true,
                    },
                },
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        packages_for: true,
        form_section: {
            populate: {
                cta: true,
            },
        },
        blog_section: {
            populate: {
                blogs: {
                    populate: {
                        hero: {
                            populate: {
                                cover: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                            fields: ["date", "read_time"],
                        },
                    },
                    fields: [
                        "documentId",
                        "blog_summary",
                        "blog_title",
                        "slug",
                    ],
                },
            },
        },
        testimonials: {
            populate: {
                testimonials: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        faq_section: {
            populate: {
                faqs: true,
            },
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        package_general_info: {
            populate: {
                duration: true,
                location_details: true,
                pay_with: true,
                price_details: true,
                more_about_trip: true,
                package_includes: {
                    populate: {
                        icon: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
                package_categories: {
                    fields: ["slug", "category", "documentId"],
                },
            },
        },
        package_itinerary: {
            populate: {
                images: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        package_day_chart: {
            populate: {
                day_chart_card: true,
            },
        },
        package_inc_and_exc: {
            populate: {
                inclusion: {
                    populate: {
                        points: true,
                    },
                },
                exclusion: {
                    populate: {
                        points: true,
                    },
                },
            },
        },
        package_policies: {
            populate: {
                cancellation_policy: {
                    populate: {
                        column_1: true,
                        column_2: true,
                    },
                },
                payment_policy: {
                    populate: {
                        column_1: true,
                        column_2: true,
                    },
                },
                payment_policy_points: true,
                term_and_conditions: {
                    populate: {
                        terms: {
                            populate: {
                                points: true,
                            },
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const parentPackageQuery = qs.stringify({
    populate: {
        hero_background: {
            fields: ["url", "alternativeText"],
        },
        testimonial: {
            populate: {
                testimonials: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        package_card_banner: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                button: true,
            },
        },
        package_banner: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                button: true,
            },
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const parentPackageSelectQuery = qs.stringify({
    populate: {
        package_banner: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                button: true,
            },
        },
    },
    fields: ["destination"],
});

export const packageListingPageQuery = qs.stringify({
    populate: {
        hero: {
            populate: {
                cta_whatsapp: true,
                background: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        packages: {
            populate: {
                hover_card: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        cta: true,
                    },
                },
            },
        },
        form_section: true,
        popular_packages: {
            populate: {
                tabs: {
                    populate: {
                        slides: {
                            populate: {
                                image: {
                                    fields: ["url", "alternativeText"],
                                },
                                cta: true,
                            },
                        },
                    },
                },
                button: true,
            },
        },
        blog_section: {
            populate: {
                blogs: {
                    populate: {
                        hero: {
                            populate: {
                                cover: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                            fields: ["date", "read_time"],
                        },
                    },
                    fields: [
                        "documentId",
                        "blog_summary",
                        "blog_title",
                        "slug",
                    ],
                },
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        faq_section: {
            populate: {
                faqs: true,
            },
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const filterPackageResultsQuery = qs.stringify({
    populate: {
        hero: {
            populate: {
                background: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        package_general_info: {
            populate: {
                duration: true,
                location_details: true,
                package_includes: {
                    populate: {
                        icon: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
                pay_with: true,
                price_details: true,
                package_categories: {
                    populate: true,
                },
            },
        },
    },
});

export const packageListQuery = qs.stringify({
    populate: {
        destination: {
            fields: ["documentId"],
        },
    },
    fields: ["documentId", "package", "slug"],
    pagination: {
        pageSize: 100,
    },
});

export const parentPackageListQuery = qs.stringify({
    // populate: {
    //     destination: {
    //         fields: ["documentId"],
    //     },
    // },
    fields: ["documentId", "package", "package_slug"],
    pagination: {
        pageSize: 100,
    },
});

export const contactUsPageQuery = qs.stringify({
    populate: {
        hero: {
            populate: {
                background: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        contact_info: true,
        offices_section: {
            populate: {
                offices: {
                    populate: {
                        icon: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const blogListPageQuery = qs.stringify({
    populate: {
        hero: {
            populate: {
                cover: {
                    fields: ["url", "alternativeText"],
                },
                cta: true,
            },
        },
        footer_cta_section: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                background: {
                    fields: ["url", "alternativeText"],
                },
                cta_call: true,
                cta_chat: true,
            },
        },
        blog_list_section: {
            populate: {
                blog_categories: {
                    fields: ["slug", "documentId", "category"],
                },
            },
        },
        seo: {
            populate: {
                metaImage: {
                    fields: ["url", "alternativeText"],
                },
                openGraph: {
                    populate: {
                        ogImage: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
        internal_links: {
            populate: {
                links: true,
            },
        },
    },
});

export const blogListQuery = qs.stringify({
    pagination: {
        pageSize: 100,
    },
    populate: {
        hero: {
            populate: {
                cover: {
                    fields: ["url", "alternativeText"],
                },
            },
            fields: ["title", "read_time", "date"],
        },
        blog_category: {
            fields: ["slug", "category", "documentId"],
        },
    },
    fields: ["slug", "blog_title"],
});
