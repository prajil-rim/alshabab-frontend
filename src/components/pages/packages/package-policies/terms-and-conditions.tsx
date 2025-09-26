import type { TermsAndConditionsProps } from "@/types";

const TermsAndConditions = ({
    term_and_conditions,
}: {
    term_and_conditions: TermsAndConditionsProps;
}) => {
    return (
        <div className="bg-[#FAFAFA] rounded-xl p-2 md:p-3 font-manrope">
            <div className="bg-white rounded-xl border p-3 space-y-4">
                <h5 className="font-bold text-xl">
                    {term_and_conditions.title}
                </h5>
                <p>{term_and_conditions.description}</p>
                {term_and_conditions.terms.map((term, index) => (
                    <div className="space-y-2" key={term.id}>
                        <h3 className="font-bold text-lg">
                            {index + 1}. {term.title}
                        </h3>
                        <ul className="list-disc ms-4 text-sm text-[#202020]/50 space-y-1">
                            {term.points.map((point) => (
                                <li key={point.id}>{point.label}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="space-y-1.5">
                    <h4 className="font-bold text-lg">Disclaimer</h4>
                    <p className="text-[#333333]">
                        {term_and_conditions.disclaimer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
