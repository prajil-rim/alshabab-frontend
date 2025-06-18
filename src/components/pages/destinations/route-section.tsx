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
        <section className="max-w-6xl mx-auto py-10 space-y-14 px-3 lg:px-2">
            <h1 className="text-2xl lg:text-4xl font-semibold text-center">
                {title}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 lg:gap-6">
                {routes.map((route) => (
                    <RouteCard key={route.id} {...route} />
                ))}
            </div>
        </section>
    );
};

export default RouteSection;
