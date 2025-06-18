import { cn } from "@/lib/utils";

const SlideIndicator = ({
    count,
    current,
}: {
    count: number;
    current: number;
}) => {
    return (
        <div className="py-4 flex gap-1 justify-center lg:hidden">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    className={cn(
                        "size-2 rounded-full bg-gray-400 transition-all duration-300 ease-in-out",
                        current === i + 1 && "bg-primary w-5"
                    )}
                    key={i}
                ></div>
            ))}
        </div>
    );
};

export default SlideIndicator;
