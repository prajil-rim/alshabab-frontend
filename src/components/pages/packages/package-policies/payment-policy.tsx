import type { LabelProps, Policy } from "@/types";

const PaymentPolicy = ({
    payment_policy,
    payment_policy_points,
}: {
    payment_policy: Policy;
    payment_policy_points: LabelProps[];
}) => {
    const maxPaymentPolicyRows = Math.max(
        payment_policy.column_1.length,
        payment_policy.column_2.length
    );

    return (
        <div className="bg-[#FAFAFA] rounded-xl p-2 md:p-3 font-manrope">
            <div className="bg-white rounded-xl border p-3 space-y-4">
                <h5 className="font-bold text-xl">{payment_policy.title}</h5>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm text-left">
                        <thead>
                            <tr>
                                <th
                                    colSpan={2}
                                    className="border-b border-gray-300 px-4 py-2 text-left font-medium text-base"
                                >
                                    {payment_policy.title}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({
                                length: maxPaymentPolicyRows,
                            }).map((_, index) => (
                                <tr
                                    className="border-b border-gray-200"
                                    key={index}
                                >
                                    <td className="px-4 py-2 font-medium border-r">
                                        {payment_policy.column_1[index]
                                            ?.label ?? ""}
                                    </td>
                                    <td className="px-4 py-2">
                                        {payment_policy.column_2[index]
                                            ?.label ?? ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ul className="list-disc ms-4 text-sm text-[#202020]/50 space-y-2.5">
                    {payment_policy_points.map((point) => (
                        <li key={point.id}>{point.label}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PaymentPolicy;
