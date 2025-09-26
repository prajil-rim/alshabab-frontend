import {
    getAllPackageCategories,
    getPackageResults,
    getParentPackage,
} from "@/data/loaders";
import { parentPackageSelectQuery } from "@/data/queries";

export async function loader(package_: string, category = "", locale: string) {
    const [packages, packageCategories, parentPackageData] = await Promise.all([
        getPackageResults(package_, category, locale),
        getAllPackageCategories(),
        getParentPackage(package_, locale, parentPackageSelectQuery),
    ]);
    return {
        packages: packages.data,
        packageCategories: packageCategories.data,
        parentPackageData: parentPackageData.data,
    };
}
