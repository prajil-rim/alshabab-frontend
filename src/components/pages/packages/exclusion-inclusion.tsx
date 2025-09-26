type InclusionExclusionProps = {
    id: number;
    title: string;
    points: {
        id: number;
        label: string;
    }[];
};

const ExclusionInclusion = ({
    inclusion,
    exclusion,
}: {
    inclusion: InclusionExclusionProps;
    exclusion: InclusionExclusionProps;
}) => {
    return (
        <div className="bg-[#FAFAFA] rounded-xl p-2 md:p-3 grid md:grid-cols-2 gap-3 font-manrope">
            <div className="bg-white rounded-xl border hover:border-primary hover:shadow-lg p-3 space-y-4">
                <h5 className="font-bold text-lg">{inclusion.title}</h5>
                <ul className="font-medium text-[#202020]/50 space-y-2 list-disc ms-4 text-sm">
                    {inclusion.points.map((point) => (
                        <li key={point.id}>{point.label}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-white rounded-xl border hover:border-primary hover:shadow-lg p-3 space-y-4">
                <h5 className="font-bold text-lg">{exclusion.title}</h5>
                <ul className="font-medium text-[#202020]/50 space-y-2 list-disc ms-4 text-sm">
                    {exclusion.points.map((point) => (
                        <li key={point.id}>{point.label}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExclusionInclusion;
