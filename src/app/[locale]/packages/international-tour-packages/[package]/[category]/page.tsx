import TravelPackagesListing from "@/components/pages/package-filter/travel-packages-listing";
import { setRequestLocale } from "next-intl/server";
import { loader } from "../helper";
import { routing } from "@/i18n/routing";

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

const PackageCategoryWisePage = async ({
    params,
}: {
    params: Promise<{ category: string; package: string; locale: string }>;
}) => {
    const { category, locale, package: package_ } = await params;
    const { packages, packageCategories, parentPackageData } = await loader(
        package_,
        category,
        locale
    );

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <div className="lg:col-span-5">
            <TravelPackagesListing
                packages={packages}
                packageCategories={packageCategories}
                parentPackageData={parentPackageData}
            />
        </div>
    );
};

export default PackageCategoryWisePage;
