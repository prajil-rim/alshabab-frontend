import Testimonials from "@/components/common/testimonials/testimonials";
import PackageFilterHero from "@/components/hero/package-filter-hero";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import BudgetFilter from "@/components/pages/package-filter/budget-filter";
import DurationFilter from "@/components/pages/package-filter/duration-filter";
import FilterHeader from "@/components/pages/package-filter/filter-header";
import FlightFilter from "@/components/pages/package-filter/flight-filter";
import HighlightPackageCard from "@/components/pages/package-filter/highlight-package-card";
import NeedHelpCard from "@/components/pages/package-filter/need-help-card";
import { RadioToggle } from "@/components/pages/package-filter/radio-toggle";
import RecommendedForFilter from "@/components/pages/package-filter/recommended-for-filter";
import { type ReactNode, Suspense } from "react";
import PackageTab from "@/components/pages/package-filter/tab";
import { getAllPackageCategories, getParentPackage } from "@/data/loaders";
import FooterCTA from "@/components/layout/footer-cta";
import { PackageFilterProvider } from "@/provider/package-filter-context";
import InternalLinks from "@/components/layout/internal-links";
import { Metadata } from "next";
import { returnMetadata } from "@/lib/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SeoContent from "@/components/pages/packages/seo-content";

let parentPackagePageDataPromise: ReturnType<typeof getParentPackage> | null =
    null;
let localeCache: string | null = null;
let parentPackageCache: string | null = null;

function getParentPackageDataOnce(parentPackage: string, locale: string) {
    if (
        !parentPackagePageDataPromise ||
        localeCache !== locale ||
        parentPackageCache !== parentPackage
    ) {
        parentPackagePageDataPromise = getParentPackage(parentPackage, locale);
        localeCache = locale;
        parentPackageCache = parentPackage;
    }
    return parentPackagePageDataPromise;
}

async function loader(parentPackage: string, locale: string) {
    const [packageCategories, pageData] = await Promise.all([
        getAllPackageCategories(),
        getParentPackageDataOnce(parentPackage, locale),
    ]);

    return {
        packageCategories: packageCategories.data,
        pageData: pageData.data,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ package: string; locale: string }>;
}): Promise<Metadata> {
    const { package: parentPackage, locale } = await params;
    const { data } = await getParentPackageDataOnce(parentPackage, locale);

    return returnMetadata(data);
}

export default async function DashboardLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ package: string; locale: string }>;
}) {
    const parentPackage = (await params).package;
    const locale = (await params).locale;
    const { packageCategories, pageData } = await loader(parentPackage, locale);

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations("homePage.header.navItems");

    return (
        <main>
            <PackageFilterHero
                title={pageData.hero_title}
                description={pageData.hero_description}
                background={pageData.hero_background}
                locale={locale}
                breadcrumbs={[
                    {
                        text: t("home"),
                        href: "/",
                    },
                    {
                        text: t("packages"),
                        href: "/packages",
                    },
                    {
                        text: pageData.package,
                    },
                ]}
                cta_button="Get Consultation"
            />

            <section className="relative">
                <div className="absolute top-0 w-full h-72 bg-gradient-to-t from-transparent via-[#ffffff] to-[#448CD9]/80"></div>
                <div className="relative z-10 max-w-7xl mx-auto py-10 space-y-3 lg:space-y-6 px-3 lg:px-6 2xl:px-0">
                    <Suspense
                        fallback={
                            <div className="flex justify-center items-center py-20">
                                Loading...
                            </div>
                        }
                    >
                        <PackageTab>
                            <>
                                <div className="flex justify-between items-center">
                                    <TabsList className="space-x-3 font-manrope mb-6 max-w-full overflow-x-scroll scrollbar-none justify-start">
                                        <TabsTrigger
                                            value="all-packages"
                                            asChild
                                        >
                                            <Link
                                                href={`/packages/${parentPackage}`}
                                            >
                                                All Packages
                                            </Link>
                                        </TabsTrigger>
                                        {packageCategories.map(
                                            (category: {
                                                category: string;
                                                slug: string;
                                            }) => (
                                                <TabsTrigger
                                                    value={category.slug}
                                                    asChild
                                                    key={category.slug}
                                                >
                                                    <Link
                                                        href={`/packages/${parentPackage}?category=${category.slug}`}
                                                    >
                                                        {category.category}
                                                    </Link>
                                                </TabsTrigger>
                                            )
                                        )}
                                    </TabsList>
                                </div>

                                {/* Tab content */}
                                <PackageFilterProvider>
                                    <div className="grid lg:grid-cols-7 gap-4 font-manrope">
                                        <div className="hidden lg:block bg-[#f8f8f8] rounded-xl p-4 col-span-2 h-fit">
                                            <FilterHeader
                                                destination_label={
                                                    pageData.destination_label
                                                }
                                            />
                                            <hr className="mt-6 mb-4 border-black/10" />
                                            <RadioToggle />

                                            {/* Flights */}
                                            <FlightFilter />
                                            <hr className="mb-6 border-black/10" />

                                            {/* Budget Section */}
                                            <BudgetFilter />
                                            <hr className="mb-6 border-black/10" />

                                            {/* Duration Section */}
                                            <DurationFilter />
                                            <hr className="mb-6 border-black/10" />

                                            {/* Recommended For Section */}
                                            <RecommendedForFilter
                                                packageCategories={
                                                    packageCategories
                                                }
                                            />
                                            <hr className="mb-6 border-black/10" />

                                            {/* Need Help Section */}
                                            <NeedHelpCard
                                                phone_number={
                                                    pageData.whatsapp_number
                                                }
                                            />

                                            {/* Highlight Package Card */}
                                            <HighlightPackageCard
                                                {...pageData.package_card_banner}
                                            />
                                        </div>
                                        <Suspense
                                            fallback={<div>Loading...</div>}
                                        >
                                            {children}
                                        </Suspense>
                                    </div>
                                </PackageFilterProvider>
                            </>
                        </PackageTab>
                    </Suspense>
                </div>
            </section>

            <SeoContent content={pageData.contents} />

            <Testimonials {...pageData.testimonial} />
            <FooterCTA {...pageData.footer_cta_section} />
            <InternalLinks internal_links={pageData.internal_links || []} />
        </main>
    );
}
