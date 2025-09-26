"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { useState } from "react";
import ItineraryCarousel from "../carousels/itinerary-carousel";
import { MediaProps } from "@/types";

export function ImageViewer({ images }: { images: MediaProps[] }) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div className="size-full relative after:absolute after:inset-0 after:bg-black/50 after:rounded-md after:content-['2+'] after:text-white after:flex after:justify-center after:items-center">
                        <Image
                            src={"/local/image2.webp"}
                            alt="image"
                            width={100}
                            height={70}
                            className="rounded-md w-full aspect-[1/0.9]"
                        />
                    </div>
                </DialogTrigger>
                <DialogHeader>
                    <DialogTitle className="sr-only">Image Viewer</DialogTitle>
                </DialogHeader>
                <DialogContent className="min-w-1/2">
                    <Content images={images} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>
                <div
                    className="size-full relative after:absolute after:inset-0 after:bg-black/50 after:rounded-md after:content-[attr(data-after-content)] after:text-white after:flex after:justify-center after:items-center"
                    data-after-content={`${images.slice(4).length}+`}
                >
                    <Image
                        src={"/local/image2.webp"}
                        alt="image"
                        width={100}
                        height={70}
                        className="rounded-md w-full aspect-[1/0.9]"
                    />
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="sr-only">Image Viewer</DrawerTitle>
                </DrawerHeader>
                <div className="px-3">
                    <Content images={images} />
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline" className="font-manrope">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function Content({ images }: { images: MediaProps[] }) {
    return <ItineraryCarousel slides={images} />;
}
