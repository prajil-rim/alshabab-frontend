import { StrapiImage } from "@/components/common/strapi-image";
import { Button } from "@/components/ui/button";
import { cn, getImage } from "@/lib/utils";
import { TeamProfileCardProps } from "@/types";
import { Award, Briefcase, Star } from "lucide-react";
import Link from "next/link";

const TeamProfileCard = ({ team }: { team: TeamProfileCardProps }) => {
    return (
        <div
            className="rounded-xl bg-cover bg-center aspect-[1/1.3] lg:aspect-auto lg:h-96 relative overflow-hidden group"
            style={{
                backgroundImage: `url(${getImage({
                    local: process.env.PLACEHOLDER_IMAGE!,
                    prod: team.image?.url,
                })})`,
            }}
            key={team.id}
        >
            {/* Overlay */}
            <div className="absolute opacity-50 lg:opacity-100 inset-0 bg-gradient-to-t from-black/50 to-black/20 group-hover:opacity-50 transition-opacity duration-300"></div>

            <div className="flex flex-col justify-between relative h-full z-10">
                <div className="flex items-center m-5 gap-1 bg-[#FFFFEF] rounded-full px-3 py-1 w-fit">
                    <Star size={15} className="text-yellow-500" />
                    <span className="font-manrope text-xs font-semibold">
                        {team.experience} experience
                    </span>
                </div>
                <div className="space-y-2 p-4 relative">
                    {/* Overlay */}
                    <div className="absolute !mb-0 inset-0 bg-gradient-to-t from-black to-transparent lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div
                        className={cn(
                            "flex relative z-10 justify-between items-center lg:bg-white/27 rounded-full px-3 py-1 lg:backdrop-blur-md text-white group-hover:translate-y-0 group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-300",
                            team.button
                                ? "lg:translate-y-[340%]"
                                : "lg:translate-y-[220%]"
                        )}
                    >
                        <h4 className="text-2xl lg:text-xl font-semibold">
                            {team.name}
                        </h4>
                        <div className="flex gap-1 items-center">
                            {/* socials */}
                            {team.social_links?.map((social) => (
                                <Link
                                    href={social.href}
                                    key={social.id}
                                    target={
                                        social.isExternal ? "_blank" : "_self"
                                    }
                                    className="shrink-0"
                                >
                                    <StrapiImage
                                        src={getImage({
                                            local: process.env
                                                .PLACEHOLDER_IMAGE!,
                                            prod: social.icon?.url,
                                        })}
                                        alt={""}
                                        width={20}
                                        height={20}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div
                        className={cn(
                            "relative z-10 space-y-2 group-hover:translate-y-0 transition-all duration-300",
                            team.button
                                ? "lg:translate-y-[340%]"
                                : "lg:translate-y-[220%]"
                        )}
                    >
                        <p className="text-xs text-white px-3 font-manrope">
                            {team.bio}
                        </p>
                        <div className="flex items-center lg:items-start gap-1 text-white font-manrope px-3">
                            <Award size={15} className="shrink-0" />
                            <ul className="flex items-center flex-wrap gap-0.5 text-sm lg:text-xs font-light">
                                <li>{team.specialization}</li>
                            </ul>
                        </div>
                        <div className="flex items-center lg:items-start gap-1 text-white font-manrope px-3">
                            <Briefcase size={15} className="shrink-0" />
                            <ul className="flex items-center gap-0.5 text-sm lg:text-xs font-light flex-wrap">
                                {team.role}
                            </ul>
                        </div>
                        {team.button && (
                            <Link
                                href={team.button.href}
                                target={
                                    team.button.isExternal ? "_blank" : "_self"
                                }
                            >
                                <Button
                                    size="sm"
                                    className="rounded-full font-manrope text-xs cursor-pointer ms-3"
                                >
                                    {team.button.text}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamProfileCard;
