type DayChart = {
    id: number;
    title: string;
    day_chart_card: { id: number; title: string; description: string }[];
};

const DayCart = ({ day_chart }: { day_chart: DayChart[] }) => {
    return (
        <div className="bg-[#FAFAFA] rounded-xl p-3">
            <div className="lg:bg-white lg:rounded-xl lg:p-3 space-y-3 lg:space-y-2">
                {/* Row */}
                {day_chart.map((chart) => (
                    <div
                        className="grid lg:grid-cols-5 gap-4 lg:gap-0"
                        key={chart.id}
                    >
                        <div className="flex items-center">
                            <span className="text-primary text-lg font-semibold">
                                {chart.title}
                            </span>
                        </div>
                        <div className="lg:col-span-4">
                            <div className="flex flex-col lg:flex-row gap-2">
                                {chart.day_chart_card.map((card) => (
                                    <ChartCard
                                        key={card.id}
                                        title={card.title}
                                        description={card.description}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DayCart;

function ChartCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex-1 border border-[#448CD9]/30 rounded-md p-4 flex flex-col hover:border-primary hover:shadow-lg min-h-24 justify-center">
            <span className="font-bold uppercase">{title}</span>
            <span className="font-manrope text-sm text-[#202020]/50 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                {description}
            </span>
        </div>
    );
}
