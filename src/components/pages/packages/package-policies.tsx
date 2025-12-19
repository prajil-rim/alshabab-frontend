import type { LabelProps, Policy, TermsAndConditionsProps } from "@/types";
import CancellationPolicy from "./package-policies/cancellation-policy";
import PaymentPolicy from "./package-policies/payment-policy";
import TermsAndConditions from "./package-policies/terms-and-conditions";

const PackagePolicies = ({
    cancellation_policy,
    payment_policy,
    payment_policy_points,
    term_and_conditions,
    package_policies,
}: {
    cancellation_policy: Policy;
    payment_policy: Policy;
    payment_policy_points: LabelProps[];
    term_and_conditions: TermsAndConditionsProps;
    package_policies: LabelProps[];
}) => {
    return (
        <div className="md:space-y-4">
            {cancellation_policy && (
                <CancellationPolicy cancellation_policy={cancellation_policy} />
            )}
            <PaymentPolicy
                payment_policy={payment_policy}
                payment_policy_points={payment_policy_points}
            />
            {term_and_conditions && (
                <TermsAndConditions term_and_conditions={term_and_conditions} />
            )}
            {package_policies?.length > 0 && (
                <div className="bg-[#FAFAFA] rounded-xl p-2 md:p-3 font-manrope">
                    <div className="bg-white rounded-xl border p-3 space-y-4">
                        <h5 className="font-bold text-xl">Package Policies</h5>

                        <ul className="list-disc ms-4 text-sm text-[#202020]/50 space-y-2.5">
                            {package_policies.map((point) => (
                                <li key={point.id}>{point.label}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackagePolicies;
