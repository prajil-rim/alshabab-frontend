import type { Policy } from "@/types";

const CancellationPolicy = ({
    cancellation_policy,
}: {
    cancellation_policy: Policy;
}) => {
    const maxCancellationPolicyRows = Math.max(
        cancellation_policy.column_1.length,
        cancellation_policy.column_2.length
    );

    return (
        <div className="bg-[#FAFAFA] rounded-xl p-2 md:p-3 font-manrope">
            <div className="bg-white rounded-xl border p-3 space-y-4">
                <h5 className="font-bold text-xl">
                    {cancellation_policy.title}
                </h5>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm text-left">
                        <thead>
                            <tr>
                                <th
                                    colSpan={2}
                                    className="bg-gray-100 border-b border-gray-300 px-4 py-2 text-left font-semibold text-base"
                                >
                                    {cancellation_policy.title}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({
                                length: maxCancellationPolicyRows,
                            }).map((_, index) => (
                                <tr
                                    className="border-b border-gray-200"
                                    key={index}
                                >
                                    <td className="px-4 py-2 font-medium w-1/2 border-r">
                                        {cancellation_policy.column_1[index]
                                            ?.label ?? ""}
                                    </td>
                                    <td className="px-4 py-2">
                                        {cancellation_policy.column_2[index]
                                            ?.label ?? ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CancellationPolicy;
