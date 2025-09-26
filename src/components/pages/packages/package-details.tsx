import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackageHeader from "./package-header";
import DayCart from "./day-chart";
import PackageSidebar from "./package-sidebar";
import ExclusionInclusion from "./exclusion-inclusion";
import PackagePolicies from "./package-policies";
import Itinerary from "./itinerary";
import type {
    LabelProps,
    MediaProps,
    PackageGeneralInfo,
    PackageListProps,
    Policy,
    TermsAndConditionsProps,
} from "@/types";
import { PackagePriceProvider } from "@/provider/package-price-context";

type PackageDetailsSectionProps = {
    package_general_info: PackageGeneralInfo;
    package_itinerary: {
        id: number;
        title: string;
        description: string;
        images: MediaProps[];
    }[];
    package_day_chart: {
        id: number;
        title: string;
        day_chart_card: {
            id: number;
            title: string;
            description: string;
        }[];
    }[];
    package_inc_and_exc: {
        id: number;
        inclusion: {
            id: number;
            title: string;
            points: LabelProps[];
        };
        exclusion: {
            id: number;
            title: string;
            points: LabelProps[];
        };
    };
    package_policies: {
        cancellation_policy: Policy;
        payment_policy: Policy;
        payment_policy_points: LabelProps[];
        term_and_conditions: TermsAndConditionsProps;
    };
    packages: PackageListProps[];
    locale: string;
};

const PackageDetailsSection = ({
    package_general_info,
    package_itinerary,
    package_day_chart,
    package_inc_and_exc,
    package_policies,
    packages,
    locale,
}: PackageDetailsSectionProps) => {
    return (
        <PackagePriceProvider>
            <section className="lg:px-6 2xl:px-0">
                <div className="max-w-7xl mx-auto py-10 space-y-6">
                    {/* Header Section */}
                    <PackageHeader
                        from_city={package_general_info.from_city}
                        price_category={package_general_info.price_category}
                        packages={packages}
                        modalData={{
                            phone: package_general_info.form_modal_phone || "",
                            title: package_general_info.form_modal_title || "",
                        }}
                        locale={locale}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10 relative bg-[#FAFAFA] lg:bg-transparent">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <Tabs defaultValue="itinerary">
                                <div className="bg-[#FAFAFA] rounded-xl font-manrope w-full py-2.5 md:py-5 px-1.5 md:px-3 lg:mb-3 overflow-x-scroll scrollbar-none">
                                    <TabsList>
                                        <TabsTrigger value="itinerary">
                                            Itinerary
                                        </TabsTrigger>
                                        <TabsTrigger value="day-chart">
                                            Day Chart
                                        </TabsTrigger>
                                        <TabsTrigger value="inclusion-exclusion">
                                            Inclusion & Exclusion
                                        </TabsTrigger>
                                        <TabsTrigger value="package-policies">
                                            Package Policies
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value="itinerary">
                                    <Itinerary
                                        itineraries={package_itinerary || []}
                                    />
                                </TabsContent>
                                <TabsContent value="day-chart">
                                    <DayCart
                                        day_chart={package_day_chart || []}
                                    />
                                </TabsContent>
                                <TabsContent value="inclusion-exclusion">
                                    <ExclusionInclusion
                                        inclusion={
                                            package_inc_and_exc.inclusion
                                        }
                                        exclusion={
                                            package_inc_and_exc.exclusion
                                        }
                                    />
                                </TabsContent>
                                <TabsContent value="package-policies">
                                    <PackagePolicies
                                        cancellation_policy={
                                            package_policies.cancellation_policy
                                        }
                                        payment_policy={
                                            package_policies.payment_policy
                                        }
                                        payment_policy_points={
                                            package_policies.payment_policy_points
                                        }
                                        term_and_conditions={
                                            package_policies.term_and_conditions
                                        }
                                    />
                                </TabsContent>
                            </Tabs>

                            <div className="space-y-4 mt-9 px-3 lg:px-6 2xl:px-0">
                                <h3 className="text-2xl font-bold">
                                    {package_general_info.more_about_trip.title}
                                </h3>
                                <p className="font-manrope">
                                    {
                                        package_general_info.more_about_trip
                                            .description
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <PackageSidebar
                            call_us_on={package_general_info.call_us_on}
                            whatsapp={package_general_info.whatsapp}
                            timing={package_general_info.timing}
                            price_details={package_general_info.price_details}
                            packages={packages}
                            modalData={{
                                phone:
                                    package_general_info.form_modal_phone || "",
                                title:
                                    package_general_info.form_modal_title || "",
                            }}
                            locale={locale}
                        />
                    </div>
                </div>
            </section>
        </PackagePriceProvider>
    );
};

export default PackageDetailsSection;
