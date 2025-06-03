import { motion } from "framer-motion";

interface ScrollIndicatorLineProps {
    sections: {
        id: string;
        title: string;
    }[];
    activeSection: string;
}

const ScrollIndicatorLine = ({
    sections,
    activeSection,
}: Readonly<ScrollIndicatorLineProps>) => {
    return (
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gray-200 rounded-lg">
            <motion.div
                className="absolute w-1.5 bg-secondary rounded-lg"
                initial={{ height: 0 }}
                animate={{
                    height: `${
                        (sections.findIndex((s) => s.id === activeSection) +
                            1) *
                        (100 / sections.length)
                    }%`,
                }}
                transition={{ type: "spring", damping: 20 }}
            />
        </div>
    );
};

export default ScrollIndicatorLine;
