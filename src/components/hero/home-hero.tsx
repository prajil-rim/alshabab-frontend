"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import ArrowRightUp from "../icons/arrow-right-up";
import React, { useEffect, useRef } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { HomeHeroProps } from "@/types";
import { CirclePause, CirclePlay, Volume2, VolumeOff } from "lucide-react";
import MapPin from "../icons/map-pin";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
    hero: HomeHeroProps[];
}

const HomeHero = ({ hero }: Readonly<BreadcrumbProps>) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [playingStates, setPlayingStates] = React.useState<{
        [key: number]: boolean;
    }>({});
    const [mutedStates, setMutedStates] = React.useState<{
        [key: number]: boolean;
    }>({});

    React.useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            videoRefs.current.map((video, index) => {
                if (index === api.selectedScrollSnap()) {
                    video?.play();
                } else {
                    video?.pause();
                }
            });
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    function pauseVideo(index: number) {
        const video = videoRefs.current[index];
        if (video) {
            video.pause();
            setPlayingStates((prev) => ({ ...prev, [index]: false }));
        }
    }

    function playVideo(index: number) {
        const video = videoRefs.current[index];
        if (video) {
            video.play();
            setPlayingStates((prev) => ({ ...prev, [index]: true }));
        }
    }

    function handleAudio(index: number) {
        const video = videoRefs.current[index];
        if (video) {
            const newMuted = !video.muted;
            video.muted = newMuted;
            setMutedStates((prev) => ({ ...prev, [index]: newMuted }));
        }
    }

    useEffect(() => {
        const initialPlaying: { [key: number]: boolean } = {};
        const initialMuted: { [key: number]: boolean } = {};
        hero.forEach((_, idx) => {
            initialPlaying[idx] = true;
            initialMuted[idx] = true;
        });
        setPlayingStates(initialPlaying);
        setMutedStates(initialMuted);
    }, [hero]);

    if (!hero || hero.length === 0) return null;

    return (
        <section className="w-full h-screen bg-black text-white">
            <Carousel
                setApi={setApi}
                opts={{
                    watchDrag: false,
                }}
                className="size-full relative"
            >
                <CarouselContent className="ml-0">
                    {hero.map((data, index) => {
                        if (data.background?.type === "video") {
                            videoRefs.current[index] ??= null;
                        }

                        return (
                            <CarouselItem key={index} className="h-screen pl-0">
                                <div
                                    className="relative flex flex-col justify-center items-center h-full bg-no-repeat bg-center bg-cover after:inset-0 after:bg-black/50 after:absolute gap-32 pb-10 font"
                                    style={
                                        data.background?.type === "image"
                                            ? {
                                                  backgroundImage: `url(${data.background?.background?.url})`,
                                              }
                                            : {}
                                    }
                                >
                                    {data.background?.type === "video" && (
                                        <video
                                            src={
                                                data.background?.background?.url
                                            }
                                            ref={(el) => {
                                                videoRefs.current[index] = el;
                                            }}
                                            autoPlay
                                            muted
                                            controls={false}
                                            playsInline
                                            className="absolute inset-0 size-full object-cover pointer-events-none"
                                            onEnded={() => {
                                                if (api) {
                                                    if (
                                                        index ===
                                                        hero.length - 1
                                                    ) {
                                                        api.scrollTo(0);
                                                        videoRefs.current[0]?.play();
                                                    } else {
                                                        api.scrollNext();
                                                        videoRefs.current[
                                                            index + 1
                                                        ]?.play();
                                                    }
                                                }
                                            }}
                                        ></video>
                                    )}
                                    <div className="space-y-3 lg:space-y-5 flex flex-col justify-center items-center text-white relative z-10 px-3">
                                        <h1 className="text-3xl lg:text-5xl font-bold max-w-[44rem] text-center leading-tight">
                                            {data?.title || "No Content!"}
                                        </h1>
                                        <p className="font-manrope lg:text-lg max-w-2xl text-center">
                                            {data?.description}
                                        </p>
                                        <div className="font-manrope space-x-4">
                                            <Link
                                                href={data.cta?.href}
                                                target={
                                                    data.cta?.isExternal
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                            >
                                                <Button className="bg-transparent rounded-full cursor-pointer border border-[#F5F1E3] hover:bg-white hover:text-black">
                                                    {data.cta?.text}{" "}
                                                    <ArrowRightUp color="red" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 absolute bottom-0 left-0 p-3 pb-10 lg:p-10 z-10 w-full">
                                        <MapPin />
                                        <span className="font-manrope">
                                            {data?.destination}
                                        </span>
                                        {data.background?.type === "video" && (
                                            <div className="flex items-center gap-2.5">
                                                {playingStates[index] ? (
                                                    <button
                                                        onClick={() =>
                                                            pauseVideo(index)
                                                        }
                                                        className="cursor-pointer"
                                                    >
                                                        <CirclePause className="stroke-1" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            playVideo(index)
                                                        }
                                                        className="cursor-pointer"
                                                    >
                                                        <CirclePlay className="stroke-1" />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        handleAudio(index)
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    {mutedStates[index] ? (
                                                        <VolumeOff
                                                            size={20}
                                                            className="stroke-1"
                                                        />
                                                    ) : (
                                                        <Volume2
                                                            size={20}
                                                            className="stroke-1"
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <div className="absolute bottom-0 p-3 pb-9 lg:pb-10 lg:p-10 w-fit right-0">
                    <div className="flex w-full justify-end max-w-6xl mx-auto">
                        <ul className="gap-6 text-sm text-white font-manrope items-center flex">
                            {hero.map((data, index) => (
                                <li
                                    key={data?.id}
                                    className={cn(
                                        "hidden lg:block",
                                        index === current - 1 &&
                                            "font-semibold border-b-2 border-primary"
                                    )}
                                >
                                    {data?.attraction}
                                </li>
                            ))}
                            <li className="flex items-center gap-3">
                                <CarouselPrevious className="relative left-0 right-0 translate-y-0 disabled:bg-transparent disabled:text-white disabled:border-white disabled:opacity-100 hover:bg-primary/90 hover:text-white cursor-pointer" />
                                <CarouselNext className="relative left-0 right-0 translate-y-0 disabled:bg-transparent disabled:text-white disabled:border-white disabled:opacity-100 hover:bg-primary/90 hover:text-white cursor-pointer" />
                            </li>
                        </ul>
                    </div>
                </div>
            </Carousel>
        </section>
    );
};

export default HomeHero;
