import { TeamProfileCardProps } from "@/types";
import TeamProfileCard from "./team-profile-card";

interface TeamProfileProps {
    title: string;
    description: string;
    teams: TeamProfileCardProps[];
}

const TeamProfile = ({
    title,
    description,
    teams,
}: Readonly<TeamProfileProps>) => {
    if (!teams || teams.length === 0 || !title) return null;
    return (
        <section className="max-w-7xl mx-auto py-10 space-y-3 lg:space-y-6 px-3 lg:px-6 2xl:px-0">
            <h1 className="text-2xl lg:text-4xl font-semibold">{title}</h1>
            <p className="font-manrope max-w-3xl">{description}</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 pt-5">
                {teams.map((team) => (
                    <TeamProfileCard team={team} key={team.id} />
                ))}
            </div>
        </section>
    );
};

export default TeamProfile;
