import { TourProps } from "@/types";
import TourCard from "./tour-card";

const GlobalTourGrid = ({ tours }: { tours: TourProps[] }) => {
    return (
        <div className="grid-cols-6 gap-3 hidden lg:grid">
            {tours.map((tour, i) => (
                <TourCard tour={tour} index={i} key={tour.id} />
            ))}
        </div>
    );
};

export default GlobalTourGrid;
