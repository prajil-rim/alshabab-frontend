import RouteCard from "./route-card";
import { RouteProps } from "@/types";

const RouteSection = ({
    title,
    routes,
}: {
    title: string;
    routes: RouteProps[];
}) => {
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-14">
            <h1 className="text-4xl font-semibold text-center">{title}</h1>
            <div className="grid grid-cols-4 gap-6">
                {routes.map((route) => (
                    <RouteCard key={route.id} {...route} />
                ))}
            </div>
        </section>
    );
};

export default RouteSection;
