import TravelPackagesListing from "@/components/pages/package-filter/travel-packages-listing";
import { setRequestLocale } from "next-intl/server";
import { loader } from "./helper";
import { routing } from "@/i18n/routing";

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({ locale }));
};

const SubPackagePage = async ({
    params,
}: {
    params: Promise<{ package: string; locale: string }>;
}) => {
    const package_ = (await params).package;
    const locale = (await params).locale;
    const { packageCategories, parentPackageData } = await loader(
        package_,
        locale
    );

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <div className="lg:col-span-5">
            <TravelPackagesListing
                packageCategories={packageCategories}
                parentPackageData={parentPackageData}
            />
        </div>
    );
};

export default SubPackagePage;
