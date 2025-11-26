import type { LabelProps, Policy, TermsAndConditionsProps } from "@/types";
import CancellationPolicy from "./package-policies/cancellation-policy";
import PaymentPolicy from "./package-policies/payment-policy";
import TermsAndConditions from "./package-policies/terms-and-conditions";

const PackagePolicies = ({
    cancellation_policy,
    payment_policy,
    payment_policy_points,
    term_and_conditions,
}: {
    cancellation_policy: Policy;
    payment_policy: Policy;
    payment_policy_points: LabelProps[];
    term_and_conditions: TermsAndConditionsProps;
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
        </div>
    );
};

export default PackagePolicies;
